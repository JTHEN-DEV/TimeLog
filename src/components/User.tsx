import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const User = (props: Props) => {
    const { userId } = useParams();

    return (
        <div>
            <h1>User: {userId ? userId : "Undefined..."}</h1>
            <div>This is the user stats page</div>
        </div>
    );
};

export default User;
