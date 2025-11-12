import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";
import { ClipLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] text-gray-200">
        <ClipLoader color="#10B981" size={60} speedMultiplier={1.2} />
        <p className="mt-4 text-emerald-400 text-sm tracking-wide animate-pulse">
          Authenticating, please wait...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/signIn"} state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
