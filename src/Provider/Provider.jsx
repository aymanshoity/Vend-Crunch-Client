"use client"
import { createContext, useEffect, useState } from "react";
import auth from "@/Firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import UseAxiosPublic from "@/components/Hooks/UseAxiosPublic";
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const axiosPublic=UseAxiosPublic()
    const [loading, setLoading] = useState(true)
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
            console.log(currentUser)
            setUser(currentUser)
            if(currentUser){
                const userInfo={email:currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                        setLoading(false)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            

        })
        
        return () => unSubscribe()
    },[axiosPublic])

    const userInfo = {user,loading,createUser,userLogin,logOut,setLoading}

    return <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;