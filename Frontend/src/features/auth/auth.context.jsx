 import { Children, createContext, useState } from "react";

export const AuthContext = createContext()


export const AuthProvider = ({Children}) =>{
    const[user,setUser]=useState(null)
    const[loading,setLoading]=useState(false)


    return(
        //state layer ptovides user,setUser,loading,setLoading
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
                {Children}
        </AuthContext.Provider>
    )
}