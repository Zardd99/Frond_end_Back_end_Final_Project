import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth, loginUser } from "../AuthContext";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const { session, loginUser } = UserAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await loginUser(email, password);

      if (result?.error) {
        if (result.error.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else if (result.error.message.includes("Email not confirmed")) {
          setError("Please verify your email before logging in.");
        } else {
          setError(result.error.message);
        }
        return;
      }

      if (result.success) {
        navigate("/");
      }
    } catch (err) {
      setError("an error occurred", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login_Form flex h-screen items-center justify-center bg-background ">
      <form
        onSubmit={handleLogin}
        className="max-w-md m-auto pt-24 flex items-center flex-col"
      >
        <h2 className="cal-sans-bold text-3xl">Log In</h2>
        <p className="cal-sans-regular text-xl">
          Don't Have An Account?{" "}
          <Link to="/signup" className="text-bold-red">
            Sign Up
          </Link>
        </p>
        <div className="p-3"></div>

        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 mt-2 rounded-xl bg-light cal-sans-regular"
            type="email"
            name=""
            id=""
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 mt-4 rounded-xl bg-light cal-sans-regular"
            type="password"
            name=""
            id=""
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-red-600 p-3 rounded-xl text-light cal-sans-bold"
          >
            Log In
          </button>
          {error && (
            <p className="p-3 mt-4 rounded-xl bg-background cal-sans-regular text-bold-red text-center">
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default login;
