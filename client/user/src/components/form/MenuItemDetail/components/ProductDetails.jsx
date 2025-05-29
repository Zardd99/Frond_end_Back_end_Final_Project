import React from "react";
import { Link } from "react-router-dom";

const ProductDetails = ({ menuItem, totalPrice, quantity, children }) => (
  <div className="lg:col-span-2 bg-background rounded-3xl p-6 lg:p-8">
    <h1 className="cal-sans-bold text-3xl lg:text-4xl mb-4">
      {menuItem.title}
    </h1>

    <div className="mb-6">
      <span className="cal-sans-bold text-3xl text-bold-red">
        ${totalPrice.toFixed(2)}
      </span>
      {quantity > 1 && (
        <span className="text-regular ml-2">
          (${(totalPrice / quantity).toFixed(2)} each)
        </span>
      )}
    </div>

    <p className="cal-sans-regular text-dark opacity-50 mb-6 leading-relaxed">
      {menuItem.description}
    </p>

    {children}
  </div>
);

export default ProductDetails;
