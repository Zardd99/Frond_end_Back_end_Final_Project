import React from "react";

const SizeOptions = ({ sizes, selectedSize, onSelectSize, basePrice }) => (
  <div className="mb-6">
    <h3 className="cal-sans-bold text-lg mb-3">Size</h3>
    <div className="grid grid-cols-2 gap-2">
      {sizes.map((size) => (
        <button
          key={size.id}
          onClick={() => onSelectSize(size.id)}
          className={`p-3 rounded-xl border-2 transition-all duration-200 ${
            selectedSize === size.id
              ? "border-bold-red bg-bold-red text-light"
              : "border-regular-hover hover:border-bold-red hover:bg-very-light-red"
          }`}
        >
          <div className="font-medium">{size.name}</div>
          <div className="text-sm opacity-75">
            ${(basePrice * size.multiplier).toFixed(2)}
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default SizeOptions;
