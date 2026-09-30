import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('cq_token');
  const storedUser = localStorage.getItem('cq_user');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  try {
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user || user.role !== 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
  } catch (e) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
