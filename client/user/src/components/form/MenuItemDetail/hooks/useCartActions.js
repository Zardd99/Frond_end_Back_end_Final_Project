import { useCallback } from "react";
import { supabase } from "../../../../../../../server/middleware/supabaseClient";

export default function useCartActions(session) {
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

  return { addToCart };
}
