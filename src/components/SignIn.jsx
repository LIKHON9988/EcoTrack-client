import React from "react";
import { Link } from "react-router";

const SignIn = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-emerald-600 flex items-center justify-center overflow-hidden p-4">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute -top-8 -left-8 w-40 h-40 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 md:w-80 md:h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-11/12 max-w-md md:max-w-lg">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 md:p-8 shadow-2xl">
          <div className="mb-4 md:mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Login to EcoTrack
            </h1>
            <p className="text-white/80 text-sm md:text-base mt-1">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <form className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-white/90 text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:border-green-300/50"
              />
            </div>
            <div>
              <label className="block text-white/90 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-300/50"
              />
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
              className="w-full mt-2 md:mt-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 "
            >
              Log In
            </button>

            <div className="relative py-2">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/20" />
              <span className="relative z-10 bg-transparent text-white/70 px-2 text-xs md:text-sm">
                or
              </span>
            </div>

            <button
              type="button"
              className={`w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 `}
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
    </section>
  );
};

export default SignIn;
