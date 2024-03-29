"use client"
import { createContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react"
import auth from "@/Firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([])
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const userLogin=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            setLoading(false)
            console.log(currentUser)
            setUser(currentUser)

        })
        return () => unSubscribe()
    },[])

    const userInfo = {user,loading,createUser,userLogin,logOut}

    return <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;