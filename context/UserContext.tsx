"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(() => 
        typeof window !== "undefined" ? localStorage.getItem("token") : null
    );
    const [user, setUser] = useState<User | null>(null);

    // Set token in state and localStorage
    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
        } else {
            localStorage.removeItem("token");
        }
    };

    // Logout function
    const logout = () => {
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        if (!token) {
            setUser(null);
            return;
        }

        axios.get("http://localhost:3000/api/user/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            const { name, email, _id } = response.data.details;
            setUser({ name, email, _id });
            localStorage.setItem("cId", response.data.lastViewed);
        })
        .catch(err => {
            console.error("Error fetching user: " + err);
            setUser(null);
        });

    }, [token]);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
