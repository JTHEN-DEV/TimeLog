import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../api/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { DataContext } from "../contexts/DataContext";
import { AuthContext } from "../contexts/AuthContext";

type Props = {
    roomId: string;
};

interface PresenceState {
    user: string;
    online_at: string;
}

const Room = (props: Props) => {
    const { user } = useContext(AuthContext);

    const [members, setMembers] = useState<string[]>([]);

    const [loadingState, setLoadingState] = useState<
        "loading" | "access" | "no-access"
    >("loading");

    const userId = user!.id;

    useEffect(() => {
        // Connect to room
        const newRoom = supabase.channel(props.roomId || "global");
        newRoom
            .on("presence", { event: "sync" }, () => {
                const newState = newRoom.presenceState<PresenceState>();
                console.log("sync", newState);
                setMembers(
                    Object.keys(newState).map((id) => newState[id][0].user)
                );
            })
            .on("presence", { event: "join" }, ({ key, newPresences }) => {
                console.log("join", key, newPresences);
            })
            .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
                console.log("leave", key, leftPresences);
            })
            .subscribe(async (status) => {
                if (status !== "SUBSCRIBED") {
                    return;
                }
                const userStatus = {
                    user: userId,
                    online_at: new Date().toISOString(),
                };

                const presenceTrackStatus = await newRoom.track(userStatus);
                console.log(presenceTrackStatus);
            });
        return () => {
            newRoom.unsubscribe();
            supabase.removeChannel(newRoom);
        };
    }, []);

    return (
        <div>
            <h1>Room {props.roomId}</h1>
            <div>
                This is a room in which multiple people can log time together
            </div>
            <h2>Members</h2>
            <div>
                {members.map((member) => (
                    <div>{member}</div>
                ))}
            </div>
        </div>
    );
};

export default Room;
