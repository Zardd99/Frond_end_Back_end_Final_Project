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
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-lg">
              {comment.profiles?.email?.split("@")[0] || "Customer"}
            </h3>
            <StarRating rating={comment.rating || 5} />
            {comment.updated_at && (
              <span className="text-xs text-regular ml-2">(edited)</span>
            )}
          </div>
          <p className="text-sm text-regular">
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
                className="text-offer-cool-400 hover:text-offer-cool-500 text-sm px-3 py-1 rounded-lg hover:bg-offer-cool-100 transition-colors"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => onDelete(comment.id, comment.user_id)}
              className="text-offer-accent-400 hover:text-offer-accent-500 text-sm px-3 py-1 rounded-lg hover:bg-offer-primary-50 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="text-dark leading-relaxed">{comment.comment}</p>
    </div>
  );
};

export default ReviewItem;
