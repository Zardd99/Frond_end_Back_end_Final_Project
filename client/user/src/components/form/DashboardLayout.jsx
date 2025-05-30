import { Link, Outlet } from "react-router-dom";
import { UserAuth } from "../../../../user/src/context/AuthContext";
import AdminDashboard from "../../../../admin/src/components/form/AdminDashboard";
import { useState } from "react";

const DashboardLayout = () => {
  const { user } = UserAuth();
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const handleAdminDashboard = (e) => {
    e.preventDefault();
    setShowAdminDashboard(!showAdminDashboard);
  };

  return (
    <div className="min-h-screen bg-background text-dark cal-sans-regular flex flex-col items-center justify-center">
      <nav className="bg-light shadow-sm container mt-17">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <Link to="/" className="px-3 py-2 hover:bg-regular-hover rounded">
                Home
              </Link>
              {user?.role === "Admin" && (
                <Link
                  to="/dashboard/admin"
                  className="px-3 py-2 hover:bg-regular-hover rounded"
                >
                  Admin Panel
                </Link>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-light-blue text-blue px-2 py-1 rounded-full text-xs">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex w-full items-center justify-center h-30">
        <button
          className="bg-light-blue p-4 rounded-2xl cursor-pointer max-w-80 shadow-md"
          onClick={handleAdminDashboard}
        >
          <span className="cal-sans-regular text-blue hover:text-blue-hover text-sm">
            Click to Show Admin Dashboard
          </span>
        </button>
      </div>

      {showAdminDashboard && (
        <main
          className={`py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${
            !showAdminDashboard ? "invisible" : "visible"
          }`}
          id="adminDashboard"
        >
          {user?.role === "Admin" && <AdminDashboard />}
          <Outlet />
        </main>
      )}
    </div>
  );
};

export default DashboardLayout;
