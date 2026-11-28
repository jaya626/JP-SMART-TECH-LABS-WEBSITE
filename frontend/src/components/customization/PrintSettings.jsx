
import { useState } from "react";

/* =========================================
   MATERIALS
========================================= */

const MATERIALS = {
  PLA: { rate: 4, density: 1.24 },
  ABS: { rate: 4.5, density: 1.04 },
  PETG: { rate: 5, density: 1.27 },
  Nylon: { rate: 9, density: 1.14 },
  TPU: { rate: 7, density: 1.21 },
  Resin: { rate: 10, density: 1.10 },
};

/* =========================================
   COLORS
========================================= */

const COLORS = [
  { name: "red", label: "Red", hex: "#E53935" },
  { name: "white", label: "White", hex: "#FFFFFF" },
  { name: "blue", label: "Blue", hex: "#2563EB" },
  { name: "black", label: "Black", hex: "#171717" },
];

/* =========================================
   INFILL OPTIONS
========================================= */

const INFILLS = [20, 40, 60, 100];

/* =========================================
   LAYER OPTIONS
========================================= */

const LAYERS = [
  { value: 0.12, label: "High", speed: 6 },
  { value: 0.20, label: "Standard", speed: 11 },
  { value: 0.28, label: "Draft", speed: 16 },
];

/* =========================================
   PRICE CALCULATION
========================================= */

function calculateQuote(volume, settings) {
  const material = MATERIALS[settings.material];

  const shellFraction = 0.25;

  const infillFactor =
    settings.material === "Resin"
      ? 1
      : shellFraction +
        (1 - shellFraction) * (settings.infill / 100);

  const weight = volume * material.density * infillFactor;

  const layer = LAYERS.find(
    (item) => item.value === settings.layer
  );

  const printHours = weight / layer.speed;

  const materialCost = weight * material.rate;
  const machineCost = printHours * 60;

  const unitPrice = Math.max(
    40,
    materialCost + machineCost
  );

  const quantity = settings.quantity;

  const discount =
    quantity >= 100 ? 0.15 :
    quantity >= 50 ? 0.10 :
    quantity >= 10 ? 0.05 : 0;

  const subtotal = unitPrice * quantity;
  const bulkDiscount = subtotal * discount;
  const setupFee = 99;

  const total =
    subtotal - bulkDiscount + setupFee;

  return {
    weight,
    unitPrice,
    total,
    printHours,
    materialCost,
    machineCost,
    bulkDiscount,
    setupFee,
    discount,
  };
}

/* =========================================
   SHARED PRINT SETTINGS HOOK

   Keeps the options and price panels
   synchronized.
========================================= */

export function usePrintSettings({
  volume = 0,
  selectedColor = "red",
  onSettingsChange,
  onQuoteChange,
  onAddToCart,
}) {
  const [settings, setSettings] = useState({
    material: "PLA",
    infill: 20,
    layer: 0.20,
    quantity: 1,
    notes: "",
  });

  const hasModel =
    Number.isFinite(volume) && volume > 0;

  const quote = calculateQuote(
    hasModel ? volume : 0,
    settings
  );

  const updateSetting = (key, value) => {
    const nextSettings = {
      ...settings,
      [key]: value,
    };

    setSettings(nextSettings);

    onSettingsChange?.(nextSettings);

    const nextQuote = calculateQuote(
      hasModel ? volume : 0,
      nextSettings
    );

    onQuoteChange?.(nextQuote);
  };

  const handleAddToCart = () => {
    if (!hasModel) return;

    onAddToCart?.({
      settings,
      color: selectedColor,
      quote,
      volume,
    });
  };

  return {
    settings,
    quote,
    hasModel,
    updateSetting,
    handleAddToCart,
  };
}

/* =========================================
   04 - PRINT OPTIONS PANEL
========================================= */

