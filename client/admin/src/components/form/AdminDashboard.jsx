import { useEffect, useState } from "react";
import { supabase } from "../../../../../server/middleware/supabaseClient";
import { UserAuth } from "../../../../user/src/context/AuthContext";

const AdminDashboard = () => {
  const { user } = UserAuth();

  const [users, setUsers] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState({ users: true, menu: true });
  const [error, setError] = useState("");
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    price_tag: "",
    description: "",
    image_url: "",
  });
  const [editItem, setEditItem] = useState({
    id: null,
    title: "",
    price_tag: "",
    description: "",
    image_url: "",
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("users");
  const [showNotification, setShowNotification] = useState("");

  //
  // Fetch Users
  //
  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role !== "Admin") return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .order("user_id", { ascending: false });

        if (error) throw error;
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, users: false }));
      }
    };

    fetchUsers();
  }, [user]);

  //
  // Fetch menu items
  //
  useEffect(() => {
    const fetchMenuItemsData = async () => {
      if (user?.role !== "Admin") return;

      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setMenuItems(data);
      } catch (err) {
        setError("Failed to fetch menu items");
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, menu: false }));
      }
    };

    fetchMenuItemsData();
  }, [user]);

  //
  // Update user role
  //
  const updateRole = async (userId, newRole) => {
    const SUPER_ADMIN = import.meta.env.VITE_SUPER_ADMIN;
    const currentUserEmail = user?.email;
    const targetUser = users.find((u) => u.user_id === userId);

    if (userId === user?.id) {
      setError("Cannot change your own role.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (targetUser?.email === SUPER_ADMIN) {
      setError("Cannot proceed the action.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (
      currentUserEmail !== SUPER_ADMIN &&
      targetUser?.role === "Admin" &&
      newRole !== "Admin"
    ) {
      setError("Cannot proceed the action.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("user_id", userId);

      if (error) throw error;
      setUsers(
        users.map((u) => (u.user_id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      setError("Failed to update user role");
      console.error(err);
    }
  };

  //
  // Add menu item
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
      setShowNotification("Menu item added successfully!");
      setTimeout(() => setShowNotification(""), 3000);
    } catch (err) {
      setError("Failed to add menu item");
      console.error(err);
    }
  };

  //
  // Open edit form
  //
  const handleEditClick = (item) => {
    setEditItem({
      id: item.id,
      title: item.title,
      price_tag: item.price_tag,
      description: item.description,
      image_url: item.image_url,
    });
    setShowEditForm(true);
  };

  //
  // Update menu Item
  //
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("menu_items")
        .update({
          title: editItem.title.trim(),
          price_tag: editItem.price_tag.trim(),
          description: editItem.description.trim(),
          image_url: editItem.image_url.trim(),
        })
        .eq("id", editItem.id);

      if (error) throw error;

      setMenuItems(
        menuItems.map((item) =>
          item.id === editItem.id
            ? {
                ...item,
                title: editItem.title.trim(),
                price_tag: editItem.price_tag.trim(),
                description: editItem.description.trim(),
                image_url: editItem.image_url.trim(),
              }
            : item
        )
      );

      setShowEditForm(false);
      setEditItem({
        id: null,
        title: "",
        price_tag: "",
        description: "",
        image_url: "",
      });
      setShowNotification("Item Updated");
      setTimeout(() => setShowNotification(""), 3000);
    } catch (error) {
      setError("Error", error);
    }
  };

  //
  // Delete menu item
  //
  const handleDeleteItem = async () => {
    try {
      const { error } = await supabase
        .from("menu_items")
        .delete()
        .eq("id", itemToDelete);

      if (error) throw error;

      setMenuItems(menuItems.filter((item) => item.id !== itemToDelete));
      setItemToDelete(null);
      setShowNotification("Menu item deleted successfully!");
      setTimeout(() => setShowNotification(""), 3000);
    } catch (err) {
      setError("Failed to delete menu item");
      console.error(err);
    }
  };

  if (user?.role !== "Admin") return null;

  return (
    <div className="flex flex-col w-full h-full items-center cal-sans-regular">
      <div className="p-20"></div>
      <div className="bg-light rounded-lg shadow p-6 container">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "users"
                ? "border-b-2 border-hero-red-400 text-hero-red-500"
                : "text-hero-gray-800"
            }`}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "menu"
                ? "border-b-2 border-hero-red-400 text-hero-red-500"
                : "text-hero-gray-800"
            }`}
            onClick={() => setActiveTab("menu")}
          >
            Menu Management
          </button>
        </div>

        {error && (
          <div className="text-hero-red-600 bg-hero-white/80 backdrop-blur-xl border border-hero-gray-100/20 rounded-3xl p-5 mb-4 absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] shadow-2xl shadow-black/5 z-50">
            {error}
          </div>
        )}

        {showNotification && (
          <div className="text-green-600 bg-green-100 border border-green-200 rounded-3xl p-5 mb-4 absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] shadow-2xl shadow-black/5 z-50">
            {showNotification}
          </div>
        )}

        {activeTab === "users" &&
          (loading.users ? (
            <div className="text-center p-4">Loading users...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Role</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userData) => (
                    <tr
                      key={userData.user_id}
                      className="border-b hover:bg-hero-gray-100"
                    >
                      <td className="p-3">{userData.email}</td>
                      <td className="p-3">
                        <select
                          value={userData.role}
                          onChange={(e) => {
                            updateRole(userData.user_id, e.target.value);
                          }}
                          className="border rounded px-2 py-1"
                        >
                          <option value="User">user</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            userData.banned
                              ? "bg-hero-red-300 text-hero-red-600"
                              : "bg-offer-fresh-300 text-offer-fresh-700"
                          }`}
                        >
                          {userData.banned ? "Banned" : "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

        {activeTab === "menu" && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowInsertForm(true)}
                className="bg-hero-red-500 text-light px-4 py-2 rounded-lg hover:bg-bold-red-hover"
              >
                Add Menu Item
              </button>
            </div>

            {loading.menu ? (
              <div className="text-center p-4">Loading menu items...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-background p-6 rounded-3xl shadow-lg shadow-regular hover:shadow-xl transition-shadow relative"
                  >
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-500 hover:text-blue-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setItemToDelete(item.id)}
                        className="text-hero-red-500 hover:text-hero-red-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="h-48 mb-4 rounded-xl flex items-center justify-center">
                      <img
                        src={item.image_url || ""}
                        alt={item.title}
                        className="object-cover w-full h-full rounded-xl"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                    <h2 className="cal-sans-bold text-2xl mb-2">
                      {item.title}
                    </h2>
                    <p className="cal-sans-bold text-hero-red-500 text-xl mb-4">
                      {item.price_tag}
                    </p>
                    <p className="text-dark mb-4">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showInsertForm && (
        <div className="fixed inset-0 bg-dark bg-opacity-50 flex items-center justify-center p-4 z-70">
          <div className="bg-gradient-to-br from-hero-cyan-200 via-hero-cyan-300 to-hero-cyan-400 p-8 rounded-2xl max-w-md w-full">
            <h2 className="text-2xl mb-4">Add New Menu Item</h2>
            <form onSubmit={handleAddItem}>
              <input
                type="text"
                placeholder="Item Name"
                className="w-full p-3 mb-3 rounded-xl border"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Price (e.g., $5.99)"
                className="w-full p-3 mb-3 rounded-xl border"
                value={newItem.price_tag}
                onChange={(e) =>
                  setNewItem({ ...newItem, price_tag: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 mb-3 rounded-xl border"
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
                className="w-full p-3 mb-4 rounded-xl border"
                value={newItem.image_url}
                onChange={(e) =>
                  setNewItem({ ...newItem, image_url: e.target.value })
                }
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-hero-red-500 text-light px-6 py-2 rounded-lg hover:bg-bold-red-hover"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowInsertForm(false)}
                  className="bg-hero-gray-500 text-light px-6 py-2 rounded-lg hover:bg-regular-hover"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UpdateForm */}
      {/* UpdateForm */}
      {/* UpdateForm */}

      {showEditForm && (
        <div className="fixed inset-0 bg-dark bg-opacity-50 flex items-center justify-center p-4 z-70">
          <div className="bg-gradient-to-br from-hero-cyan-200 via-hero-cyan-300 to-hero-cyan-400 p-8 rounded-2xl max-w-md w-full">
            <h2 className="text-2xl mb-4">Add New Menu Item</h2>
            <form onSubmit={handleUpdateItem}>
              <input
                type="text"
                placeholder="Item Name"
                className="w-full p-3 mb-3 rounded-xl border"
                value={editItem.title}
                onChange={(e) =>
                  setEditItem({ ...editItem, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Price (e.g., $5.99)"
                className="w-full p-3 mb-3 rounded-xl border"
                value={editItem.price_tag}
                onChange={(e) =>
                  setEditItem({ ...editItem, price_tag: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 mb-3 rounded-xl border"
                value={editItem.description}
                onChange={(e) =>
                  setEditItem({ ...editItem, description: e.target.value })
                }
                rows="3"
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                className="w-full p-3 mb-4 rounded-xl border"
                value={editItem.image_url}
                onChange={(e) =>
                  setEditItem({ ...editItem, image_url: e.target.value })
                }
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-hero-red-500 text-light px-6 py-2 rounded-lg hover:bg-bold-red-hover"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditItem({
                      id: null,
                      title: "",
                      price_tag: "",
                      description: "",
                      image_url: "",
                    });
                  }}
                  className="bg-hero-gray-500 text-light px-6 py-2 rounded-lg hover:bg-regular-hover"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {itemToDelete && (
        <div className="fixed inset-0 bg-dark bg-opacity-50 flex items-center justify-center p-4 z-70">
          <div className="bg-hero-gray-200 p-8 rounded-2xl max-w-md w-full">
            <h2 className="text-2xl mb-4">Delete Menu Item?</h2>
            <p className="mb-6">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className="flex gap-4">
              <button
                className="bg-hero-red-600 text-hero-gray-200 px-6 py-2 rounded-lg hover:bg-bold-red-hover"
                onClick={handleDeleteItem}
              >
                Delete
              </button>
              <button
                className="bg-hero-gray-300 text-hero-gray-900 px-6 py-2 rounded-lg hover:bg-regular-hover"
                onClick={() => setItemToDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
