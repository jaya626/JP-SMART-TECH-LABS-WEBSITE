
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const MODEL_COLORS = {
  red: "#E53935",
  white: "#FFFFFF",
  blue: "#2563EB",
  black: "#171717",
};

function calculateVolume(geometry) {
  const positions = geometry.attributes.position;
  let signedVolume = 0;

  for (let i = 0; i < positions.count; i += 3) {
    const ax = positions.getX(i);
    const ay = positions.getY(i);
    const az = positions.getZ(i);

    const bx = positions.getX(i + 1);
    const by = positions.getY(i + 1);
    const bz = positions.getZ(i + 1);

    const cx = positions.getX(i + 2);
    const cy = positions.getY(i + 2);
    const cz = positions.getZ(i + 2);

    signedVolume +=
      ax * (by * cz - bz * cy) +
      ay * (bz * cx - bx * cz) +
      az * (bx * cy - by * cx);
  }

  // STL dimensions are assumed to be millimetres.
  return Math.abs(signedVolume / 6) / 1000;
}

function ModelViewer({ file, color = "red", onModelInfo }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const initialCameraRef = useRef(null);

  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize the Three.js scene.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#111827");

    const camera = new THREE.PerspectiveCamera(
      45,
      1,
      0.1,
      10000
    );

    camera.position.set(65, 55, 75);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(
      mount.clientWidth,
      mount.clientHeight
    );

    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(
      camera,
      renderer.domElement
    );

    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.screenSpacePanning = true;

    const ambientLight = new THREE.AmbientLight(
      "#FFFFFF",
      1.8
    );

    const directionalLight = new THREE.DirectionalLight(
      "#FFFFFF",
      2.2
    );

    directionalLight.position.set(50, 80, 60);

    const fillLight = new THREE.DirectionalLight(
      "#B9C9FF",
      0.8
    );

    fillLight.position.set(-50, 20, -40);

    scene.add(
      ambientLight,
      directionalLight,
      fillLight
    );

    const grid = new THREE.GridHelper(
      200,
      40,
      "#475569",
      "#293548"
    );

    grid.position.y = -0.02;
    scene.add(grid);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    controlsRef.current = controls;

    let animationFrame;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!mount.clientWidth || !mount.clientHeight) return;

      camera.aspect =
        mount.clientWidth / mount.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        mount.clientWidth,
        mount.clientHeight
      );
    });

    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();

      controls.dispose();

      if (meshRef.current) {
        scene.remove(meshRef.current);
        meshRef.current.geometry.dispose();
        meshRef.current.material.dispose();
        meshRef.current = null;
      }

      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }

      scene.clear();

      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
    };
  }, []);

  // Load the uploaded STL.
  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    if (meshRef.current) {
      scene.remove(meshRef.current);
      meshRef.current.geometry.dispose();
      meshRef.current.material.dispose();
      meshRef.current = null;
    }

    setModelInfo(null);
    onModelInfo?.(null);
    setError("");

    if (!file?.buffer) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadModel = async () => {
      try {
        setLoading(true);

        const loader = new STLLoader();
        const geometry = loader.parse(file.buffer);

        if (cancelled) {
          geometry.dispose();
          return;
        }

        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        geometry.center();

        const box = geometry.boundingBox;

        const dimensions = new THREE.Vector3();
        box.getSize(dimensions);

        const volume = calculateVolume(geometry);

        const info = {
          x: dimensions.x,
          y: dimensions.y,
          z: dimensions.z,
          volume,
          triangles: geometry.attributes.position.count / 3,
        };

        const material = new THREE.MeshStandardMaterial({
          color: MODEL_COLORS[color] || MODEL_COLORS.red,
          metalness: 0.12,
          roughness: 0.55,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Fit the model into the camera view.
        const maxDimension = Math.max(
          dimensions.x,
          dimensions.y,
          dimensions.z,
          1
        );

        const camera = cameraRef.current;
        const controls = controlsRef.current;

        if (camera && controls) {
          const distance = maxDimension * 2.3;

          camera.position.set(
            distance,
            distance * 0.8,
            distance
          );

          camera.near = Math.max(0.01, maxDimension / 1000);
          camera.far = maxDimension * 100;
          camera.updateProjectionMatrix();

          controls.target.set(0, 0, 0);
          controls.update();

          initialCameraRef.current = {
            position: camera.position.clone(),
            target: controls.target.clone(),
          };
        }

        scene.add(mesh);
        meshRef.current = mesh;

        setModelInfo(info);
        onModelInfo?.(info);
      } catch (err) {
        console.error("3D model loading error:", err);
        setError("Unable to display this STL model.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadModel();

    return () => {
      cancelled = true;
    };
  }, [file, onModelInfo]);

  // Update the model color without reloading the STL.
  useEffect(() => {
    if (!meshRef.current) return;

    const nextColor =
      MODEL_COLORS[color] || MODEL_COLORS.red;

    meshRef.current.material.color.set(nextColor);
    meshRef.current.material.needsUpdate = true;
  }, [color]);

  const zoomIn = () => {
    const camera = cameraRef.current;
    if (!camera) return;

    camera.position.multiplyScalar(0.8);
  };

  const zoomOut = () => {
    const camera = cameraRef.current;
    if (!camera) return;

    camera.position.multiplyScalar(1.2);
  };

  const resetView = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const initial = initialCameraRef.current;

    if (!camera || !controls || !initial) return;

    camera.position.copy(initial.position);
    controls.target.copy(initial.target);
    controls.update();
  };

  return (
    <div className="model-viewer-container">
      <div className="model-viewer-layout">

        <div className="model-viewer-viewport">

          <div
            ref={mountRef}
            className="model-viewer-canvas"
          />

          <div className="model-viewer-toolbar">
            <div className="model-viewer-status">
              <span className="model-viewer-status-dot" />
              3D SIMULATION
            </div>

            <div className="model-viewer-controls">
              <button
                type="button"
                onClick={zoomIn}
                aria-label="Zoom in"
                title="Zoom in"
              >
                +
              </button>

              <button
                type="button"
                onClick={zoomOut}
                aria-label="Zoom out"
                title="Zoom out"
              >
                −
              </button>

              <button
                type="button"
                onClick={resetView}
                aria-label="Reset view"
                title="Reset view"
              >
                ↻
              </button>
            </div>
          </div>

          {!file && (
            <div className="model-viewer-empty">
              <div className="model-viewer-empty-icon">
                ◇
              </div>
              <h3>Your 3D model will appear here</h3>
              <p>
                Upload an STL file to preview and inspect
                your design.
              </p>
            </div>
          )}

          {loading && (
            <div className="model-viewer-overlay">
              <div className="model-viewer-loader" />
              <h3>Loading 3D Model</h3>
              <p>Please wait while your STL is processed.</p>
            </div>
          )}

          {error && (
            <div className="model-viewer-overlay">
              <div className="model-viewer-error-icon">!</div>
              <h3>Unable to load model</h3>
              <p>{error}</p>
            </div>
          )}

          {file && !loading && !error && (
            <div className="model-viewer-hint">
              Drag to rotate · Scroll to zoom · Right-click to pan
            </div>
          )}

        </div>

        {/* GEOMETRY DETAILS */}
        <div className="model-viewer-info">

          <div className="model-viewer-info-heading">
            <strong>Geometry Details</strong>
          </div>

          {modelInfo ? (
            <>
              <div className="model-viewer-dimension">
                <span>X AXIS</span>
                <strong>{modelInfo.x.toFixed(2)} mm</strong>
              </div>

              <div className="model-viewer-dimension">
                <span>Y AXIS</span>
                <strong>{modelInfo.y.toFixed(2)} mm</strong>
              </div>

              <div className="model-viewer-dimension">
                <span>Z AXIS</span>
                <strong>{modelInfo.z.toFixed(2)} mm</strong>
              </div>

              <div className="model-viewer-volume">
                <span>Calculated Volume</span>
                <strong>
                  {modelInfo.volume.toFixed(4)}
                  <small> cm³</small>
                </strong>
              </div>

              <div className="model-viewer-triangles">
                <span>Triangle Count</span>
                <strong>
                  {modelInfo.triangles.toLocaleString()}
                </strong>
              </div>
            </>
          ) : (
            <div className="model-viewer-info-empty">
              Geometry measurements will appear after upload.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ModelViewer;