export function PrintOptionsPanel({
  settings,
  updateSetting,
  selectedColor,
  onColorChange,
  hasModel,
}) {
  return (
    <div className="print-options-panel">

      <div className="print-panel-heading">
        <span className="customization-step">04</span>

        <div>
          <h3>Choose Print Options</h3>
          <p>Configure your printing preferences.</p>
        </div>
      </div>

      {!hasModel && (
        <div className="print-model-warning">
          Upload a valid STL model to calculate your quote.
        </div>
      )}

      {/* MATERIAL */}

      <div className="print-field">
        <label>Material</label>

        <div className="material-options">
          {Object.entries(MATERIALS).map(
            ([name, material]) => (
              <button
                type="button"
                key={name}
                className={
                  settings.material === name
                    ? "material-option active"
                    : "material-option"
                }
                onClick={() =>
                  updateSetting("material", name)
                }
              >
                <strong>{name}</strong>
                <span>₹{material.rate}/g</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* COLOR */}

      <div className="print-field">
        <label>Choose Color</label>

        <div className="color-options">
          {COLORS.map((item) => (
            <button
              type="button"
              key={item.name}
              className={
                selectedColor === item.name
                  ? "color-option active"
                  : "color-option"
              }
              onClick={() =>
                onColorChange?.(item.name)
              }
              aria-label={`Select ${item.label}`}
              title={item.label}
            >
              <span
                className="color-swatch"
                style={{ backgroundColor: item.hex }}
              />

              <span className="color-name">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* INFILL */}

      <div className="print-field">
        <label>Infill Density</label>

        <div className="choice-options">
          {INFILLS.map((value) => (
            <button
              type="button"
              key={value}
              className={
                settings.infill === value
                  ? "choice-option active"
                  : "choice-option"
              }
              onClick={() =>
                updateSetting("infill", value)
              }
            >
              {value}%
            </button>
          ))}
        </div>
      </div>

      {/* LAYER */}

      <div className="print-field">
        <label>Layer Resolution</label>

        <div className="layer-options">
          {LAYERS.map((layer) => (
            <button
              type="button"
              key={layer.value}
              className={
                settings.layer === layer.value
                  ? "layer-option active"
                  : "layer-option"
              }
              onClick={() =>
                updateSetting("layer", layer.value)
              }
            >
              <strong>
                {layer.value.toFixed(2)} mm
              </strong>

              <span>{layer.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* QUANTITY + REQUIREMENTS */}

      <div className="print-field-row">

        <div className="print-field quantity-field">
          <label>Quantity</label>

          <div className="quantity-control">
            <button
              type="button"
              onClick={() =>
                updateSetting(
                  "quantity",
                  Math.max(1, settings.quantity - 1)
                )
              }
              disabled={settings.quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>

            <strong>{settings.quantity}</strong>

            <button
              type="button"
              onClick={() =>
                updateSetting(
                  "quantity",
                  Math.min(10000, settings.quantity + 1)
                )
              }
              disabled={settings.quantity >= 10000}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <div className="print-field requirements-field">
          <label htmlFor="print-notes">
            Additional Requirements
          </label>

          <textarea
            id="print-notes"
            value={settings.notes}
            onChange={(event) =>
              updateSetting("notes", event.target.value)
            }
            placeholder="Enter requirements..."
            rows={2}
            maxLength={500}
          />
        </div>

      </div>

    </div>
  );
}

/* =========================================
   03 - PRICE SUMMARY PANEL
========================================= */

export function PriceSummaryPanel({
  hasModel,
  quote,
  settings,
  onAddToCart,
}) {
  const money = (value) => `₹${value.toFixed(2)}`;

  return (
    <aside className="print-price-panel">

      <span className="print-price-eyebrow">
        03 · ESTIMATED QUOTE
      </span>

      <h3>Price Summary</h3>

      <div className="price-summary-row">
        <span>Part Weight</span>

        <strong>
          {hasModel
            ? `${quote.weight.toFixed(2)} g`
            : "—"}
        </strong>
      </div>

      <div className="price-summary-row">
        <span>Approx. Price</span>

        <strong className="price-highlight">
          {hasModel ? money(quote.total) : "₹ —"}
        </strong>
      </div>

      <div className="price-summary-row">
        <span>Material</span>
        <strong>{settings.material}</strong>
      </div>

      <p className="price-summary-note">
        Estimated price only. Final pricing may vary
        after production review.
      </p>

      <div className="print-action-buttons">
        <button
          type="button"
          className="print-add-cart"
          disabled={!hasModel}
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>

    </aside>
  );
}
