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
  const [newItem, setNewItem] = useState({
    title: "",
    price_tag: "",
    description: "",
    image_url: "",
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("users");

  //
  // Fetch Users
  //
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
  //
  useEffect(() => {
    const fetchMenuItems = async () => {
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

    fetchMenuItems();
  }, [user]);

  //
  // Update user role
  //
  //
  const updateRole = async (userId, newRole) => {
    const SUPER_ADMIN = import.meta.env.VITE_SUPER_ADMIN;
    const currentUserEmail = user?.email;
    const targetUser = users.find((u) => u.user_id === userId);

    if (userId === user?.id) {
      setError("Cannot change your own role.", error);
      setTimeout(() => {
        setError("");
      }, 3000);
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
      setError("Failed to update user role", err);
    }
  };

  //
  // Add menu item
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
      setError("Failed to add menu item");
      console.error(err);
    }
  };

  //
  // Delete menu item
  //
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
          <div className="text-hero-red-600 bg-hero-white/80 backdrop-blur-xl border border-hero-gray-100/20 rounded-3xl p-5  mb-4 absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] shadow-2xl shadow-black/5">
            {error}
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
                          // disabled={userData.user_id === user.id}
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
                    <button
                      onClick={() => setItemToDelete(item.id)}
                      className="absolute top-4 right-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-hero-red-500 hover:text-hero-red-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15ZM9 12.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <div className="h-48 mb-4 rounded-xl flex items-center justify-center">
                      <img
                        src={item.image_url || ""}
                        alt={item.title}
                        className="object-cover w-full h-full rounded-xl"
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

      {itemToDelete && (
        <div className="fixed inset-0  flex items-center justify-center p-4 z-70">
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
