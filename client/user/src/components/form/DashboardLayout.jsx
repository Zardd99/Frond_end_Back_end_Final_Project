import { Link } from "react-router-dom";
import { UserAuth } from "../../../../user/src/context/AuthContext";

const DashboardLayout = () => {
  const { user } = UserAuth();

  return (
    <div className="min-h-screen bg-light text-hero-gray-900 cal-sans-regular flex flex-col items-center pt-20">
      <nav className="bg-light shadow-sm container mt-17 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center ">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <Link to="/" className="px-3 py-2 hover:bg-gray-200 rounded">
                Home
              </Link>
              {user?.role === "Admin" && (
                <Link
                  to="/dashboard/admin"
                  className="px-3 py-2 hover:bg-hero-gray-200 rounded"
                >
                  Admin Panel
                </Link>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-offer-cool-200 text-offer-cool-700 px-2 py-1 rounded-full text-xs">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardLayout;
