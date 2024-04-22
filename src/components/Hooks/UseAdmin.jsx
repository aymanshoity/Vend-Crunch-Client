"use client"

import { AuthContext } from "@/Provider/Provider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
 import UseAxiosSecure from "./UseAxiosSecure";
import UseAxiosPublic from "./UseAxiosPublic";

const UseAdmin = () => {
    const {user,loading}=useContext(AuthContext)
     const axiosSecure=UseAxiosSecure()
    // const axiosPublic=UseAxiosPublic()
    const {data: isAdmin}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        enabled: !loading,
        queryFn:async()=>{
            const userEmail=await user?.email
            const res=await axiosSecure.get(`/users/admin/${userEmail}`)
            console.log(res.data)
            return res.data?.admin
        }
    })
    return [isAdmin]
};

export default UseAdmin;