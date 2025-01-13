"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

interface User {
    id: string;
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
            axios.get('http://localhost:3000/api/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                }).then(response => {
                    setUser({
                        name: response.data.details.name,
                        email: response.data.details.email,
                        id: response.data.details.email,
                    });
                    localStorage.setItem("cId", response.data.lastViewed);
                }).catch(err => {
                    console.error("Error fetching user: " + err);
            })
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}