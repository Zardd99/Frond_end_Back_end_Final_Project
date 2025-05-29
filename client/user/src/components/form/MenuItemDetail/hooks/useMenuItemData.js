import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../../../../../server/middleware/supabaseClient";

export default function useMenuItemData(itemId, session) {
  const [menuItem, setMenuItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [itemResponse, profileResponse] = await Promise.all([
        supabase.from("menu_items").select("*").eq("id", itemId).single(),
        session
          ? supabase
              .from("profiles")
              .select("role")
              .eq("user_id", session.user.id)
              .single()
          : Promise.resolve({ data: null, error: null }),
      ]);

      if (itemResponse.error) throw itemResponse.error;

      setMenuItem(itemResponse.data);
      setIsAdmin(profileResponse.data?.role === "Admin");
    } catch (err) {
      setError(err.message || "Failed to load menu item");
    } finally {
      setLoading(false);
    }
  }, [itemId, session]);

  useEffect(() => {
    if (itemId) fetchData();
  }, [fetchData, itemId]);

  return { menuItem, isAdmin, loading, error, refetch: fetchData };
}
