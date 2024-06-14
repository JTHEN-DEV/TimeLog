import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {};

const Dashboard = (props: Props) => {
    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div>You have been productive for 17 hours!</div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
