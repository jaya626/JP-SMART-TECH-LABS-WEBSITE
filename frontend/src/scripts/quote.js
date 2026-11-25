export function initializeQuoteSection() {

    const fileInput = document.querySelector("#stl-file");
    const uploadArea = document.querySelector("#upload-area");
    const fileStatus = document.querySelector("#file-status");
    const simulationBtn = document.querySelector("#simulation-btn");
    const sampleBtn = document.querySelector("#sample-btn");
    const sampleModel = document.querySelector("#sample-model");

    const quantity = document.querySelector("#quantity");
    const minus = document.querySelector("#qty-minus");
    const plus = document.querySelector("#qty-plus");

    if (!fileInput || !uploadArea) return;

    let selectedFile = null;

    function handleFile(file) {

        if (!file) return;

        if (!file.name.toLowerCase().endsWith(".stl")) {
            fileStatus.textContent = "Please select an STL file.";
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            fileStatus.textContent = "File exceeds the 50 MB limit.";
            return;
        }

        if (file.size === 0) {
            fileStatus.textContent = "The selected file is empty.";
            return;
        }

        selectedFile = file;

        fileStatus.textContent =
            `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;

        simulationBtn.disabled = false;
    }

    // File selection
    fileInput.addEventListener("change", () => {
        handleFile(fileInput.files[0]);
    });

    // Drag and drop
    uploadArea.addEventListener("dragover", event => {
        event.preventDefault();
        uploadArea.classList.add("drag-over");
    });

    uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("drag-over");
    });

    uploadArea.addEventListener("drop", event => {
        event.preventDefault();
        uploadArea.classList.remove("drag-over");

        handleFile(event.dataTransfer.files[0]);
    });

    // Infill and layer selection
    document.querySelectorAll(".option-group").forEach(group => {

        group.querySelectorAll("button").forEach(button => {

            button.addEventListener("click", () => {

                group.querySelectorAll("button").forEach(item => {
                    item.classList.remove("selected");
                });

                button.classList.add("selected");

            });

        });

    });

    // Quantity controls
    minus.addEventListener("click", () => {
        quantity.value = Math.max(1, Number(quantity.value) - 1);
    });

    plus.addEventListener("click", () => {
        quantity.value = Math.min(100, Number(quantity.value) + 1);
    });

    quantity.addEventListener("change", () => {

        const value = Number(quantity.value);

        quantity.value = Math.max(
            1,
            Math.min(100, Number.isFinite(value) ? value : 1)
        );

    });

    // Sample preview
    sampleBtn.addEventListener("click", () => {

        sampleModel.classList.add("visible");

        fileStatus.textContent = "Sample preview displayed.";

    });

    // Simulation placeholder
    simulationBtn.addEventListener("click", () => {

        if (!selectedFile) return;

        fileStatus.textContent =
            "STL selected. Simulation engine integration is pending.";

    });

}
