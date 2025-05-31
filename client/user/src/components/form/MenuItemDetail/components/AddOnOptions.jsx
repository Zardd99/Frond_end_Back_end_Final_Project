import React from "react";

const AddOnOptions = ({ addOns, selectedAddOns, onToggleAddOn }) => (
  <div className="mb-8 w-full">
    <h3 className="cal-sans-bold text-xl mb-4 text-foodle-neutral-800">
      Add-ons
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {addOns.map((addOn) => {
        const isSelected = selectedAddOns.includes(addOn.id);
        return (
          <div
            key={addOn.id}
            onClick={() => onToggleAddOn(addOn.id)}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? "border-foodle-brand-500 bg-foodle-brand-50"
                  : "border-foodle-neutral-200 hover:border-foodle-brand-300 bg-foodle-neutral-100"
              }
            `}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-foodle-brand-500 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            <div className="flex items-start">
              <div
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mr-3
                ${
                  isSelected
                    ? "bg-foodle-brand-500 border-foodle-brand-500"
                    : "border-2 border-foodle-neutral-400 bg-light"
                }
              `}
              >
                {isSelected && (
                  <svg
                    className="w-3 h-3 text-light"
                    viewBox="0 0 12 9"
                    fill="none"
                  >
                    <path
                      d="M10.3333 1L4 7.33333L1.66667 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span
                    className={`font-medium ${
                      isSelected ? "text--brand-800" : "text-foodle-neutral-800"
                    }`}
                  >
                    {addOn.name}
                  </span>
                  <span
                    className={`font-medium ml-2 ${
                      isSelected
                        ? "text-foodle-brand-600"
                        : "text-foodle-neutral-600"
                    }`}
                  >
                    +${addOn.price.toFixed(2)}
                  </span>
                </div>

                {addOn.description && (
                  <p className="mt-1 text-sm text-foodle-neutral-500">
                    {addOn.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default AddOnOptions;
