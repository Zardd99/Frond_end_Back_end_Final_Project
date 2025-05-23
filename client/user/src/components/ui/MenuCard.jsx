import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../../../server/middleware/supabaseClient";
import { UserAuth } from "../../context/AuthContext";

const MenuCard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { session } = UserAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    price_tag: "",
    description: "",
    image_url: "",
  });
  const [itemToDelete, setItemToDelete] = useState(null);

  //
  // Fetch Data From menu_item tb
  //
  //
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  //
  // Fetch User's Status
  //
  //
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (!session) return;
        const { data: profiles } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();

        setIsAdmin(profiles?.role === "Admin");
      } catch (error) {
        setError("Error", error);
      }
    };
    checkAdminStatus();
  }, [session]);

  //
  // Add item from
  //
  //
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .insert([newItem])
        .select();

      if (error) throw error;

      setMenuItems([data[0], ...menuItems]);
      setShowInsertForm(false);
      setNewItem({
        title: "",
        price_tag: "",
        description: "",
        image_url: "",
      });
    } catch (err) {
      setError("Error", err);
    }
  };

  //
  // Delete item's Form
  //
  //

  const handleDeleteItem = async () => {
    try {
      const { error } = await supabase
        .from("menu_items")
        .delete()
        .eq("id", itemToDelete);

      if (!error) {
        setMenuItems(menuItems.filter((item) => item.id !== itemToDelete));
      }
      setItemToDelete(null);
    } catch (error) {
      setError("DeleteFail", error);
    }
  };

  if (loading) return <div className="text-center p-8">Loading menu...</div>;

  return (
    <div className="container mx-auto p-8 relative">
      {error && (
        <div className="error-message bg-red-100 text-red-700 p-3 rounded-lg mt-4 mx-auto max-w-md text-center">
          {error}
        </div>
      )}
      {isAdmin && (
        <div className="fixed bottom-8 right-8 flex gap-4">
          <button
            onClick={() => {
              setShowInsertForm(true);
            }}
            className="bg-bold-red text-white p-4 rounded-full shadow-lg hover:bg-bold-red-hover transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      )}
      {showInsertForm && (
        <div className="fixed inset-0 bg-dark bg-opacity-50 flex items-center justify-center p-4 z-70">
          <div className="bg-background p-8 rounded-2xl max-w-md w-full">
            <h2 className="text-2xl mb-4">Add New Menu Item</h2>
            <form onSubmit={handleAddItem}>
              <input
                type="text"
                placeholder="Item Name"
                className="w-full p-3 mb-3 rounded-xl"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Price (e.g., $5.99)"
                className="w-full p-3 mb-3 rounded-xl"
                value={newItem.price_tag}
                onChange={(e) =>
                  setNewItem({ ...newItem, price_tag: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 mb-3 rounded-xl"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                rows="3"
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                className="w-full p-3 mb-4 rounded-xl"
                value={newItem.image_url}
                onChange={(e) =>
                  setNewItem({ ...newItem, image_url: e.target.value })
                }
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-bold-red text-light px-6 py-2 rounded-lg hover:bg-bold-red-hover"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowInsertForm(false)}
                  className="bg-regular text-light px-6 py-2 rounded-lg hover:bg-regular-hover"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/*  */}
      {/* Card */}
      {/*  */}
      <h1 className="cal-sans-bold text-4xl mb-8">Our Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-background p-6 rounded-3xl shadow-lg shadow-regular hover:shadow-xl transition-shadow relative group"
          >
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setItemToDelete(item.id);
                }}
                className="absolute top-4 right-4 pointer z-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-bold-red hover:text-bold-red-hover hover:scale-115 transition-all duration-300"
                >
                  <path
                    fill-rule="evenodd"
                    d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15ZM9 12.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            )}
            <Link
              key={item.id}
              to={`/dashboard/menu/${item.id}`}
              className="bg-background p-6 rounded-3xl z-2"
            >
              {/* The Information
               */}
              <div className="h-48 mb-4 rounded-xl flex items-center justify-center">
                <img
                  src={item.image_url || ""}
                  alt={item.title}
                  className=" object-cover cal-sans-regular group-hover:scale-105 transition-all duration-300 select-none z-1"
                />
              </div>
              <h2 className="cal-sans-bold text-2xl mb-2">{item.title}</h2>
              <p className="cal-sans-bold text-bold-red text-xl mb-4">
                {item.price_tag}
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-light"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2">({item.rating_value})</span>
              </div>
            </Link>
            {/*  */}
            {/* Confirm Delete Form */}
            {/*  */}

            {itemToDelete && (
              <div className="fixed  inset-0 bg-opacity-100 flex items-center justify-center p-4 z-70">
                <div className="bg-delete-form text-light p-8 rounded-2xl max-w-md w-full">
                  <h2 className="text-2xl mb-4">Delete The Item?</h2>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-dark text-light px-6 py-2 rounded-lg hover:bg-bold-red-hover cursor-pointer hover:scale-105 transition-all duration-200"
                      onClick={handleDeleteItem}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setItemToDelete(null)}
                      className="bg-regular text-light px-6 py-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
