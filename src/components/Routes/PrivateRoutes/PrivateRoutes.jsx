"use client"



import { AuthContext } from "@/Provider/Provider";
// import AuthProvider, { AuthContext } from "@/Provider/Provider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";



const PrivateRoutes = ({ children }) => {
    const { loading, user ,setLoading} = useContext(AuthContext)
    const router = useRouter()

    // Redirect to login page if user is not authenticated
    if (loading) {
         <div className="flex flex-col items-center w-20 h-20 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#412262ff]"></div>
    }

    if (!user) {
        router.push('/login'); // Redirect to login page
    }
    
    
    // Render children if user is authenticated
    return children;

    

    // If user is authenticated, render the children
     
};

export default PrivateRoutes;