import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({
  comments,
  onDelete,
  onUpdate,
  isAdmin,
  currentUserId,
}) => {
  if (comments.length === 0) {
    return (
      <p className="cal-sans-regular text-center text-regular py-8">
        No reviews yet. Be the first to review this item!
      </p>
    );
  }

  return (
    <div className="space-y-6 ">
      {comments.map((comment) => (
        <ReviewItem
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isAdmin={isAdmin}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default ReviewList;
