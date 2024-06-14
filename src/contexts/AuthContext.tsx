import React, { createContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderPropsType } from "../@types/auth";
import supabase from "../api/supabase";
import { Session, User } from "@supabase/supabase-js";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: React.FC<AuthProviderPropsType> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState<User | null>(null);
    const [userSession, setUserSession] = useState<Session | null>(null);

    useEffect(() => {
        // onAuthStateChange does not trigger on page load so need to call manually
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUserSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        // Set up subscriber to listen for auth state changes
        const { data } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUserSession(session);
                setUser(session?.user ?? null);
            }
        );
    }, []);

    const signup = async (
        username: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        const { data, error } = await supabase.auth.signUp({
            email: username,
            password: password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });
        if (error) {
            throw error;
        }
        console.log(data);
    };

    const login = async (username: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });
        if (error) {
            throw error;
        }
        console.log(data);
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, signup, login, logout, isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
