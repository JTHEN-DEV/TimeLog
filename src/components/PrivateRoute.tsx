import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextType } from "../@types/auth";

type Props = {
    component: React.FC;
    from: string;
};

const PrivateRoute = (props: Props) => {
    const { currentUser, isLoading } = useContext<AuthContextType>(AuthContext);
    return currentUser ? (
        <props.component />
    ) : (
        <Navigate to="/login" replace state={{ from: props.from }} />
    );
};

export default PrivateRoute;
