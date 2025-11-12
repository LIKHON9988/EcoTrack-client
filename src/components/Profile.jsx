import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  Edit3,
  Save,
  LogOut,
  Mail,
  Calendar,
  Clock,
  Shield,
  Award,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, updateUserProfile, logOut } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData.displayName, formData.photoURL);
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      setTimeout(() => navigate("/"), 500); // navigate to home after logout
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed.");
    }
  };

  const userInitial =
    user?.displayName?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "?";

  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center text-gray-300 text-lg bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009]">
        Please log in to view your profile.
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] text-gray-100 overflow-hidden">
      {/* glowing background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-12 -left-12 w-56 h-56 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* profile card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] text-center transition-all hover:shadow-[0_0_45px_-5px_rgba(16,185,129,0.5)]">
          {/* profile image */}
          <div className="relative flex justify-center">
            {formData.photoURL || user?.photoURL ? (
              <img
                src={formData.photoURL || user.photoURL}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500 shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-emerald-600/40 border-4 border-emerald-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {userInitial}
              </div>
            )}
          </div>

          {/* editable area */}
          {isEditing ? (
            <div className="mt-5 space-y-3">
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400/50"
              />
              <input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="Profile image URL"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400/50"
              />
              <button
                onClick={handleSave}
                className="w-full mt-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
              >
                <Save size={18} /> Save Changes
              </button>
            </div>
          ) : (
            <>
              <h2 className="mt-4 text-2xl font-semibold text-gray-100">
                {user.displayName || "Anonymous User"}
              </h2>
              <p className="text-gray-400 text-sm">{user.email}</p>

              <div className="flex justify-center gap-3 mt-5">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-1.5 border border-emerald-500 text-emerald-400 rounded-lg flex items-center gap-2 hover:bg-emerald-500/10 transition"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 border border-red-500 text-red-400 rounded-lg flex items-center gap-2 hover:bg-red-500/10 transition"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </>
          )}

          {/* user info & stats */}
          <div className="mt-6 border-t border-white/10"></div>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex flex-col items-center">
              <Mail size={18} className="text-emerald-400 mb-1" />
              <span>{user.email}</span>
            </div>
            <div className="flex flex-col items-center">
              <Calendar size={18} className="text-emerald-400 mb-1" />
              <span>
                Joined:{" "}
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Clock size={18} className="text-emerald-400 mb-1" />
              <span>
                Last Login:{" "}
                {user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                  : "—"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Shield size={18} className="text-emerald-400 mb-1" />
              <span>User Type: Basic</span>
            </div>
          </div>

          <div className="mt-8 bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award size={18} className="text-emerald-400" />
              <h3 className="text-base font-semibold">Achievements</h3>
            </div>
            <p className="text-sm text-gray-400">
              Earn badges by completing challenges and staying consistent in
              your eco-friendly journey.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Activity size={16} className="text-emerald-400" />
            <span>Challenges Joined: —</span>
          </div>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
};

export default Profile;
