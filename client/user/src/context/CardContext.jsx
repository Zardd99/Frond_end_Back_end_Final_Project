import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../../../server/middleware/supabaseClient";
import { UserAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth();

  const transformCartItems = (data) => {
    return data
      .filter((item) => item?.menu_items)
      .map((item) => ({
        id: item.id,
        name: item.menu_items.title,
        quantity: item.quantity || 1,
        size: item.size,
        total_price: item.total_price || 0,
      }));
  };

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
            id, quantity, size, total_price,
            menu_items (id, title)
          `
          )
          .eq("user_id", user.id);

        if (error) throw error;
        setCartItems(transformCartItems(data || []));
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    const setupRealtime = () => {
      subscription = supabase
        .channel(`cart-${user.id}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "cart_items" },
          (payload) => {
            if (payload.eventType === "DELETE") {
              setCartItems((prev) =>
                prev.filter((item) => item.id !== payload.old.id)
              );
            } else {
              fetchCartItems();
            }
          }
        )
        .subscribe();
    };

    fetchCartItems();
    if (user) setupRealtime();

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, [user]);

  const clearCart = async () => {
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
  };

  return (
    <CartContext.Provider value={{ cartItems, loading, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
