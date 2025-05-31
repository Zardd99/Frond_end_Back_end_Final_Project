const ProductDetails = ({ menuItem, totalPrice, quantity, children }) => (
  <div className="w-full relative lg:col-span-2 bg-gradient-to-br from-hero-orange-50 to-hero-red-50 rounded-3xl p-6 lg:p-8">
    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-hero-orange-200 to-hero-red-300 rounded-full opacity-20 animate-pulse"></div>
    <div
      className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-hero-yellow-400 to-hero-orange-500 rounded-full opacity-15 animate-bounce"
      style={{ animationDuration: "3s" }}
    ></div>
    <div
      className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-hero-red-400 to-hero-orange-400 rounded-full opacity-25 animate-ping"
      style={{ animationDuration: "2s" }}
    ></div>
    <span className="cal-sans-bold text-3xl lg:text-4xl text-transparent bg-gradient-to-r from-foodle-brand-500 to-foodle-accent-500 bg-clip-text mb-4">
      {menuItem.title}
    </span>

    <div className="mb-6">
      <span className="cal-sans-bold text-3xl text-transparent bg-gradient-to-r from-hero-red-500 to-hero-orange-500 bg-clip-text">
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
