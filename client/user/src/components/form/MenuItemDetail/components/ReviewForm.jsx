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
  <form onSubmit={onSubmit} className="mb-8 p-6 bg-light rounded-2xl">
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Your Rating</label>
      <StarRating rating={rating} interactive={true} onRate={setRating} />
    </div>

    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="w-full p-4 rounded-xl border border-light focus:border-bold-red focus:outline-none mb-4 resize-vertical"
      placeholder={
        isEditing ? "Edit your review..." : "Share your experience..."
      }
      rows="4"
      required
    />

    <div className="flex space-x-4">
      <button
        type="submit"
        className="bg-bold-red hover:bg-bold-red-hover text-light px-6 py-2 rounded-xl transition-colors"
      >
        {isEditing ? "Update Review" : "Submit Review"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-regular hover:opacity-90 text-light px-6 py-2 rounded-xl transition-colors"
      >
        Cancel
      </button>
    </div>
  </form>
);

export default ReviewForm;
