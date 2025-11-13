import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirectTo = useMemo(() => {
    const statePath = location.state?.from?.pathname;
    const searchParams = new URLSearchParams(location.search);
    const qp = searchParams.get("redirect");
    return statePath || qp || "/";
  }, [location]);

  const passwordValidators = [
    { label: "At least 1 uppercase letter", test: (v) => /[A-Z]/.test(v) },
    { label: "At least 1 lowercase letter", test: (v) => /[a-z]/.test(v) },
    {
      label: "At least 1 special character",
      test: (v) => /[^A-Za-z0-9]/.test(v),
    },
    { label: "Minimum length 6 characters", test: (v) => v.length >= 6 },
  ];

  const validations = passwordValidators.map((v) => ({
    label: v.label,
    ok: v.test(password),
  }));
  const isPasswordValid = validations.every((v) => v.ok);

  const handleCreatUser = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const photoUrl = formData.get("photoUrl")?.toString().trim();
    const pwd = password;

    if (!name || !email || !pwd) {
      toast.error("Please fill out all required fields.");
      return;
    }
    if (!isPasswordValid) {
      toast.error("Password does not meet requirements.");
      return;
    }

    try {
      setLoading(true);
      const result = await createUser(email, pwd);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoUrl || undefined,
      });
      toast.success("Registered successfully!");
      setTimeout(() => navigate(redirectTo, { replace: true }), 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      toast.success("Registered with Google!");
      setTimeout(() => navigate(redirectTo, { replace: true }), 400);
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Google register failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] flex items-center justify-center overflow-hidden text-gray-100">
      <div className="absolute inset-0">
        <div className="absolute -top-8 -left-8 w-40 h-40 md:w-64 md:h-64 bg-emerald-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 md:w-80 md:h-80 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-11/12 max-w-md md:max-w-lg">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 md:p-8 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
          <div className="mb-4 md:mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Join EcoTrack
            </h1>
            <p className="text-white/80 text-sm md:text-base mt-1">
              Create your account to start tracking impact.
            </p>
          </div>

          <form onSubmit={handleCreatUser} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-white/90 text-sm mb-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-300/50"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-300/50"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm mb-1">
                Photo URL
              </label>
              <input
                name="photoUrl"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-300/50"
              />
            </div>

            <div className="relative">
              <label className="block text-white/90 text-sm mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/10 border text-white placeholder-white/60 focus:outline-none focus:ring-2 pr-10 ${
                    isPasswordValid ? "border-white/20" : "border-red-400/60"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-6 flex items-center text-white/70 hover:text-white transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1">
                {validations.map((v) => (
                  <li
                    key={v.label}
                    className={`text-xs md:text-sm flex items-center gap-2 ${
                      v.ok ? "text-green-200" : "text-red-200"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        v.ok ? "bg-green-400" : "bg-red-400"
                      }`}
                    />
                    {v.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between text-xs md:text-sm">
              <Link
                to="/signIn"
                className="text-white/90 hover:text-white underline underline-offset-2"
              >
                Already have an account?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || !isPasswordValid}
              className={`w-full mt-2 md:mt-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
                loading || !isPasswordValid
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/20" />
              <span className="relative z-10 bg-transparent text-white/70 px-2 text-xs md:text-sm">
                or
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleRegister}
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
              Google Register
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

export default SignUp;
