import { useState, useCallback, useRef } from "react";
import { supabase } from "../../../../../../../server/middleware/supabaseClient";

const useOrder = (session) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const processingRef = useRef(false);

  const updateOrderStatus = useCallback((status, message) => {
    setOrderStatus({ status, message, timestamp: Date.now() });
  }, []);

  const createOrder = useCallback(
    async (providedCartItems = null) => {
      if (!session?.user) {
        const errorMessage = "User not authenticated";
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }

      if (processingRef.current || isProcessing) {
        console.warn("Order already being processed");
        return { success: false, message: "Order already being processed" };
      }

      processingRef.current = true;
      setIsProcessing(true);
      setError(null);
      updateOrderStatus("starting", "Preparing your order...");

      try {
        //
        // check cart item in database
        let cartItems = providedCartItems;
        if (!cartItems) {
          const { data: fetchedItems, error: fetchError } = await supabase
            .from("cart_items")
            .select("*")
            .eq("user_id", session.user.id);

          if (fetchError) throw fetchError;
          cartItems = fetchedItems;
        }

        if (!cartItems?.length) {
          throw new Error("No items in cart to place an order");
        }

        console.log("Cart items for order:", cartItems);

        updateOrderStatus("calculating", "Calculating order total...");

        const orderTotal = cartItems.reduce((sum, item) => {
          const itemTotal = parseFloat(item.total_price) || 0;

          // Debugging
          // console.log(`Item ${item.id}: ${itemTotal}`);
          return sum + itemTotal;
        }, 0);

        // Debugging
        // console.log("Calculated order total:", orderTotal);

        if (orderTotal <= 0) {
          throw new Error("Invalid order total");
        }

        updateOrderStatus("checking", "Checking for existing orders...");

        // check pending order
        const { data: existingOrders, error: checkError } = await supabase
          .from("orders")
          .select("id")
          .eq("user_id", session.user.id)
          .eq("status", "pending")
          .gte("order_date", new Date(Date.now() - 60000).toISOString());

        if (checkError) throw checkError;

        if (existingOrders?.length > 0) {
          throw new Error("You already have a pending order. Please wait.");
        }

        updateOrderStatus("creating", "Creating your order...");

        //
        // Create order
        //
        const { data: newOrder, error: orderError } = await supabase
          .from("orders")
          .insert([
            {
              user_id: session.user.id,
              total_amount: Number(orderTotal.toFixed(2)), // Ensure proper number format
              status: "pending",
              order_date: new Date().toISOString(),
            },
          ])
          .select("id")
          .single();

        if (orderError) throw orderError;

        updateOrderStatus("processing", "Adding order items...");

        // console.log("Created order:", newOrder);
        // Debugging

        //
        // Create order items
        //
        const orderItems = cartItems.map((item) => {
          const unitPrice = item.quantity
            ? item.total_price / item.quantity
            : item.total_price;
          return {
            order_id: newOrder.id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity || 1,
            size: item.size || "regular",
            add_ons: item.add_ons || [],
            price_at_order: Number(unitPrice.toFixed(2)),
          };
        });

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems);

        if (itemsError) throw itemsError;

        updateOrderStatus("clearing", "Clearing your cart...");

        //
        // Delete Cart if the order success
        //
        const { error: deleteError } = await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", session.user.id);

        if (deleteError) {
          console.warn("Failed to clear cart after order:", deleteError);
        }

        updateOrderStatus("finalizing", "Finalizing your order...");

        //
        // Update order status to completed in database
        //
        const { error: statusError } = await supabase
          .from("orders")
          .update({ status: "completed" })
          .eq("id", newOrder.id);

        if (statusError) {
          console.warn("Failed to update order status:", statusError);
        }

        updateOrderStatus(
          "completed",
          `Order #${newOrder.id} placed successfully!`
        );

        return {
          success: true,
          orderId: newOrder.id,
          total: orderTotal,
          message: `Order #${newOrder.id} placed successfully!`,
        };
      } catch (err) {
        const errorMessage = err.message || "Failed to create order";
        setError(errorMessage);
        updateOrderStatus("error", errorMessage);
        return {
          success: false,
          message: errorMessage,
        };
      } finally {
        setIsProcessing(false);
        processingRef.current = false;
        setTimeout(() => setOrderStatus(null), 5000);
      }
    },
    [session, isProcessing, updateOrderStatus]
  );

  const buyNowDirect = useCallback(
    async (
      itemId,
      menuItem,
      selectedSize,
      selectedAddOns,
      quantity,
      totalPrice
    ) => {
      if (!session?.user) {
        const errorMessage = "User not authenticated";
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }

      if (processingRef.current || isProcessing) {
        console.warn("Order already being processed");
        return { success: false, message: "Order already being processed" };
      }

      processingRef.current = true;
      setIsProcessing(true);
      setError(null);
      updateOrderStatus("starting", "Processing your purchase...");

      try {
        updateOrderStatus("validating", "Validating item details...");

        if (!menuItem || !itemId) {
          throw new Error("Invalid menu item");
        }

        if (totalPrice <= 0) {
          throw new Error("Invalid item price");
        }

        updateOrderStatus("checking", "Checking for existing orders...");

        const { data: existingOrders, error: checkError } = await supabase
          .from("orders")
          .select("id")
          .eq("user_id", session.user.id)
          .eq("status", "pending")
          .gte("order_date", new Date(Date.now() - 60000).toISOString());

        if (checkError) throw checkError;

        if (existingOrders?.length > 0) {
          throw new Error("You already have a pending order. Please wait.");
        }

        updateOrderStatus("creating", "Creating your order...");

        const { data: newOrder, error: orderError } = await supabase
          .from("orders")
          .insert([
            {
              user_id: session.user.id,
              total_amount: Number(totalPrice.toFixed(2)),
              status: "pending",
              order_date: new Date().toISOString(),
            },
          ])
          .select("id")
          .single();

        if (orderError) throw orderError;

        updateOrderStatus("processing", "Adding item to order...");

        const unitPrice = totalPrice / quantity;
        const orderItem = {
          order_id: newOrder.id,
          menu_item_id: itemId,
          quantity: quantity,
          size: selectedSize || "regular",
          add_ons: selectedAddOns || [],
          price_at_order: Number(unitPrice.toFixed(2)),
        };

        const { error: itemError } = await supabase
          .from("order_items")
          .insert([orderItem]);

        if (itemError) throw itemError;

        updateOrderStatus("finalizing", "Finalizing your order...");

        const { error: statusError } = await supabase
          .from("orders")
          .update({ status: "completed" })
          .eq("id", newOrder.id);

        if (statusError) {
          console.warn("Failed to update order status:", statusError);
        }

        updateOrderStatus(
          "completed",
          `Order #${newOrder.id} placed successfully!`
        );

        return {
          success: true,
          orderId: newOrder.id,
          total: totalPrice,
          message: `Order #${newOrder.id} placed successfully!`,
        };
      } catch (err) {
        const errorMessage = err.message || "Failed to process purchase";
        setError(errorMessage);
        updateOrderStatus("error", errorMessage);
        return {
          success: false,
          message: errorMessage,
        };
      } finally {
        setIsProcessing(false);
        processingRef.current = false;
        setTimeout(() => setOrderStatus(null), 5000);
      }
    },
    [session, isProcessing, updateOrderStatus]
  );

  const getOrderHistory = useCallback(async () => {
    if (!session?.user) {
      return { success: false, message: "User not authenticated" };
    }

    try {
      const { data: orders, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (
            *,
            menu_items (name, image_url)
          )
        `
        )
        .eq("user_id", session.user.id)
        .order("order_date", { ascending: false });

      if (error) throw error;

      return {
        success: true,
        orders: orders || [],
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Failed to fetch order history",
      };
    }
  }, [session]);

  return {
    createOrder,
    getOrderHistory,
    buyNowDirect,
    isProcessing,
    error,
    orderStatus,
  };
};

export default useOrder;
