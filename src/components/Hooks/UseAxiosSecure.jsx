import { AuthContext } from "@/Provider/Provider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000'
    // baseURL: 'https://vend-crunch-server.vercel.app/'
})
const UseAxiosSecure = () => {
    const router = useRouter()
    const { logOut } = useContext(AuthContext)
    axiosSecure.interceptors.request.use(async (config)=> {
        const token = localStorage.getItem('access-token')
        console.log('interceptor hits', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

    // Add a response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async (error) => {
        const status = error.response.status
        console.log('status in the error', status)
        if (status === 401 || status === 403) {
            await logOut()
                .then()
                .catch()
            return router.push('/login')
        }
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default UseAxiosSecure;