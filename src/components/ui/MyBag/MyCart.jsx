"use client"
import { AuthContext } from '@/Provider/Provider';
import UseAxiosPublic from '@/components/Hooks/UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Swal from 'sweetalert2'
const MyCart = () => {
    const axiosPublic = UseAxiosPublic()
    const { user } = useContext(AuthContext)
    const { data: myCart, refetch } = useQuery({
        queryKey: ['myCart'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/cart/${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })
    console.log(myCart)
    const [quantities, setQuantities] = useState({})

    const increaseQuantity = (id) => {
        setQuantities((previousQuantity) => ({
            ...previousQuantity, [id]: (previousQuantity[id] || 0) + 1
        }))
    }

    const decreaseQuantity = (id) => {
        if (quantities[id] > 1) {
            setQuantities((previousQuantity) => ({
                ...previousQuantity, [id]: previousQuantity[id] - 1
            }))
        }
    }

    const totalPrice = myCart?.reduce((total, item) => {
        return total + (item.price * (quantities[item._id] || 1));
    }, 0);

    const handleDeleteItem = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure you want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/cart/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount> 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            
                        }refetch()
                    })

            }
        });
    }
    return (
        <div className="bg-gray-250 shadow-md max-w-[800px] bg-white md:w-[700px] p-8 my-20 space-y-6">
            {/* top part  */}
            <div className="flex justify-between items-center">
                <h4 className="text-xl font-medium text-slate-800 uppercase">My Orders</h4>
                <p className="text-sm font-medium text-gray-400 uppercase">Price</p>
            </div>
            <hr />
            {/*  Cart  map */}
            {myCart?.map((item, idx) => (
                <div key={item?._id} className="flex md:flex-row flex-col gap-6 md:items-center items-stretch justify-between  border-b pb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <Image width={75} height={75} src={item.imageURL} alt="card navigate ui" />
                        <div>
                            <h5 className="text-lg font-medium">{item?.
                                productName}</h5>
                            <p className="text-sm text-gray-400">Category {item?.category}</p>
                            <button onClick={() => handleDeleteItem(item?._id)} className='btn w-fit mt-2 bg-[#412262ff] text-white  hover:bg-[#c07ccaff] hover:text-white rounded-lg'>Delete</button>
                        </div>
                    </div>
                    {/* item increase decrees  */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-10">
                        <div className="space-x-3">
                            <button onClick={() => decreaseQuantity(item?._id)} className="btn py-1 px-2 hover:text-[#412262ff] text-xl duration-200">-</button>
                            <span className="py-1 px-2.5 border hover:bg-[#412262ff] hover:text-white hover:border-[#412262ff] duration-300 ease-in-out rounded-sm">{quantities[item._id] || 1}</span>
                            <button onClick={() => increaseQuantity(item?._id)} className="btn py-1 px-2 hover:text-[#412262ff] text-xl duration-200">+</button>
                        </div>
                        <h6 className="text-xl font-medium text-slate-800">{(item?.price * (quantities[item._id] || 1))} Tk.</h6>
                    </div>
                </div>
            ))}
            {/* calculation part  */}
            <div className="space-y-10">
                <div className="flex justify-between items-center py-6">
                    <h5 className="text-xl text-slate-800 capitalize">total Price :</h5>
                    <h4 className="text-xl font-medium text-slate-800">{totalPrice} Tk.</h4>
                </div>
                <button className="font-semibold btn bg-[#412262ff] text-white py-4 w-full duration-500 hover:bg-[#c07ccaff] hover:text-white">Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default MyCart;