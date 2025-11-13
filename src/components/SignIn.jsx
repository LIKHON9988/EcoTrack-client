import React, { useContext, useState, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirectTo = useMemo(() => {
    const statePath = location.state?.from?.pathname;
    const searchParams = new URLSearchParams(location.search);
    const qp = searchParams.get("redirect");
    return statePath || qp || "/";
  }, [location]);

  const handleGoogle = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!");
        setTimeout(() => navigate(redirectTo, { replace: true }), 400);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || "Google login failed.");
      })
      .finally(() => setLoading(false));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoading(true);
    signInUser(email, password)
      .then(() => {
        toast.success("Logged in successfully!");
        setTimeout(() => navigate(redirectTo, { replace: true }), 400);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || "Failed to login. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] flex items-center justify-center overflow-hidden p-4 text-gray-100">
      <div className="absolute inset-0">
        <div className="absolute -top-8 -left-8 w-40 h-40 md:w-64 md:h-64 bg-emerald-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 md:w-80 md:h-80 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-11/12 max-w-md md:max-w-lg">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 md:p-8 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
          <div className="mb-4 md:mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Login to EcoTrack
            </h1>
            <p className="text-white/80 text-sm md:text-base mt-1">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-white/90 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-300/50"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 md:px-4 md:py-3 pr-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-300/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs md:text-sm">
              <Link
                to="/signUp"
                className="text-white/90 hover:text-white underline underline-offset-2"
              >
                Create account
              </Link>
              <Link
                to="/forgot-password"
                className="text-white/90 hover:text-white underline underline-offset-2"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 md:mt-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/20" />
              <span className="relative z-10 bg-transparent text-white/70 px-2 text-xs md:text-sm">
                or
              </span>
            </div>

            <button
              onClick={handleGoogle}
              type="button"
              disabled={loading}
              className={`w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35 11.1h-9.17v2.98h5.27c-.23 1.45-1.6 3.42-4.27 3.42-2.56 0-4.65-2.12-4.65-4.73s2.09-4.73 4.65-4.73c1.46 0 2.44.62 3 1.16l2.04-1.97C17.2 5.86 15.52 5 13.18 5 8.94 5 5.5 8.39 5.5 12.77s3.44 7.77 7.68 7.77c4.44 0 7.37-3.12 7.37-7.51 0-.5-.06-.84-.2-1.93z"
                />
              </svg>
              Google Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </section>
  );
};

export default SignIn;
