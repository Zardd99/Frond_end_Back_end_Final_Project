import React from "react";

const QuantitySelector = ({ quantity, onQuantityChange }) => (
  <div className="mb-8">
    <h3 className="cal-sans-bold text-lg mb-3">Quantity</h3>
    <div className="flex items-center space-x-4">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-bold-red text-bold-red hover:bg-bold-red hover:text-light transition-colors"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="text-xl font-medium w-8 text-center">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-bold-red text-bold-red hover:bg-bold-red hover:text-light transition-colors"
      >
        +
      </button>
    </div>
  </div>
);

export default QuantitySelector;
