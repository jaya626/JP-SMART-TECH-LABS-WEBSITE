
import { useRef, useState } from "react";

import "./STLUploader.css";

function validateSTL(buffer) {
  if (!(buffer instanceof ArrayBuffer) || buffer.byteLength < 15) {
    return {
      valid: false,
      message: "The selected file is empty or invalid.",
    };
  }

  const view = new DataView(buffer);

  // Binary STL:
  // 80-byte header + 4-byte triangle count + 50 bytes per triangle.
  if (buffer.byteLength >= 84) {
    const triangleCount = view.getUint32(80, true);
    const expectedSize = 84 + triangleCount * 50;

    if (
      triangleCount > 0 &&
      expectedSize === buffer.byteLength
    ) {
      return {
        valid: true,
        format: "Binary STL",
        triangleCount,
      };
    }
  }

  // ASCII STL
  const text = new TextDecoder()
    .decode(buffer.slice(0, Math.min(buffer.byteLength, 500000)))
    .trim();

  const isAscii =
    /^solid\b/i.test(text) &&
    /\bfacet\s+normal\b/i.test(text) &&
    /\bvertex\b/i.test(text);

  if (isAscii) {
    const fullText = new TextDecoder().decode(buffer);
    const matches = fullText.match(/\bfacet\s+normal\b/gi);

    if (matches?.length) {
      return {
        valid: true,
        format: "ASCII STL",
        triangleCount: matches.length,
      };
    }
  }

  return {
    valid: false,
    message: "Invalid STL file. Please upload a valid binary or ASCII STL.",
  };
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function STLUploader({ onFileAccepted }) {
  const inputRef = useRef(null);

  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const processFile = async (file) => {
    setError("");

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".stl")) {
      setError("Only .STL files are supported.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("File size must be 50 MB or less.");
      return;
    }

    if (file.size === 0) {
      setError("The selected file is empty.");
      return;
    }

    try {
      setIsLoading(true);

      const buffer = await file.arrayBuffer();
      const validation = validateSTL(buffer);

      if (!validation.valid) {
        setError(validation.message);
        return;
      }

      const acceptedFile = {
        file,
        buffer,
        name: file.name,
        size: file.size,
        format: validation.format,
        triangleCount: validation.triangleCount,
      };

      setFileData(acceptedFile);
      onFileAccepted?.(acceptedFile);
    } catch (err) {
      console.error("STL upload error:", err);
      setError("Unable to read this file. Please try another STL file.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];
    processFile(file);

    // Allows selecting the same file again.
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    processFile(file);
  };

  const removeFile = () => {
    setFileData(null);
    setError("");
    onFileAccepted?.(null);
  };

  return (
    <div className="stl-uploader">

      <input
        ref={inputRef}
        type="file"
        accept=".stl,model/stl"
        onChange={handleInputChange}
        hidden
      />

      {!fileData ? (
        <div
          className={`stl-upload-area ${isDragging ? "dragging" : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <div className="stl-upload-icon">
            <span>＋</span>
          </div>

          <strong>
            {isLoading ? "Reading STL file..." : "Drop your STL file here"}
          </strong>

          <p>or click to browse · Maximum 50 MB</p>

          <button
            type="button"
            className="stl-upload-button"
            onClick={(event) => {
              event.stopPropagation();
              inputRef.current?.click();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Browse Files"}
          </button>
        </div>
      ) : (
        <div className="stl-file-success">
          <div className="stl-file-details">
            <strong title={fileData.name}>
              {fileData.name}
            </strong>

            <span>{formatFileSize(fileData.size)}</span>
            <span>{fileData.format}</span>
            <span>
              {fileData.triangleCount.toLocaleString()} triangles
            </span>
          </div>

          <button
            type="button"
            className="stl-remove-button"
            onClick={removeFile}
          >
            Remove File
          </button>
        </div>
      )}

      {error && (
        <p className="stl-upload-error" role="alert">
          {error}
        </p>
      )}

    </div>
  );
}

export default STLUploader;
