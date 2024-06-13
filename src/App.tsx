import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import TimeTracker from "./components/TimeTracker";
import User from "./components/User";
import { DataProvider } from "./contexts/DataContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Home Page TBC</div>,
    },
    {
        path: "/user/:userId",
        element: <PrivateRoute component={User} from="/user" />,
    },
    {
        path: "/app",
        element: <PrivateRoute component={TimeTracker} from="/app" />,
    },
    {
        path: "/dashboard",
        element: <PrivateRoute component={Dashboard} from="/dashboard" />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

function App() {
    return (
        <AuthProvider>
            <DataProvider>
                <RouterProvider router={router} />
            </DataProvider>
        </AuthProvider>
    );
}

export default App;
