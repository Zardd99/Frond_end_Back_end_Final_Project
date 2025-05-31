import React from "react";
import StarRating from "./StarRating";

const ReviewForm = ({
  onSubmit,
  onCancel,
  rating,
  setRating,
  comment,
  setComment,
  isEditing = false,
}) => (
  <form
    onSubmit={onSubmit}
    className="mb-8 p-6 bg-gradient-to-br from-offer-accent-50 to-offer-purple-100 rounded-2xl"
  >
    <div className="mb-4">
      <label className="cal-sans-bold block text-sm font-medium mb-2">
        Your Rating
      </label>
      <StarRating rating={rating} interactive={true} onRate={setRating} />
    </div>

    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="cal-sans-regular w-full p-4 rounded-xl border border-light focus:border-bold-red focus:outline-none mb-4 resize-vertical"
      placeholder={
        isEditing ? "Edit your review..." : "Share your experience..."
      }
      rows="4"
      required
    />

    <div className="flex space-x-4">
      <button
        type="submit"
        className="group relative overflow-hidden bg-gradient-to-r from-hero-orange-500 to-hero-red-500 hover:from-hero-orange-600 hover:to-hero-red-600 text-hero-white font-semibold px-5 py-2 rounded-full shadow-2xl hover:shadow-[0_10px_30px_rgba(249,115,22,0.25)] transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">
            {isEditing ? "Update Review" : "Submit Review"}
          </span>
        </div>
        <div className="absolute inset-0 -top-[200%] bg-gradient-to-r from-transparent via-hero-white/30 to-transparent skew-y-12 group-hover:top-[200%] transition-all duration-700"></div>
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="group relative overflow-hidden bg-gradient-to-r from-hero-red-500 to-hero-red-200 hover:from-hero-red-600 hover:to-hero-red-600 text-hero-white font-semibold px-5 py-2 rounded-full shadow-2xl hover:shadow-[0_10px_30px_rgba(249,115,22,0.25)] transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">Cancel</span>
        </div>
        <div className="absolute inset-0 -top-[200%] bg-gradient-to-r from-transparent via-hero-white/30 to-transparent skew-y-12 group-hover:top-[200%] transition-all duration-700"></div>
      </button>
    </div>
  </form>
);

export default ReviewForm;
