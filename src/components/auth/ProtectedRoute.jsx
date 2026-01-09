import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoadingAuth } = useApp();
    const location = useLocation();

    if (isLoadingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
