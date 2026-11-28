
import { useState } from "react";

import STLUploader from "./STLUploader";
import ModelViewer from "./ModelViewer";

import {
  usePrintSettings,
  PrintOptionsPanel,
  PriceSummaryPanel,
} from "./PrintSettings";

import "./Customization.css";
import "./PrintSettings.css";

function CustomizationSection() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [selectedColor, setSelectedColor] = useState("red");

  const {
    settings,
    quote,
    hasModel,
    updateSetting,
    handleAddToCart,
  } = usePrintSettings({
    volume: modelInfo?.volume || 0,
    selectedColor,
  });

  const handleFileAccepted = (fileData) => {
    setUploadedFile(fileData);
    setModelInfo(null);
  };

  return (
    <section
      className="customization-section"
      id="customization"
    >
      <div className="customization-container">

        <div className="customization-workspace">

          {/* =================================
              LEFT COLUMN
              UPLOAD 30% / PRICE 70%
          ================================= */}

          <div className="customization-left-column">

            {/* 01 - UPLOAD */}

            <div className="customization-upload-panel">

              <div className="customization-panel-heading">
                <span className="customization-step">
                  01
                </span>

                <div>
                  <h3>Upload Your Model</h3>
                  <p>Upload your STL design file.</p>
                </div>
              </div>

              <STLUploader
                onFileAccepted={handleFileAccepted}
              />

            </div>

            {/* 03 - PRICE SUMMARY */}

            <PriceSummaryPanel
              hasModel={hasModel}
              quote={quote}
              settings={settings}
              onAddToCart={handleAddToCart}
            />

          </div>

          {/* =================================
              CENTRE COLUMN
              TITLE 20% / SIMULATION 80%
          ================================= */}

          <div className="customization-center-column">

            {/* TITLE */}

            <div className="customization-title-panel">

              <span className="customization-eyebrow">
                DESIGN YOUR OWN
              </span>

              <h2>
                Customization <span>Studio</span>
              </h2>

              <p>
                Preview, customize and configure your 3D model.
              </p>

            </div>

            {/* 02 - SIMULATION */}

            <div className="customization-viewer-panel">

              <div className="customization-simulation-heading">

                <span className="customization-step">
                  02
                </span>

                <div>
                  <h3>3D Simulation</h3>
                  <p>Preview and inspect your model.</p>
                </div>

              </div>

              <ModelViewer
                file={uploadedFile}
                color={selectedColor}
                onModelInfo={setModelInfo}
              />

            </div>

          </div>

          {/* =================================
              RIGHT COLUMN
              PRINT OPTIONS 100%
          ================================= */}

          <div className="customization-right-column">

            <PrintOptionsPanel
              settings={settings}
              updateSetting={updateSetting}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              hasModel={hasModel}
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default CustomizationSection;
