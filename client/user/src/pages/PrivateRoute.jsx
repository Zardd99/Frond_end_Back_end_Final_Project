import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = UserAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;
