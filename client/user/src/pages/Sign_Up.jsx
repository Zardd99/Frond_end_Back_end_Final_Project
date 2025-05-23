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
        navigate("/dashboard");
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
        onSubmit={handleSignUp}
        className="max-w-md m-auto pt-24 flex items-center flex-col"
      >
        <h2 className="cal-sans-bold text-3xl">SignUp</h2>
        <div className="p-3"></div>
        <p className="cal-sans-regular text-xl">
          Already Have An Account?{" "}
          <Link to="/login" className="text-bold-red">
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
            className="mt-6 w-full bg-red-600 p-3 rounded-xl text-light cal-sans-bold"
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
