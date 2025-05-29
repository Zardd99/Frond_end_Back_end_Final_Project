import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import useMenuItemData from "./hooks/useMenuItemData";
import useCartActions from "./hooks/useCartActions";
import useReviews from "./hooks/useReviews";
import useOrder from "./hooks/useOrder";
import ProductDetails from "./components/ProductDetails";
import SizeOptions from "./components/SizeOptions";
import AddOnOptions from "./components/AddOnOptions";
import QuantitySelector from "./components/QuantitySelector";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";
import ErrorBoundary from "../../../ErrorBoundary";

const SIZE_OPTIONS = [
  { id: "small", name: "Small", multiplier: 0.8 },
  { id: "regular", name: "Regular", multiplier: 1.0 },
  { id: "large", name: "Large", multiplier: 1.3 },
  { id: "extra-large", name: "Extra Large", multiplier: 1.6 },
];

const ADD_ON_OPTIONS = [
  { id: "extra-cheese", name: "Extra Cheese", price: 1.5 },
  { id: "bacon", name: "Bacon", price: 2.0 },
  { id: "avocado", name: "Avocado", price: 1.75 },
  { id: "extra-sauce", name: "Extra Sauce", price: 0.5 },
  { id: "fries", name: "Side of Fries", price: 3.0 },
  { id: "drink", name: "Drink Combo", price: 2.5 },
];

const INITIAL_STATE = {
  quantity: 1,
  selectedSize: "regular",
  selectedAddOns: [],
  showReviewForm: false,
  newComment: "",
  newRating: 5,
  isAddingToCart: false,
  notification: null,
};

