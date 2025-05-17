import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../../../server/middleware/supabaseClient";
import { UserAuth } from "../AuthContext";

const MenuItemDetail = () => {
  const { itemId } = useParams();
  const { session } = UserAuth();

  const [menuItem, setMenuItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  //
  // FetchData Need to Use
  //
  //
  useEffect(() => {
    const fetchData = async () => {
      const { data: itemData } = await supabase
        .from("menu_items")
        .select("*")
        .eq("id", itemId)
        .single();

      const { data: commentsData } = await supabase
        .from("reviews")
        .select(
          `
            id,
            comment,
            created_at,
            user_id,
            profiles:user_id (email)
          `
        )
        .eq("menu_item_id", itemId);

      if (session) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();

        setIsAdmin(profileData?.role === "Admin");
      }

      setMenuItem(itemData);
      setComments(commentsData || []);
    };

    fetchData();
  }, [itemId, session]);

  //
  // HandleComment
  //
  //
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!session) return alert("Please login to leave reviews");
    if (!newComment.trim()) return alert("Comment cannot be empty");

    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert({
          menu_item_id: itemId,
          user_id: session.user.id,
          comment: newComment.trim(),
        })
        .select("*, profiles(email)");

      if (error) throw error;

      const { error: ratingError } = await supabase.rpc("increment_rating", {
        item_id: itemId,
      });

      if (ratingError) throw ratingError;

      const { data: updatedItem } = await supabase
        .from("menu_items")
        .select("*")
        .eq("id", itemId)
        .single();

      setMenuItem(updatedItem);
      setComments([data[0], ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error:", error);
      alert(`Submission failed: ${error.message}`);
    }
  };

  //
  // HandleDelete
  //
  //
  const handleDeleteComment = async (commentId, commentUserId) => {
    try {
      const { data: isAdmin } = await supabase.rpc("is_admin");

      if (!isAdmin && session?.user.id !== commentUserId) return;

      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", commentId);

      if (!error) {
        setComments(comments.filter((c) => c.id !== commentId));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (!menuItem) return <div className="text-center p-8">Loading item...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-background p-8 rounded-3xl mb-8">
          <Link
            to="/"
            className="cal-sans-bold text-bold-red hover:-translate-x-1 hover:transition-all hover:duration-150 mb-4 inline-block"
          >
            &larr; Back to Menu
          </Link>
          <h1 className="cal-sans-bold text-4xl mb-4">{menuItem.title}</h1>
          <p className="cal-sans-bold text-bold-red text-2xl mb-4">
            {menuItem.price_tag}
          </p>
          <p className="cal-sans-regular mb-6">{menuItem.description}</p>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-8 h-8 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2">({menuItem.rating_value})</span>
          </div>
        </div>

        <div className="bg-background p-8 rounded-3xl">
          <h2 className="cal-sans-bold text-3xl mb-6">Customer Reviews</h2>

          {session ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="cal-sans-regular w-full p-4 rounded-xl border border-background hover:border-light mb-4"
                placeholder="Write your review..."
                rows="3"
              />
              <button
                type="submit"
                className="cal-sans-regular bg-bold-red hover:bg-bold-red-hover text-light px-6 py-2 rounded-lg hover:bg-bold-red-dark"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <div className="mb-8 text-center">
              <Link
                to="/login"
                className="cal-sans-italic text-bold-red hover:underline"
              >
                Log in to leave a review
              </Link>
            </div>
          )}

          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="cal-sans-regular bg-light p-4 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">
                      {comment.profiles?.email || "Admin"}
                    </h3>
                    <p className="text-sm ">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {(isAdmin || session?.user.id === comment.user_id) && (
                    <button
                      onClick={() =>
                        handleDeleteComment(comment.id, comment.user_id)
                      }
                      className="text-bold-red hover:text-bold-red-hover text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-dark">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;
