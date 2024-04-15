'use client'

import { AuthContext } from "@/Provider/Provider";
import UseAxiosSecure from "@/components/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useContext } from "react";
import Swal from 'sweetalert2'
const UserLoan = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxiosSecure()
    const { data: loans } = useQuery({
        queryKey: ['loans'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/loans/${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })

    const date = new Date().toDateString()
    const today = date.split(' ');
    const todaysDate = `${today[1]}. ${today[2]},${today[3]}`;

    const handlePayLoan = (id) => {
        console.log(id)
        const purchasedProduct = {
            ...loans[0], loanPaid: todaysDate
        }
        Swal.fire({
            title: "Do you want to pay the loan?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Pay",
            denyButtonText: `Don't pay`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.post('/purchase', purchasedProduct)
                    .then(res => {
                        console.log(res.data)
                        const paymentResponse = res.data

                        axiosSecure.delete(`/loans/${user?.email}`)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.deletedCount > 0) {
                                    window.location.replace(paymentResponse.url)

                                }
                                refetch()
                            })


                    })
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
    return (
        <div>

            <div className="overflow-x-auto">
                <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6 hidden md:table">
                    <thead>
                        <tr className="bg-[#412262ff] text-white">
                            <th className="py-4 px-6 text-lg text-left border-b">Product Image</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Product Name</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Price</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Date</th>
                            <th className="py-4 px-6 text-lg border-b text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loans?.map(loan => (
                                <tr key={loan._id} className="hover:bg-gray-50 border-b transition duration-300">
                                    <td className="py-4 px-4 flex justify-start">
                                        <Image alt="ii" width={64} height={64} src={loan?.imageURL} />
                                    </td>
                                    <td className="py-4 px-6 border-b text-xl font-medium">{loan?.productName}</td>
                                    <td className="py-4 px-6 border-b text-lg font-medium">{loan?.purchasedPrice} Tk.</td>
                                    <td className="py-4 px-6 border-b text-lg font-medium">{loan?.date} </td>
                                    <td className="py-4 px-6 border-b text-end">
                                        <button onClick={() => handlePayLoan(loan._id)} className="bg-[#412262ff] btn text-white  ">Pay Loan</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div className="min-w-[90%]  mx-auto  my-6  md:hidden">
                    {
                        loans?.map(loan => (


                            <div key={loan._id} className="w-[300px] mx-auto my-20 p-6 md:p-8 rounded-2xl shadow-lg border border-spacing-2 border-[#412262ff] bg-white">
                                <div className="space-y-6 ">

                                    <div className="flex flex-row  justify-between"><span className="font-bold text-right">Product Image</span>
                                        <span>
                                            <Image alt="ii" width={64} height={64} src={loan?.imageURL} />

                                        </span></div>
                                    <div className="flex flex-row justify-between"><span className="font-bold">Product Name</span><span className="text-right">{loan?.productName}</span></div>
                                    <div className="flex flex-row justify-between"><span className="font-bold">Price</span><span>{loan?.purchasedPrice}</span></div>
                                    <div className="flex flex-row justify-between "><span className="font-bold ">Date</span><span className="text-right">{loan?.date}</span></div>


                                    <div className="flex flex-row justify-between">

                                        <span className="font-bold">Action</span>
                                        <span>
                                            <button onClick={() => handlePayLoan(loan._id)} className="bg-[#412262ff] btn text-white  ">Pay Loan</button>

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

export default UserLoan;