 import {createContext, useState } from "react";

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);//if we have value in user that means user is logged in 
    const [loading, setLoading] = useState(true);

    return (
        // state layer provides user,setUser,loading,setLoading
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}