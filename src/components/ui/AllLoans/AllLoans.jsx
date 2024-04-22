'use client'

import { AuthContext } from "@/Provider/Provider";
import UseAxiosSecure from "@/components/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useContext, useState } from "react";
import TelegramIcon from '@mui/icons-material/Telegram';
import { useForm } from "react-hook-form"
const AllLoans = () => {
    const { user,loading } = useContext(AuthContext)
    const axiosSecure = UseAxiosSecure()
    const { data: loans } = useQuery({
        queryKey: ['loans'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/loans`)
            console.log(res.data)
            return res.data
        }
    })
    const [openModal, setOpenModal] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        axiosSecure.post('/send-email', data)
            .then(res => {
                console.log(res.data)
            })
    }



    return (
        <div>

            <div className="overflow-x-auto">
                <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6 hidden lg:table">
                    <thead>
                        <tr className="bg-[#412262ff] text-white">
                            <th className="py-4 px-6 text-lg text-left border-b">Product Image</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Product Name</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Price</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Date</th>
                            <th className="py-4 px-6 text-lg text-left border-b">User Name</th>
                            <th className="py-4 px-6 text-lg border-b text-end">User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loans?.map(loan => (
                                <tr key={loan?._id} className="hover:bg-gray-50 border-b transition duration-300">
                                    <td className="py-4 px-4 flex justify-start">
                                        <Image alt="ii" width={64} height={64} src={loan?.imageURL} />
                                    </td>
                                    <td className="py-4 px-6 border-b text-md font-medium">{loan?.productName}</td>
                                    <td className="py-4 px-6 border-b text-md font-medium">{loan?.purchasedPrice} Tk.</td>
                                    <td className="py-4 px-6 border-b text-md font-medium">{loan?.date}</td>
                                    <td className="py-4 px-6 border-b text-md font-medium">{loan?.userName} </td>
                                    <td className="py-4 px-6 border-b text-md font-medium">{loan?.userID} </td>
                                    {/* <td className="py-4 px-6 border-b text-end">
                                        <button onClick={() => setOpenModal(true)} className="bg-[#412262ff] btn text-white  text-md ">Send Email</button>
                                    </td> */}
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div className="min-w-[90%]  mx-auto  my-6  lg:hidden">
                    {
                        loans?.map(loan => (


                            <div key={loan._id} className="w-[300px] mx-auto my-20 p-6 md:p-8 rounded-2xl shadow-md border border-spacing-2 border-[#412262ff] bg-white">
                                <div className="space-y-6 text-md ">

                                    <div className="flex flex-row  justify-between"><span className="font-bold text-right">Product Image</span>
                                        <span>
                                            <Image width={64} height={64} src={loan?.imageURL} alt="user image" />

                                        </span></div>
                                    <div className="flex flex-row justify-between"><span className="font-bold">Product Name</span><span className="text-right">{loan?.productName}</span></div>
                                    <div className="flex flex-row justify-between"><span className="font-bold">Price</span><span>{loan?.purchasedPrice}</span></div>
                                    <div className="flex flex-row justify-between "><span className="font-bold ">Date</span><span className="text-right">{loan?.date}</span></div>

                                    <div className="flex flex-row justify-between">

                                        <span className="font-bold">User Name</span>
                                        <span className="text-right">{loan?.userName}</span>

                                    </div>
                                    <div className="flex flex-row justify-between">

                                        <span className="font-bold">User ID</span>
                                        <span className="text-right">{loan?.userID}</span>

                                    </div>
                                    {/* <div className="flex flex-row justify-between">

                                        <span className="font-bold">Delete</span>
                                        <span>
                                            <button onClick={() => setOpenModal(true)} className="bg-[#412262ff] btn text-white text-md  ">Send Email</button>

                                        </span>

                                    </div> */}





                                </div>
                            </div>

                        ))
                    }
                </div>
                {/* <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}>
                    <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-full rounded-lg bg-white dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${openModal ? 'opacity-1 translate-y-0 duration-300' : '-translate-y-20 opacity-0 duration-150'}`}>
                        <form onSubmit={handleSubmit(onSubmit)} className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10">
                            <svg onClick={() => setOpenModal(false)} className="mx-auto mr-0 w-10 cursor-pointer fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                            <h1 className="pb-8 text-4xl backdrop-blur-sm">Send Email</h1>
                            <div className="space-y-5">
                                <div className=" w-max">
                                    <label >
                                        Email:
                                    </label>
                                    <input {...register("recipientEmail")} type="email" className="border-none focus:outline-none" />
                                    {errors.recipientEmail && <span className="text-red-600">This field is required</span>}

                                </div>
                                <div className="divider"></div>
                                <div className=" w-max">
                                    <label >
                                        Subject:
                                    </label>
                                    <input defaultValue=" Please Complete Your Loan Payment" {...register("subject")} type="text" className="border-none focus:outline-none" />
                                    {errors.subject && <span className="text-red-600">This field is required</span>}

                                </div>
                                <div className="divider"></div>
                                <div className="w-max flex flex-row items-start">
                                    <label >
                                        Message:
                                    </label>
                                    <textarea {...register("message")} type="text" className="border-none focus:outline-none" />
                                    {errors.message && <span className="text-red-600">This field is required</span>}

                                </div>
                                <div className="divider"></div>

                            </div>
                           
                             <button type="submit" className="relative py-2.5 px-5 rounded-lg mt-6 bg-white drop-shadow-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800">
                                Send <TelegramIcon />
                            </button>
                        </form>
                    </div>
                </div> */}
            </div>



        </div>
    );
};

export default AllLoans;