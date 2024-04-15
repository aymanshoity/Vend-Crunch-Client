'use client'

import { AuthContext } from "@/Provider/Provider";
import UseAxiosSecure from "@/components/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useContext } from "react";
const AllLoans = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxiosSecure()
    const { data: loans } = useQuery({
        queryKey: ['loans'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/loans`)
            console.log(res.data)
            return res.data
        }
    })



    return (
        <div>

            <div className="overflow-x-auto">
                <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6">
                    <thead>
                        <tr className="bg-[#412262ff] text-white">
                            <th className="py-4 px-6 text-lg text-left border-b">Product Image</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Product Name</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Price</th>
                            <th className="py-4 px-6 text-lg text-left border-b">User Name</th>
                            <th className="py-4 px-6 text-lg border-b text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loans?.map(loan => (
                                <tr key={loan?._id} className="hover:bg-gray-50 border-b transition duration-300">
                                    <td className="py-4 px-4 flex justify-start">
                                        <Image alt="ii" width={64} height={64} src={loan?.imageURL} />
                                    </td>
                                    <td className="py-4 px-6 border-b text-xl font-medium">{loan?.productName}</td>
                                    <td className="py-4 px-6 border-b text-lg font-medium">{loan?.purchasedPrice} Tk.</td>
                                    <td className="py-4 px-6 border-b text-lg font-medium">{loan?.userName} </td>
                                    <td className="py-4 px-6 border-b text-end">
                                        <button className="bg-[#412262ff] btn text-white  ">Send Email</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default AllLoans;