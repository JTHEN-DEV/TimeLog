export type AuthContextType = {
    currentUser: null | User;
    isLoading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
};

export type AuthProviderPropsType = {
    children: React.ReactNode;
};
