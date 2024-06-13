export type User = {
    name: string;
    status: "online" | "offline" | "busy";
    sessions: string[]; // String of session ids
    friends: string[]; // String of friend ids
};

export type Session = {
    startTime: number; // Number of date stamp
    endTime: number | null; // Null if still going
    users: string[]; // String of user ids
};

export type Notification = {
    startTime;
};

export type userDataStore = {
    user: User;
    sessions: Session[];
};

export type DataContextType = {
    userData: User;
    sessionData: Session[];
    newSession: () => Promise<void>;
    newFriendship: (userId1: string, userId2: string) => Promise<void>;
    // TODO: Add and Delete Users?
};

export type DataProviderPropsType = {
    children: React.ReactNode;
};