const MenuItemDetail = () => {
  const { itemId } = useParams();
  const { session } = UserAuth();

  //
  // State
  //
  const [state, setState] = useState(INITIAL_STATE);
  const {
    quantity,
    selectedSize,
    selectedAddOns,
    showReviewForm,
    newComment,
    newRating,
    isAddingToCart,
    notification,
  } = state;

  //
  // Custom hooks
  //
  const {
    menuItem,
    isAdmin,
    refetch,
    error: menuError,
  } = useMenuItemData(itemId, session);
  const { addToCart } = useCartActions(session);
  const { createOrder, isProcessing: isOrderProcessing } = useOrder(session);
  const { comments, fetchComments, submitReview, deleteReview, updateReview } =
    useReviews(itemId, session, isAdmin);

  //
  // Calc Total Price
  //
  const totalPrice = useMemo(() => {
    if (!menuItem?.price_tag) return 0;

    const basePrice = parseFloat(menuItem.price_tag.replace("$", ""));
    if (isNaN(basePrice)) return 0;

    const sizeMultiplier =
      SIZE_OPTIONS.find((s) => s.id === selectedSize)?.multiplier || 1;
    const sizedPrice = basePrice * sizeMultiplier;

    const addOnTotal = selectedAddOns.reduce((total, id) => {
      const addOn = ADD_ON_OPTIONS.find((o) => o.id === id);
      return total + (addOn?.price || 0);
    }, 0);

    return (sizedPrice + addOnTotal) * quantity;
  }, [menuItem, selectedSize, selectedAddOns, quantity]);

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const showNotification = useCallback(
    (message, type = "success") => {
      updateState({ notification: { message, type } });
      setTimeout(() => updateState({ notification: null }), 3000);
    },
    [updateState]
  );

  const handleError = useCallback(
    (error, context = "") => {
      console.error(`Error in ${context}:`, error);
      showNotification(
        `${context ? context + ": " : ""}${error.message}`,
        "error"
      );
    },
    [showNotification]
  );

  //
  // Account Checking
  //
  const requireAuth = useCallback(
    (action) => {
      if (!session) {
        showNotification("Please login to " + action, "warning");
        return false;
      }
      return true;
    },
    [session, showNotification]
  );

  useEffect(() => {
    if (itemId) {
      fetchComments().catch((error) => handleError(error, "Loading reviews"));
    }
  }, [itemId, fetchComments, handleError]);

  //
  //
  //

  // handle function

  //
  // add to cart
  //
  const handleAddToCart = useCallback(
    async (options = { suppressAlert: false }) => {
      if (!requireAuth("add items to cart")) return { success: false };

      updateState({ isAddingToCart: true });

      try {
        const result = await addToCart(
          itemId,
          menuItem,
          selectedSize,
          selectedAddOns,
          quantity,
          totalPrice
        );

        if (result.success && !options.suppressAlert) {
          showNotification(result.message);
        }
        return result;
      } catch (error) {
        handleError(error, "Adding to cart");
        return { success: false, message: error.message };
      } finally {
        updateState({ isAddingToCart: false });
      }
    },
    [
      requireAuth,
      updateState,
      addToCart,
      itemId,
      menuItem,
      selectedSize,
      selectedAddOns,
      quantity,
      totalPrice,
      showNotification,
      handleError,
    ]
  );

  //
  // buy now click
  //
  const handleBuyNow = useCallback(async () => {
    if (!requireAuth("place an order")) return;

    if (isOrderProcessing || isAddingToCart) {
      console.warn("Order already in progress");
      return;
    }

    try {
      const addResult = await handleAddToCart({ suppressAlert: true });
      if (!addResult.success) {
        throw new Error(addResult.message);
      }

      const orderResult = await createOrder();

      if (orderResult.success) {
        showNotification(
          `Order #${
            orderResult.orderId
          } placed successfully! Total: ${orderResult.total.toFixed(2)}`
        );
      } else {
        throw new Error(orderResult.message);
      }
    } catch (error) {
      handleError(error, "Placing order");
    }
  }, [
    requireAuth,
    handleAddToCart,
    createOrder,
    showNotification,
    handleError,
    isOrderProcessing,
    isAddingToCart,
  ]);

  const handleAddOnToggle = useCallback(
    (addOnId) => {
      updateState({
        selectedAddOns: selectedAddOns.includes(addOnId)
          ? selectedAddOns.filter((id) => id !== addOnId)
          : [...selectedAddOns, addOnId],
      });
    },
    [selectedAddOns, updateState]
  );

  //
  // Submit Review
  //
  const handleSubmitReview = useCallback(
    async (e) => {
      e.preventDefault();
      if (!requireAuth("submit a review")) return;

      try {
        await submitReview(newComment, newRating);
        await fetchComments();
        await refetch();
        updateState({
          newComment: "",
          newRating: 5,
          showReviewForm: false,
        });
        showNotification("Review submitted successfully!");
      } catch (error) {
        handleError(error, "Submitting review");
      }
    },
    [
      requireAuth,
      submitReview,
      newComment,
      newRating,
      fetchComments,
      refetch,
      updateState,
      showNotification,
      handleError,
    ]
  );

  //
  // Delete Review
  //
  const handleDeleteReview = useCallback(
    async (commentId, userId) => {
      try {
        await deleteReview(commentId, userId);
        await fetchComments();
        await refetch();
        showNotification("Review deleted successfully!");
      } catch (error) {
        handleError(error, "Deleting review");
      }
    },
    [deleteReview, fetchComments, refetch, showNotification, handleError]
  );

  //
  // Edit Review
  //
  const handleUpdateReview = useCallback(
    async (commentId, text, rating) => {
      try {
        await updateReview(commentId, text, rating);
        await fetchComments();
        await refetch();
        showNotification("Review updated successfully!");
      } catch (error) {
        handleError(error, "Updating review");
      }
    },
    [updateReview, fetchComments, refetch, showNotification, handleError]
  );

  if (menuError) {
    return (
      <div className="container mx-auto p-4 lg:p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading menu item: {menuError.message}
        </div>
      </div>
    );
  }

  if (!menuItem) {
    return (
      <div className="container mx-auto p-4 lg:p-8">
        <div className="text-center py-8">
          <p className="text-gray-500">Menu item not found</p>
          <Link
            to="/menu"
            className="text-bold-red hover:underline mt-4 inline-block"
          >
            &larr; Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="p-4"></div>
      <div className="container mx-auto p-4 lg:p-8">
        <div className="mb-6">
          <Link to="/menu" className="text-bold-red hover:underline">
            &larr; Back to Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="bg-light rounded-2xl overflow-hidden shadow-lg h-full">
              {menuItem.image_url ? (
                <img
                  src={menuItem.image_url}
                  alt={menuItem.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentNode.innerHTML = `
                      <div class="bg-light border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-regular">
                        Image not available
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="bg-regular-hover border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-regular">
                  No image available
                </div>
              )}
            </div>
          </div>

          <ProductDetails
            menuItem={menuItem}
            totalPrice={totalPrice}
            quantity={quantity}
          >
            <SizeOptions
              sizes={SIZE_OPTIONS}
              selectedSize={selectedSize}
              onSelectSize={(size) => updateState({ selectedSize: size })}
              basePrice={parseFloat(menuItem.price_tag.replace("$", "")) || 0}
            />

            <AddOnOptions
              addOns={ADD_ON_OPTIONS}
              selectedAddOns={selectedAddOns}
              onToggleAddOn={handleAddOnToggle}
            />

            <QuantitySelector
              quantity={quantity}
              onQuantityChange={(qty) => updateState({ quantity: qty })}
            />

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || !menuItem}
                className="w-full bg-bold-red hover:bg-bold-red-hover text-light py-4 rounded-xl font-medium text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isAddingToCart || isOrderProcessing || !menuItem}
                className="w-full bg-green hover:opacity-90 text-light py-4 rounded-xl font-medium text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOrderProcessing ? "Processing..." : "Buy Now"}
              </button>
            </div>
          </ProductDetails>

          {/*  */}
          {/* Order Notify */}
          {/*  */}
          {notification && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                notification.type === "error"
                  ? "bg-light-red text-red border border-light-red"
                  : notification.type === "warning"
                  ? "bg-yellow-light text-yellow-dark border border-yellow-light"
                  : "bg-light-green text-green border border-light-green"
              }`}
            >
              {notification.message}
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="bg-background rounded-3xl p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="cal-sans-bold text-2xl lg:text-3xl">
              Customer Reviews
            </h2>
            {session && (
              <button
                onClick={() => updateState({ showReviewForm: !showReviewForm })}
                className="bg-bold-red hover:bg-bold-red-hover text-light px-6 py-2 rounded-xl transition-colors"
              >
                {showReviewForm ? "Hide Form" : "Write Review"}
              </button>
            )}
          </div>

          {showReviewForm && session && (
            <ReviewForm
              onSubmit={handleSubmitReview}
              onCancel={() => updateState({ showReviewForm: false })}
              rating={newRating}
              setRating={(rating) => updateState({ newRating: rating })}
              comment={newComment}
              setComment={(comment) => updateState({ newComment: comment })}
            />
          )}

          <ReviewList
            comments={comments}
            onDelete={handleDeleteReview}
            onUpdate={handleUpdateReview}
            isAdmin={isAdmin}
            currentUserId={session?.user.id}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default MenuItemDetail;
