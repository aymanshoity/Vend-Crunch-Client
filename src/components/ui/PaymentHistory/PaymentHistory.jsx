"use client"

import { AuthContext } from "@/Provider/Provider";
import UseAxiosSecure from "@/components/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useContext } from "react";

const PaymentHistory = () => {
    const axiosSecure = UseAxiosSecure()
    const { user ,loading} = useContext(AuthContext)
    const { data: history, refetch } = useQuery({
        queryKey: ['history'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/purchase?email=${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })
    return (
        <div>
            {
                history?.map(payment => (
                    <div className="my-10 md:w-[500px] lg:w-[700px] mx-auto" key={payment._id}>
                        {payment?.paymentStatus ? (
                            <>

                                <div className="flex flex-col md:flex-row  items-start md:items-center md:justify-between">
                                    <div>
                                        <Image width={80} height={80} src={payment?.imageURL} alt="image" />
                                    </div>

                                    <div>
                                        <h1 className="text-md mt-2">{payment?.productName}</h1>
                                        <h1 className="text-xs text-slate-500">Quantity: {payment?.purchasedQuantity}</h1>
                                        <h1 className="text-xs text-slate-500">Cost: {payment?.purchasedPrice}</h1>
                                        <h1 className="text-xs text-slate-500">Transaction ID: {payment?.transactionID}</h1>
                                        <p className="text-xs text-red-600">{payment?.paymentStatus}</p>
                                        <p className="text-xs text-red-600">{payment?.date}</p>
                                    </div>

                                </div>
                                <div className="divider"></div>



                            </>
                        ) : null}

                        


                    </div>
                ))
            }
        </div>
    );
};

export default PaymentHistory;