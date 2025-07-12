import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PublicRoute = () => {
  const { user, loading } = useAuth();
  //if (loading) return <p>Loading...</p>;

  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
