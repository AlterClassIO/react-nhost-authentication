import { useAuthenticationStatus } from '@nhost/react';
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
