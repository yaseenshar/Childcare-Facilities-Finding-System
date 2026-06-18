import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';

interface AuthGaurdProps {
    children: ReactNode;
}

const AuthGaurd: React.FC<AuthGaurdProps> = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default AuthGaurd;
