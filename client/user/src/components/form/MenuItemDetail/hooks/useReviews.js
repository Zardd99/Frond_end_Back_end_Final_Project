import { useState, useCallback } from "react";
import { supabase } from "../../../../../../../server/middleware/supabaseClient";

export default function useReviews(itemId, session, isAdmin) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("reviews")
        .select(
          `
          id,
          comment,
          rating,
          created_at,
          updated_at,
          user_id,
          profiles:user_id (email)
        `
        )
        .eq("menu_item_id", itemId)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setComments(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [itemId]);

  //
  // sumit review
  //
  const submitReview = useCallback(
    async (newComment, newRating) => {
      try {
        const { error: profileError } = await supabase.from("profiles").upsert(
          {
            user_id: session.user.id,
            email: session.user.email,
          },
          { onConflict: "user_id" }
        );

        if (profileError) throw profileError;

        const { data, error: reviewError } = await supabase
          .from("reviews")
          .insert({
            menu_item_id: itemId,
            user_id: session.user.id,
            comment: newComment.trim(),
            rating: newRating,
          })
          .select("*, profiles(email)")
          .single();

        if (reviewError) throw reviewError;

        await supabase.rpc("update_item_rating", { item_id: itemId });
        return data;
      } catch (error) {
        console.error("Review submission error:", error);
        throw error;
      }
    },
    [itemId, session]
  );

  //
  // delete review
  //
  const deleteReview = useCallback(
    async (commentId, commentUserId) => {
      if (!session) return;
      if (!isAdmin && session.user.id !== commentUserId) {
        throw new Error("No permission to delete");
      }

      await supabase.from("reviews").delete().eq("id", commentId);
      await supabase.rpc("update_item_rating", { item_id: itemId });
    },
    [isAdmin, session, itemId]
  );

  //
  // update review
  //
  const updateReview = useCallback(
    async (commentId, editCommentText, editCommentRating) => {
      await supabase
        .from("reviews")
        .update({
          comment: editCommentText.trim(),
          rating: editCommentRating,
          updated_at: new Date().toISOString(),
        })
        .eq("id", commentId);

      await supabase.rpc("update_item_rating", { item_id: itemId });
    },
    [itemId]
  );

  return {
    comments,
    loading,
    error,
    fetchComments,
    submitReview,
    deleteReview,
    updateReview,
  };
}
