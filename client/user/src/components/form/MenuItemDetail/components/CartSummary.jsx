import { useEffect } from "react";
import { useCart } from "../../../../context/CardContext";

const CartSummary = () => {
  const { cartItems, loading, clearCart } = useCart();

  useEffect(() => {
    const handleCartCleared = () => {
      clearCart();
    };

    window.addEventListener("cartCleared", handleCartCleared);

    return () => {
      window.removeEventListener("cartCleared", handleCartCleared);
    };
  }, [clearCart]);

  if (loading) return <div> Loading </div>;

  return (
    <div className="bg-light rounded-xl p-4 shadow-md">
      <h3 className="cal-sans-bold text-lg mb-3">Your Cart</h3>
      {cartItems.length === 0 ? (
        <p className="text-hero-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.menu_item_id}</p>
                <p className="text-sm text-hero-gray-500">
                  {item.quantity}x {item.size}
                </p>
              </div>
              <p className="font-semibold">${item.total_price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 pt-2 border-t">
        <p className="flex justify-between font-bold">
          <span>Total:</span>
          <span>
            $
            {cartItems
              .reduce((sum, item) => sum + item.total_price, 0)
              .toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
