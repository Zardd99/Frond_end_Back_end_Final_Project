import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Sign_Up = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signUpNewUser(email, password);

      if (!result?.error) return;

      const defaultMessage = "Something went wrong";
      const message = result.error.message?.includes("already exists")
        ? "An account with this email already exists. Please login instead."
        : result.error.message || defaultMessage;

      console.log(result.error.message);
      setError(message);

      //
      // Redirect to Home Page when Login Success
      //
      //
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
    <div className="Login_Form flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-hero-slate-900 via-offer-purple-900 to-hero-slate-900 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-hero-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-hero-red-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-hero-cyan-400 rounded-full blur-3xl"></div>
      </div>
      <form
        onSubmit={handleSignUp}
        className="max-w-3xl m-auto pt-24 px-20 py-10 flex items-center flex-col border rounded-2xl bg-gradient-to-r from-offer-cool-400 via-offer-cool-500 to-offer-cool-600 relative"
      >
        <div className="absolute inset-95 w-5 h-5 bg-gradient-to-r from-hero-orange-50 to-hero-orange-300 rounded-full animate-pulse opacity-5"></div>
        <div className="absolute -inset-4 w-20 h-20 bg-gradient-to-r from-hero-orange-50 to-hero-orange-300 rounded-full animate-pulse opacity-5"></div>

        <h2 className="cal-sans-bold text-3xl text-hero-gray-900">SignUp</h2>
        <div className="p-3"></div>
        <p className="cal-sans-regular text-xl text-hero-gray-800">
          Already Have An Account?{" "}
          <Link to="/login" className="text-hero-red-600 font-bold pl-4">
            Login
          </Link>
        </p>
        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 mt-2 rounded-xl bg-light cal-sans-regular"
            type="email"
            id=""
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("sign_up_password").focus();
              }
            }}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 mt-4 rounded-xl bg-light cal-sans-regular"
            type="password"
            id="sign_up_password"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-5 inline-flex items-center justify-center cal-sans-regular text-lg text-foodle-brand-500 hover:text-hero-gray-900 bg-white hover:bg-gradient-to-r group-hover:from-foodle-brand-500 group-hover:to-foodle-accent-500 px-4 py-2 rounded-2xl border-2 border-current hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Sign Up
          </button>
          {error && (
            <p className="p-3 mt-4 rounded-xl bg-background cal-sans-regular text-bold-red">
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Sign_Up;
