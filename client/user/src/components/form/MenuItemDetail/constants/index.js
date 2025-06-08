export const SIZE_OPTIONS = [
  { id: "small", name: "Small", multiplier: 0.8 },
  { id: "regular", name: "Regular", multiplier: 1.0 },
  { id: "large", name: "Large", multiplier: 1.3 },
  { id: "extra-large", name: "Extra Large", multiplier: 1.6 },
];

export const ADD_ON_OPTIONS = [
  { id: "extra-cheese", name: "Extra Cheese", price: 1.5 },
  { id: "bacon", name: "Bacon", price: 2.0 },
  { id: "avocado", name: "Avocado", price: 1.75 },
  { id: "extra-sauce", name: "Extra Sauce", price: 0.5 },
  { id: "fries", name: "Side of Fries", price: 3.0 },
  { id: "drink", name: "Drink Combo", price: 2.5 },
];

export const INITIAL_STATE = {
  quantity: 1,
  selectedSize: "regular",
  selectedAddOns: [],
  showReviewForm: false,
  newComment: "",
  newRating: 5,
  isAddingToCart: false,
  notification: null,
};
