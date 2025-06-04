import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, X, Trash2 } from "lucide-react";
import { UserAuth } from "../../../../context/AuthContext";
import { supabase } from "../../../../../../../server/middleware/supabaseClient";

const CartContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth();

  useEffect(() => {
    let subscription;
    const fetchCartItems = async () => {
      if (!user) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("cart_items")
          .select(
            `
                id,
                quantity,
                size,
                size_multiplier,
                selected_add_ons,
                total_price,
                menu_items (
                    id,
                    title,
                    image_url,
                    price_tag
                )
            `
          )
          .eq("user_id", user.id);

        if (error) throw error;

        const transformedItems = data.map((item) => {
          const basePrice = parseFloat(
            item.menu_items.price_tag?.replace("$", "") || 0
          );
          const addOnTotal = (item.selected_add_ons || []).reduce(
            (sum, addOn) => sum + (addOn.price || 0),
            0
          );
          const totalPrice =
            item.total_price ||
            (basePrice * (item.size_multiplier || 1) + addOnTotal) *
              item.quantity;

          return {
            id: item.id,
            name: item.menu_items.name,
            image_url: item.menu_items.image_url,
            quantity: item.quantity,
            size: item.size,
            size_multiplier: item.size_multiplier || 1,
            base_price: basePrice,
            selected_add_ons: item.selected_add_ons || [],
            total_price: totalPrice,
          };
        });

        setCartItems(transformedItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    // fetchCartItems();

    const setupRealtime = () => {
      if (!user) return;

      subscription = supabase
        .channel("cart-updates")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "cart_items",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            fetchCartItems();
          }
        )
        .subscribe();
    };

    if (user) {
      fetchCartItems();
      setupRealtime();
    } else {
      setCartItems([]);
      setLoading(false);
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [user]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity === 0) {
      await removeItem(itemId);
      return;
    }

    try {
      const currentItem = cartItems.find((item) => item.id === itemId);
      if (!currentItem) return;

      const basePrice =
        currentItem.base_price * (currentItem.size_multiplier || 1);
      const addOnTotal = (currentItem.selected_add_ons || []).reduce(
        (total, addOn) => total + (addOn.price || 0),
        0
      );
      const newTotalPrice = (basePrice + addOnTotal) * newQuantity;

      const { error } = await supabase
        .from("cart_items")
        .update({
          quantity: newQuantity,
          total_price: newTotalPrice,
        })
        .eq("id", itemId);

      if (error) throw error;

      setCartItems((items) =>
        items.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: newQuantity,
              total_price: newTotalPrice,
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      setCartItems((items) => items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;

      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const getTotalCartPrice = () =>
    cartItems.reduce((total, item) => total + item.total_price, 0);

  const getTotalItemCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const formatSize = (size) =>
    size.charAt(0).toUpperCase() + size.slice(1).replace("-", " ");

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button className="relative bg-gradient-to-r from-hero-orange-500 to-hero-red-500 text-white p-4 rounded-full shadow-2xl">
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-gradient-to-r from-hero-orange-500 to-hero-red-500 hover:from-hero-orange-600 hover:to-hero-red-600 text-white p-4 rounded-full shadow-2xl hover:shadow-[0_10px_30px_rgba(249,115,22,0.25)] transition-all duration-300 transform hover:scale-105"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-hero-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {getTotalItemCount()}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-hero-orange-500 to-hero-red-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-white/90 mt-1">
                {getTotalItemCount()} item{getTotalItemCount() !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-hero-gray-300 mx-auto mb-4" />
                  <p className="text-hero-gray-500 text-lg">
                    Your cart is empty
                  </p>
                  <p className="text-hero-gray-400 text-sm">
                    Add some delicious items to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-hero-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-hero-gray-100">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div className="w-full h-full bg-hero-gray-200 flex items-center justify-center text-hero-gray-400 text-xs">
                            No Image
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-hero-gray-800 truncate">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-hero-gray-400 hover:text-hero-red-500 p-1 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-sm text-hero-gray-600 mt-1">
                            Size:{" "}
                            <span className="font-medium">
                              {formatSize(item.size)}
                            </span>
                          </p>

                          {item.selected_add_ons?.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-hero-gray-500 mb-1">
                                Add-ons:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {item.selected_add_ons.map((addOn) => (
                                  <span
                                    key={addOn.id}
                                    className="inline-block bg-hero-orange-100 text-hero-orange-800 text-xs px-2 py-1 rounded-full"
                                  >
                                    {addOn.name} (+${addOn.price?.toFixed(2)})
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 rounded-full bg-hero-gray-100 hover:bg-hero-gray-200 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-semibold min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 rounded-full bg-hero-gray-100 hover:bg-hero-gray-200 flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-hero-red-600">
                                ${item.total_price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t bg-hero-gray-50 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={clearCart}
                    className="text-sm text-hero-gray-500 hover:text-hero-red-500 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <div className="text-right">
                    <p className="text-sm text-hero-gray-600">Total</p>
                    <p className="text-2xl font-bold text-hero-red-600">
                      ${getTotalCartPrice().toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gradient-to-r from-offer-fresh-500 to-offer-cool-500 hover:from-offer-fresh-600 hover:to-offer-cool-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContent;
