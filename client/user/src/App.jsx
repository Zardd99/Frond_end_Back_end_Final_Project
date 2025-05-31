import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import ErrorBoundary from "./ErrorBoundary";
import PrivateRoute from "./pages/PrivateRoute";

const Login = lazy(() => import("./pages/Login"));
const Sign_Up = lazy(() => import("./pages/Sign_Up"));
const AllMenu = lazy(() => import("./pages/AllMenu"));
const MenuItemDetail = lazy(() =>
  import("./components/form/MenuItemDetail/MenuItemDetail")
);
const DashboardLayout = lazy(() => import("./components/form/DashboardLayout"));
const AdminDashboard = lazy(() =>
  import("../../admin/src/components/form/AdminDashboard")
);
function App() {
  return (
    <>
      <div className="bg-background">
        <div className="flex flex-col container mx-auto">
          <Navbar />
        </div>
      </div>

      <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/allmenu" element={<AllMenu />} />
            <Route path="/menu/:itemId" element={<MenuItemDetail />} />

            <Route element={<PrivateRoute allowedRoles={["user", "Admin"]} />}>
              <Route path="/dashboard" element={<DashboardLayout />} />
              <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
              </Route>
            </Route>

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default App;
