import React, { createContext, useEffect, useState } from "react";
import { auth, signInWithGoogle } from "../api/firebase";
import { User } from "firebase/auth";
import { AuthContextType, AuthProviderPropsType } from "../@types/auth";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: React.FC<AuthProviderPropsType> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<null | User>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
