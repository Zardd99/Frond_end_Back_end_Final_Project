import React from "react";

const AddOnOptions = ({ addOns, selectedAddOns, onToggleAddOn }) => (
  <div className="mb-6">
    <h3 className="cal-sans-bold text-lg mb-3">Add-ons</h3>
    <div className="space-y-2">
      {addOns.map((addOn) => (
        <label
          key={addOn.id}
          className="flex items-center justify-between p-3 rounded-xl border hover:bg-light cursor-pointer transition-colors"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedAddOns.includes(addOn.id)}
              onChange={() => onToggleAddOn(addOn.id)}
              className="mr-3 w-4 h-4 text-bold-red rounded"
            />
            <span>{addOn.name}</span>
          </div>
          <span className="font-medium">+${addOn.price.toFixed(2)}</span>
        </label>
      ))}
    </div>
  </div>
);

export default AddOnOptions;
