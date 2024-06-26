"use client"
import UseAxiosSecure from "@/components/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { useContext } from "react";
import { AuthContext } from "@/Provider/Provider";
const ManageCustomer = () => {
    const {loading}=useContext(AuthContext)
    const axiosSecure = UseAxiosSecure()
    const { data: users, refetch } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            const userData=await res.data
            console.log(userData)
            return userData
        }
    })

    // console.log(users)

    const handleMakeAdmin = (id) => {
        console.log(id)
        const data = {
            role: 'admin'
        }
        Swal.fire({
            title: "Are you sure you want to make him/her admin?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${id}`, data)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Made!",
                                text: "User has been an Admin.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })

            }
        });
    }

    const handleDeleteUser = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure you want to delete the user?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })

            }
        });
    }
    const handlePressAdmin = (name) => {
        console.log(name)
        Swal.fire(`${name} is already Admin`);
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6 hidden md:table">
                    <thead>
                        <tr className="bg-[#412262ff] text-white">
                            <th className="py-4 px-6 text-lg text-left border-b">Image</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Name</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Email</th>
                            <th className="py-4 px-6 text-lg text-left border-b">ID</th>
                            <th className="py-4 px-6 text-lg border-b text-end">Make Admin</th>
                            <th className="py-4 px-6 text-lg border-b text-end">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map(user => (

                                <tr key={user?._id} className="hover:bg-gray-50 border-b transition duration-300">
                                    <td className="py-4 px-4 flex justify-start">
                                        <Image width={64} height={64} src={user?.userImage} alt="user image" />
                                    </td>
                                    <td className="py-4 px-6 border-b text-xl font-medium">{user?.userName}</td>
                                    <td className="py-4 px-6 border-b text-lg font-medium">{user?.userEmail}</td>
                                    <td className="py-4 px-6 border-b text-lg font-medium">{user?.userID}</td>
                                    <td className="py-4 px-6 border-b text-end">
                                        {
                                            user.role === 'student' &&

                                            <button onClick={() => handleMakeAdmin(user?._id)} className="bg-[#412262ff] hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md">
                                                <PersonIcon />
                                            </button>

                                        }
                                        {

                                            user.role === 'admin' &&

                                            <button onClick={() => handlePressAdmin(user?.userName)} className="bg-[#412262ff] hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md">
                                                <AdminPanelSettingsIcon />
                                            </button>

                                        }
                                    </td>
                                    <td className="py-4 px-6 border-b text-end">
                                        <button onClick={() => handleDeleteUser(user?._id)} className="bg-[#412262ff] hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md">
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>


                            ))
                        }


                    </tbody>
                </table>
                <div className="min-w-[90%]  mx-auto  my-6  md:hidden">
                    {
                        users?.map(user => (


                            <div key={user._id} className="w-[300px] mx-auto my-20 p-6 md:p-8 rounded-2xl shadow-lg border border-spacing-2 border-[#412262ff] bg-white">
                                <div className="space-y-6 ">

                                    <div className="flex flex-row  justify-between"><span className="font-bold text-right">Image</span>
                                        <span>
                                            <Image width={64} height={64} src={user?.userImage} alt="user image" />

                                        </span></div>
                                    <div className="flex flex-row justify-between"><span className="font-bold">Name</span><span className="text-right">{user?.userName}</span></div>
                                    <div className="flex flex-row justify-between"><span className="font-bold">Email</span><span>{user?.userEmail}</span></div>
                                    <div className="flex flex-row justify-between "><span className="font-bold ">ID</span><span className="text-right">{user?.userID}</span></div>

                                    <div className="flex flex-row justify-between">

                                        <span className="font-bold">Make Admin</span>
                                        <span>
                                            {
                                                user.role === 'student' &&

                                                <button onClick={() => handleMakeAdmin(user?._id)} className="bg-[#412262ff] hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md">
                                                    <PersonIcon />
                                                </button>

                                            }
                                            {

                                                user.role === 'admin' &&

                                                <button onClick={() => handlePressAdmin(user?.userName)} className="bg-[#412262ff] hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md">
                                                    <AdminPanelSettingsIcon />
                                                </button>

                                            }

                                        </span>

                                    </div>
                                    <div className="flex flex-row justify-between">

                                        <span className="font-bold">Delete</span>
                                        <span>
                                            <button onClick={() => handleDeleteUser(user?._id)} className="bg-[#412262ff] hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md">
                                                <DeleteIcon />
                                            </button>

                                        </span>

                                    </div>





                                </div>
                            </div>

                        ))
                    }
                </div>

            </div>




        </div>
    );
};

export default ManageCustomer;