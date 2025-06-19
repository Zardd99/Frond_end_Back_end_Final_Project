import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
      setError("An error occurred. Please try again.");
      // debugging
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-hero-slate-900 via-hero-slate-800 to-hero-slate-900 px-4 py-8 relative overflow-hidden cal-sans-regular">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-offer-purple-500 to-hero-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-r from-offer-cool-500 to-hero-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-r from-hero-orange-500 to-hero-red-500 rounded-full blur-3xl opacity-15 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-hero-white/10 backdrop-blur-lg border border-hero-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-hero-white/5 to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-hero-white/10 to-transparent rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-offer-cool-500 to-offer-purple-600 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-hero-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-hero-white mb-2">
                Welcome Back
              </h1>
              <p className="text-hero-gray-300 text-sm sm:text-base">
                Sign in to your account to continue
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-hero-red-500/20 border border-hero-red-500/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-hero-red-400 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-hero-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-hero-gray-300"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-hero-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-hero-white/10 border border-hero-white/20 rounded-xl text-hero-white placeholder-hero-gray-400 focus:outline-none focus:ring-2 focus:ring-offer-cool-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your email"
                    required
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document.getElementById("login_password").focus();
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="login_password"
                  className="block text-sm font-medium text-hero-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-hero-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="login_password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-hero-white/10 border border-hero-white/20 rounded-xl text-hero-white placeholder-hero-gray-400 focus:outline-none focus:ring-2 focus:ring-offer-cool-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-hero-gray-400 hover:text-hero-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-3 px-4 bg-gradient-to-r from-offer-cool-600 to-purple-600 hover:from-offer-cool-700 hover:to-purple-700 disabled:from-hero-gray-600 disabled:to-hero-gray-700 text-hero-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-hero-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-hero-gray-300 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-offer-cool-400 hover:text-offer-cool-300 font-semibold transition-colors duration-200 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-hero-white/10">
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-hero-gray-400 hover:text-hero-gray-300 text-sm transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
