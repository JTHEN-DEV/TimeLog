import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { prodErrorMap } from "@firebase/auth";
import { AuthError } from "@supabase/supabase-js";

type Props = {};

const Login = (props: Props) => {
    const { signup, login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, []);

    const handleLoginClick = async () => {
        try {
            await login(username, password);
            navigate(location.state.from || "/dashboard");
        } catch (error) {
            if (error instanceof AuthError) {
                setErrorMessage(error.message);
            }
            console.error(
                "An error occurred while attempting to login:",
                error
            );
        }
    };

    const handleSignupClick = async () => {
        try {
            await signup(username, password, firstName, lastName);
            navigate("/verification");
        } catch (error) {
            if (error instanceof AuthError) {
                setErrorMessage(error.message);
            }
            console.error(
                "An error occurred while attempting to signup:",
                error
            );
        }
    };

    const toggleIsLogin = () => {
        setIsLogin((isLogin) => !isLogin);
        setErrorMessage("");
    };

    return (
        <div>
            <h1>{isLogin ? "Login" : "Signup"}</h1>

            <div>Email:</div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <div>Password:</div>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {!isLogin && (
                <div>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
            )}

            <button onClick={isLogin ? handleLoginClick : handleSignupClick}>
                {isLogin ? "Login" : "Signup"}
            </button>

            {errorMessage && <div>Error: {errorMessage}</div>}

            {isLogin ? (
                <div>
                    Don't have an account? <a onClick={toggleIsLogin}>Signup</a>
                </div>
            ) : (
                <div>
                    Have an account? <a onClick={toggleIsLogin}>Login</a>
                </div>
            )}
        </div>
    );
};

export default Login;
