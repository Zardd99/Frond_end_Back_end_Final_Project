import { useEffect, useState } from "react";
import { supabase } from "../../../../../server/middleware/supabaseClient";
import { UserAuth } from "../../../../user/src/context/AuthContext";

const AdminDashboard = () => {
  const { user } = UserAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //
  // Fetch user from table profiles in supabase
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

        console.log("Data:", data);
        console.error("Supabase error:", error);

        if (error) throw error;
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  //
  // Update Role
  //
  //
  const updateRole = async (userId, newRole) => {
    if (userId === user?.id) {
      alert("You cannot modify your own role");
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

  if (user?.role !== "Admin") return null;

  return (
    <div className="flex flex-col w-full h-full items-center cal-sans-regular">
      <div className="p-5"></div>
      <div className="bg-light rounded-lg shadow p-6 container">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        {error && <div className="text-bold-red mb-4">{error}</div>}

        {loading ? (
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
                    className="border-b hover:bg-regular-hover"
                  >
                    <td className="p-3">{userData.email}</td>
                    <td className="p-3">
                      <select
                        value={userData.role}
                        onChange={(e) =>
                          updateRole(userData.user_id, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                        disabled={userData.user_id === user.id}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          userData.banned
                            ? "bg-light-red text-red"
                            : "bg-light-green text-green"
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
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
