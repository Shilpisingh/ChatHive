import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
