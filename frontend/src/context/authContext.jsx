import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const authContext =  createContext()

export const AuthContextProvider = ({children})=>{
    const [CurrentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user") )|| null)

    const login = async (inputs)=>{
        const res=await axios.post("http://localhost:8800/api/auth/login",inputs,{
            withCredentials:true
        });
        setCurrentUser(res.data)
    };

    const logout = async (inputs)=>{
        await axios.post("http://localhost:8800/api/auth/logout",{},{
            withCredentials:true
        });
        setCurrentUser(null)
    };


    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(CurrentUser));
    },[CurrentUser])

    return (
        <authContext.Provider value={{CurrentUser,login,logout}}>
            {children}
        </authContext.Provider>
    );
}
