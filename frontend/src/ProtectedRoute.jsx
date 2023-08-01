import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("token") !=null;
console.log("isAuthenticated",isAuthenticated)
  return (
    isAuthenticated ? <Outlet/> :<Navigate to="/"/>
  )

}

export default ProtectedRoute;
