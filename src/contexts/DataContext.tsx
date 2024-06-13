import React, { createContext, useEffect, useState } from "react";
import {
    DataContextType,
    DataProviderPropsType,
    Session,
    User,
} from "../@types/data";
import { database } from "../api/firebase";
import { onValue, ref } from "firebase/database";

const DataContext = createContext<DataContextType>({} as DataContextType);

const DataProvider: React.FC<DataProviderPropsType> = ({ children }) => {
    const [userData, setUserData] = useState({} as User);
    const [sessionData, setSessionData] = useState([]);

    useEffect(() => {
        const userRef = ref(database, "users");
        onValue(userRef, (snapshot) => {
            const userSnapshot = snapshot.val();
            setUserData((_) => ({
                name: userSnapshot["name"],
                status: "online",
                friends: ["asdf"],
                sessions: ["123", "123"],
            }));
        });
    }, []);

    const newSession = async () => {};

    const newFriendship = async (userId1: string, userId2: string) => {};

    return (
        <DataContext.Provider
            value={{ userData, sessionData, newSession, newFriendship }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
