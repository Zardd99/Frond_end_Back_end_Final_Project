import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

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
    <div className="Login_Form flex h-screen items-center justify-center bg-gradient-to-br from-hero-slate-900 via-offer-cool-900 to-hero-slate-900 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-hero-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-hero-red-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-hero-cyan-400 rounded-full blur-3xl"></div>
      </div>
      <form
        onSubmit={handleLogin}
        className="max-w-3xl m-auto pt-24 px-20 py-10 flex items-center flex-col border rounded-2xl bg-gradient-to-r from-offer-fresh-300 via-offer-fresh-400 to-offer-fresh-500 relative"
      >
        <div className="absolute inset-95 w-5 h-5 bg-gradient-to-r from-offer-cool-50 to-offer-cool-300 rounded-full animate-pulse opacity-5"></div>
        <div className="absolute -inset-4 w-20 h-20 bg-gradient-to-r from-offer-cool-50 to-offer-cool-300 rounded-full animate-pulse opacity-5"></div>

        <h2 className="cal-sans-bold text-3xl text-light">Log In</h2>
        <p className="cal-sans-regular text-xl">
          Don't Have An Account?{" "}
          <Link to="/signup" className="text-hero-red-600 pl-4">
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
            id=""
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("login_password").focus();
              }
            }}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 mt-4 rounded-xl bg-light cal-sans-regular"
            type="password"
            id="login_password"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-5 inline-flex items-center justify-center cal-sans-regular text-lg text-foodle-brand-500 hover:text-hero-gray-900 bg-white hover:bg-gradient-to-r group-hover:from-foodle-brand-500 group-hover:to-foodle-accent-500 px-4 py-2 rounded-2xl border-2 border-current hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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

export default Login;
