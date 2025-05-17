import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import ErrorBoundary from "./ErrorBoundary";

const Login = lazy(() => import("./pages/Login"));
const Sign_Up = lazy(() => import("./pages/Sign_Up"));
const MenuItemDetail = lazy(() => import("./components/MenuItemDetail"));
const AllMenu = lazy(() => import("./pages/AllMenu"));

function App() {
  return (
    <>
      <div className="bg-background">
        <div className="flex flex-col container mx-auto ">
          <div className="my-4"></div>
          <Navbar />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            }
          />
          <Route
            path="/login"
            element={
              <ErrorBoundary>
                <Login />
              </ErrorBoundary>
            }
          />
          <Route
            path="/signup"
            element={
              <ErrorBoundary>
                <Sign_Up />
              </ErrorBoundary>
            }
          />
          <Route
            path="/menu/:itemId"
            element={
              <ErrorBoundary>
                <MenuItemDetail />
              </ErrorBoundary>
            }
          />
          <Route
            path="/allmenu"
            element={
              <ErrorBoundary>
                <AllMenu />
              </ErrorBoundary>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
