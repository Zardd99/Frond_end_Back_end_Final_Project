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
    <div className="min-h-screen bg-hero-white text-black cal-sans-regular">
      <div className="p-20"></div>
      <div className="bg-hero-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 container mx-auto">
        <h2 className="text-4xl font-bold mb-6 uppercase tracking-wider">
          Admin Dashboard
        </h2>

        <div className="flex border-b-4 border-black mb-8">
          <button
            className={`py-4 px-6 font-bold uppercase tracking-wide transition-all ${
              activeTab === "users"
                ? "bg-black text-hero-white border-2 border-black -mb-1"
                : "bg-hero-white text-black border-2 border-transparent hover:border-black"
            }`}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>
          <button
            className={`py-4 px-6 font-bold uppercase tracking-wide transition-all ml-2 ${
              activeTab === "menu"
                ? "bg-black text-hero-white border-2 border-black -mb-1"
                : "bg-hero-white text-black border-2 border-transparent hover:border-black"
            }`}
            onClick={() => setActiveTab("menu")}
          >
            Menu Management
          </button>
        </div>

        {error && (
          <div className="text-black bg-hero-white border-4 border-black p-6 mb-4 absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 font-bold">
            {error}
          </div>
        )}

        {showNotification && (
          <div className="text-black bg-hero-white border-4 border-black p-6 mb-4 absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 font-bold">
            {showNotification}
          </div>
        )}

        {activeTab === "users" &&
          (loading.users ? (
            <div className="text-center p-4 font-bold text-xl">
              Loading users...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-4 border-black">
                <thead>
                  <tr className="bg-black text-hero-white">
                    <th className="text-left p-4 font-bold uppercase tracking-wide">
                      Email
                    </th>
                    <th className="text-left p-4 font-bold uppercase tracking-wide">
                      Role
                    </th>
                    <th className="text-left p-4 font-bold uppercase tracking-wide">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userData) => (
                    <tr
                      key={userData.user_id}
                      className="border-b-2 border-black hover:bg-hero-gray-100"
                    >
                      <td className="p-4 font-medium">{userData.email}</td>
                      <td className="p-4">
                        <select
                          value={userData.role}
                          onChange={(e) => {
                            updateRole(userData.user_id, e.target.value);
                          }}
                          className="border-2 border-black bg-hero-white px-3 py-2 font-bold"
                        >
                          <option value="User">user</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-4 py-2 font-bold uppercase tracking-wide ${
                            userData.banned
                              ? "bg-black text-hero-white"
                              : "bg-hero-white text-black border-2 border-black"
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
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowInsertForm(true)}
                className="bg-black text-hero-white px-6 py-3 font-bold uppercase tracking-wide hover:bg-hero-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
              >
                Add Menu Item
              </button>
            </div>

            {loading.menu ? (
              <div className="text-center p-4 font-bold text-xl">
                Loading menu items...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-hero-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
                  >
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="bg-hero-white border-2 border-black p-2 hover:bg-hero-gray-100"
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
                        className="bg-black text-hero-white border-2 border-black p-2 hover:bg-hero-gray-800"
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

                    <div className="h-48 mb-4 bg-hero-gray-100 border-b-2 border-black flex items-center justify-center">
                      <img
                        src={item.image_url || ""}
                        alt={item.title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="font-bold text-2xl mb-2 uppercase tracking-wide">
                        {item.title}
                      </h2>
                      <p className="font-bold text-xl mb-4">{item.price_tag}</p>
                      <p className="text-black mb-4">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showInsertForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-hero-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
            <div className="bg-black text-hero-white p-4">
              <h2 className="text-2xl mb-4 font-bold uppercase tracking-wide">
                Add New Menu Item
              </h2>
            </div>
            <form onSubmit={handleAddItem} className="p-6">
              <input
                type="text"
                placeholder="Item Name"
                className="w-full p-3 mb-3 border-2 border-black font-bold placeholder-hero-gray-500"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Price (e.g., $5.99)"
                className="w-full p-3 mb-3 border-2 border-black font-bold placeholder-hero-gray-500"
                value={newItem.price_tag}
                onChange={(e) =>
                  setNewItem({ ...newItem, price_tag: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 mb-3 border-2 border-black font-bold placeholder-hero-gray-500 resize-none"
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
                className="w-full p-3 mb-4 border-2 border-black font-bold placeholder-hero-gray-500"
                value={newItem.image_url}
                onChange={(e) =>
                  setNewItem({ ...newItem, image_url: e.target.value })
                }
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-black text-hero-white px-6 py-2 font-bold uppercase tracking-wide hover:bg-hero-gray-800"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowInsertForm(false)}
                  className="bg-hero-white text-black border-2 border-black px-6 py-2 font-bold uppercase tracking-wide hover:bg-hero-gray-100"
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-hero-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
            <div className="bg-black text-hero-white p-4">
              <h2 className="text-2xl mb-4 font-bold uppercase tracking-wide">
                Edit Menu Item
              </h2>
            </div>
            <form onSubmit={handleUpdateItem} className="p-6">
              <input
                type="text"
                placeholder="Item Name"
                className="w-full p-3 mb-3 border-2 border-black font-bold placeholder-hero-gray-500"
                value={editItem.title}
                onChange={(e) =>
                  setEditItem({ ...editItem, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Price (e.g., $5.99)"
                className="w-full p-3 mb-3 border-2 border-black font-bold placeholder-hero-gray-500"
                value={editItem.price_tag}
                onChange={(e) =>
                  setEditItem({ ...editItem, price_tag: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 mb-3 border-2 border-black font-bold placeholder-hero-gray-500 resize-none"
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
                className="w-full p-3 mb-4 border-2 border-black font-bold placeholder-hero-gray-500"
                value={editItem.image_url}
                onChange={(e) =>
                  setEditItem({ ...editItem, image_url: e.target.value })
                }
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-black text-hero-white px-6 py-2 font-bold uppercase tracking-wide hover:bg-hero-gray-800"
                >
                  Update Item
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
                  className="bg-hero-white text-black border-2 border-black px-6 py-2 font-bold uppercase tracking-wide hover:bg-hero-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-hero-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
            <div className="bg-black text-hero-white p-4">
              <h2 className="text-2xl mb-4 font-bold uppercase tracking-wide">
                Delete Menu Item?
              </h2>
            </div>
            <div className="p-6">
              <p className="mb-6">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
              <div className="flex gap-4">
                <button
                  className="bg-black text-hero-white px-6 py-2 font-bold uppercase tracking-wide hover:bg-hero-gray-800"
                  onClick={handleDeleteItem}
                >
                  Delete
                </button>
                <button
                  className="bg-hero-white text-black border-2 border-black px-6 py-2 font-bold uppercase tracking-wide hover:bg-hero-gray-100"
                  onClick={() => setItemToDelete(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-4"></div>
    </div>
  );
};

export default AdminDashboard;
