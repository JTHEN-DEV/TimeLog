import { User } from "@supabase/supabase-js";

export type AuthContextType = {
    user: null | User;
    isLoading: boolean;
    signup: (
        username: string,
        password: string,
        firstName: string,
        lastName: string
    ) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

export type AuthProviderPropsType = {
    children: React.ReactNode;
};
