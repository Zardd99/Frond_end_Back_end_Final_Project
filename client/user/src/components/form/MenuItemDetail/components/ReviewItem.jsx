import React, { useState } from "react";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";

const ReviewItem = ({
  comment,
  onDelete,
  onUpdate,
  isAdmin,
  currentUserId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment);
  const [editRating, setEditRating] = useState(comment.rating);

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(comment.id, editText, editRating);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <ReviewForm
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        rating={editRating}
        setRating={setEditRating}
        comment={editText}
        setComment={setEditText}
        isEditing={true}
      />
    );
  }

  return (
    <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
        <div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center space-x-3 mb-2">
            <h3 className="text-hero-gray-900 cal-sans-bold font-semibold text-lg">
              {comment.profiles?.email?.split("@")[0] || "Customer"}
            </h3>
            <StarRating rating={comment.rating || 5} />
            {comment.updated_at && (
              <span className="cal-sans-regular text-xs text-hero-gray-500 ml-2">
                (edited)
              </span>
            )}
          </div>
          <p className="cal-sans-regular text-sm text-hero-gray-500">
            {new Date(comment.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {(isAdmin || currentUserId === comment.user_id) && (
          <div className="flex space-x-2">
            {currentUserId === comment.user_id && (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditText(comment.comment);
                  setEditRating(comment.rating);
                }}
                className="cal-sans-regular text-offer-cool-400 hover:text-offer-cool-500 text-sm pl-0 pr-2 md:px-3 py-1 rounded-lg hover:bg-offer-cool-100 transition-colors"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => onDelete(comment.id, comment.user_id)}
              className="cal-sans-regular text-offer-accent-400 hover:text-offer-accent-500 text-sm px-3 py-1 rounded-lg hover:bg-offer-primary-50 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="cal-sans-regular text-hero-gray-900 leading-relaxed">
        {comment.comment}
      </p>
    </div>
  );
};

export default ReviewItem;
