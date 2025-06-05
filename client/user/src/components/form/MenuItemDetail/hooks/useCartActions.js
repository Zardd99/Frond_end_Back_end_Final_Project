import { useCallback, useState, useEffect } from "react";
import { supabase } from "../../../../../../../server/middleware/supabaseClient";

export default function useCartActions(session) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = useCallback(async () => {
    if (!session?.user) return [];

    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from("cart_items")
        .select()
        .eq("user_id", session.user.id);

      if (fetchError) throw fetchError;
      return data || [];
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!session?.user) return;

    let subscription;
    let isMounted = true;

    const setupSubscription = async () => {
      try {
        // Initial fetch
        const items = await fetchCartItems();
        if (isMounted) setCartItems(items);

        // Realtime subscription
        subscription = supabase
          .channel(`cart:${session.user.id}`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "cart_items",
              filter: `user_id=eq.${session.user.id}`,
            },
            async (payload) => {
              if (payload.eventType === "DELETE" && !payload.old.id) {
                const updatedItems = await fetchCartItems();
                if (isMounted) setCartItems(updatedItems);
              } else {
                switch (payload.eventType) {
                  case "INSERT":
                    setCartItems((prev) => [...prev, payload.new]);
                    break;
                  case "UPDATE":
                    setCartItems((prev) =>
                      prev.map((item) =>
                        item.id === payload.new.id ? payload.new : item
                      )
                    );
                    break;
                  case "DELETE":
                    setCartItems((prev) =>
                      prev.filter((item) => item.id !== payload.old.id)
                    );
                    break;
                }
              }
            }
          )
          .subscribe();
      } catch (error) {
        console.error("Subscription setup failed:", error);
      }
    };

    setupSubscription();

    return () => {
      isMounted = false;
      if (subscription) supabase.removeChannel(subscription);
    };
  }, [session, fetchCartItems]);

  const addToCart = useCallback(
    async (
      itemId,
      menuItem,
      selectedSize,
      selectedAddOns,
      quantity,
      totalPrice
    ) => {
      try {
        const { data: existingItems, error: fetchError } = await supabase
          .from("cart_items")
          .select()
          .eq("user_id", session.user.id)
          .eq("menu_item_id", itemId)
          .eq("size", selectedSize)
          .contains("add_ons", selectedAddOns);

        if (fetchError) throw fetchError;

        if (existingItems.length > 0) {
          const newQuantity = existingItems[0].quantity + quantity;
          const { error: updateError } = await supabase
            .from("cart_items")
            .update({
              quantity: newQuantity,
              total_price: existingItems[0].total_price,
            })
            .eq("id", existingItems[0].id);

          if (updateError) throw updateError;
          return {
            success: true,
            message: `Updated quantity to ${newQuantity} for ${menuItem.title} in cart!`,
          };
        } else {
          const cartItem = {
            user_id: session.user.id,
            menu_item_id: itemId,
            quantity,
            size: selectedSize,
            add_ons: selectedAddOns,
            total_price: totalPrice,
          };

          const { error } = await supabase
            .from("cart_items")
            .insert([cartItem]);
          if (error) throw error;
          return {
            success: true,
            message: `Added ${quantity} ${menuItem.title}(s) to cart!`,
          };
        }
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
    [session]
  );

  const clearCart = useCallback(async () => {
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    try {
      setCartItems([]);

      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", session.user.id);

      if (error) throw error;
    } catch (error) {
      const items = await fetchCartItems();
      setCartItems(items);
      throw error;
    }
  }, [session, fetchCartItems]);

  return { addToCart, cartItems, clearCart, loading, error };
}
