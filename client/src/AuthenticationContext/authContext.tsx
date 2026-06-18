import { getLocalAuthToken, removeLocalAuthToken, removeLocalUserInfo, setLocalAuthToken, setLocalUserInfo } from '@/helpers/localstorage';
import { UserInfo } from '@/models/user';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (userInfo: UserInfo) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(getLocalAuthToken() ? true : false);

    const login = (userInfo: UserInfo) => {     
        userInfo.token && setLocalAuthToken(userInfo.token);
        userInfo['token']
        setLocalUserInfo(userInfo)
        setIsAuthenticated(true);
    }
    const logout = () => {
        setIsAuthenticated(false);
        removeLocalAuthToken();
        removeLocalUserInfo();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    return useContext(AuthContext) as AuthContextType;
};