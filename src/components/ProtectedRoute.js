// ProtectedRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  return user ? <Outlet {...rest} element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
