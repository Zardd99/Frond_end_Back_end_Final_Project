import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";

import ErrorBoundary from "./ErrorBoundary";

import Home from "./pages/Home";

const Login = lazy(() => import("./pages/Login"));
const Sign_Up = lazy(() => import("./pages/Sign_Up"));

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
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
