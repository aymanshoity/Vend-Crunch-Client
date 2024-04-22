import axios from "axios";

const axiosPublic=axios.create({
    // baseURL:'http://localhost:5000'
    baseURL:'https://vend-crunch-server.vercel.app'
})
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;