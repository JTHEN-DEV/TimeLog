import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClick = async () => {
        try {
            await login();
        } catch (error) {
            console.error(
                "An error occurred while attempting to login:",
                error
            );
        }
        navigate(location.state.from || "/dashboard");
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLoginClick}>Sign In With Google</button>
        </div>
    );
};

export default Login;
