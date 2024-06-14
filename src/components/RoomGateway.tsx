import React, { useContext, useEffect, useState } from "react";
import supabase from "../api/supabase";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Room from "./Room";

type Props = {};

const RoomGateway = (props: Props) => {
    const { roomId } = useParams();
    const { user } = useContext(AuthContext);

    const [loadingState, setLoadingState] = useState<
        "loading" | "access" | "no-access"
    >("loading");

    const userId = user!.id;

    const hasAccess = async () => {
        setLoadingState("loading");
        const { data, count, error } = await supabase
            .from("users_rooms")
            .select("*", { count: "exact" });
        if (error) {
            console.error(
                "An error occurred while attempting to check access:",
                error
            );
            setLoadingState("no-access");
        } else if (count !== null && count > 0) {
            setLoadingState("access");
        } else {
            setLoadingState("no-access");
        }
    };

    useEffect(() => {
        if (loadingState == "loading") {
            hasAccess();
        }
    }, [loadingState]);

    return loadingState === "access" ? (
        <Room roomId={roomId || ""} />
    ) : loadingState === "no-access" ? (
        <div>
            <h1>You do not have access to this room</h1>
            <div>
                Please get an administrator from this room to give you access
            </div>
        </div>
    ) : (
        <div>
            <h1>Loading...</h1>
        </div>
    );
};

export default RoomGateway;
