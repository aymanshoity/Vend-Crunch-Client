"use client"
import { AuthContext } from '@/Provider/Provider';
import UseAxiosSecure from '@/components/Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Swal from 'sweetalert2'
const MyCart = () => {
    const axiosSecure = UseAxiosSecure()
    const { user,loading } = useContext(AuthContext)
    const { data: myCart, refetch } = useQuery({
        queryKey: ['myCart'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart/${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })
    const { data: userInformation } = useQuery({
        queryKey: ['userInformation'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })
    const { data: loans } = useQuery({
        queryKey: ['loans'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/loans/${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })
     console.log(loans?.length)
    const [count, setCount] = useState(1)
    const [disable,setDisable]=useState(false)
    useEffect(() => {
        if (count < 1) {
            setCount(1)
        }
        if(loans?.length>0){
            setDisable(true)
        }
    }, [count,loans])


    const totalPrice = myCart?.reduce((total, item) => {
        return total + (item?.price * count);
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
                axiosSecure.delete(`/cart/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        } refetch()
                    })

            }
        });
    }
    const date = new Date().toDateString()
    const today = date.split(' ');
    const todaysDate = `${today[1]}. ${today[2]},${today[3]}`

    const handleCheckout = () => {
        const userInfo = {
            userName: user?.displayName,
            userEmail: user?.email,
            userImage: user?.photoURL,
            userID: userInformation?.userID,
        }
        const productTimeQuantity = {
            purchasedQuantity: parseInt(count),
            purchasedPrice: parseInt(totalPrice),
            date: todaysDate,
        }
        const productDetails = {
            amount: myCart[0]?.amount,
            brandName: myCart[0]?.brandName,
            category: myCart[0]?.category,
            imageURL: myCart[0]?.imageURL,
            price: myCart[0]?.price,
            productName: myCart[0]?.productName,
            product_id: myCart[0]?.product_id,
            quantity: myCart[0]?.quantity,
            userEmail: myCart[0]?.userEmail,
            userName: myCart[0]?.userName,
            cartItem_id: myCart[0]?._id
        };
        const purchasedProduct = {
            ...productDetails, ...userInfo, ...productTimeQuantity
        }
        console.log(purchasedProduct)
        Swal.fire({
            title: "Confirm Payment?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                const changedQuantity = {
                    quantity: parseInt(myCart[0]?.quantity - purchasedProduct?.purchasedQuantity)
                }
                axiosSecure.patch(`/products/purchase/${purchasedProduct?.product_id}`, changedQuantity)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            axiosSecure.post('/purchase', purchasedProduct)
                                .then(res => {
                                    console.log(res.data)
                                    const paymentResponse = res.data

                                    axiosSecure.delete(`/cart/${purchasedProduct?.cartItem_id}`)
                                        .then(res => {
                                            console.log(res.data)
                                            if (res.data.deletedCount > 0) {
                                                window.location.replace(paymentResponse.url)

                                            }
                                            refetch()
                                        })


                                })

                        }
                    })



            }
        });

    }
    const handleEmergencyLoan = () => {
        const userInfo = {
            userName: user?.displayName,
            userEmail: user?.email,
            userImage: user?.photoURL,
            userID: userInformation?.userID,
        }
        const productTimeQuantity = {
            purchasedQuantity: parseInt(count),
            purchasedPrice: parseInt(totalPrice),
            date: todaysDate,
        }
        const productDetails = {
            amount: myCart[0]?.amount,
            brandName: myCart[0]?.brandName,
            category: myCart[0]?.category,
            imageURL: myCart[0]?.imageURL,
            price: myCart[0]?.price,
            productName: myCart[0]?.productName,
            product_id: myCart[0]?.product_id,
            quantity: myCart[0]?.quantity,
            userEmail: myCart[0]?.userEmail,
            userName: myCart[0]?.userName,
            cartItem_id: myCart[0]?._id
        };
        const purchasedProduct = {
            ...productDetails, ...userInfo, ...productTimeQuantity
        }
        console.log(purchasedProduct)
        Swal.fire({
            title: "Are you want to take a loan?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                const changedQuantity = {
                    quantity: parseInt(myCart[0]?.quantity - purchasedProduct?.purchasedQuantity)
                }
                axiosSecure.post('/loans', purchasedProduct)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            axiosSecure.patch(`/products/purchase/${purchasedProduct?.product_id}`, changedQuantity)
                                .then(res=>{
                                    console.log(res.data)
                                    if (res.data.modifiedCount > 0){
                                        axiosSecure.delete(`/cart/${purchasedProduct?.cartItem_id}`)
                                        .then(res => {
                                            console.log(res.data)
                                            if (res.data.deletedCount > 0) {
                                                Swal.fire({
                                                    title: "Request Accepted!",
                                                    text: "Grab the Product!!.",
                                                    icon: "success"
                                                });

                                            }
                                            refetch()
                                        })
                                    }
                                })
                        

                    }
                })



            }
        });

    }
    return (
        <div className='my-20'>
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
                            <Image width={75} height={75} src={item?.imageURL} alt="card navigate ui" />
                            <div>
                                <h5 className="text-lg font-medium">{item?.
                                    productName}</h5>
                                <p className="text-sm text-gray-400">Category {item?.category}</p>
                                <button onClick={() => handleDeleteItem(item?._id)} className='btn w-fit mt-2 bg-[#412262ff] text-white  hover:bg-[#c07ccaff] hover:text-white rounded-lg'>Delete</button>
                            </div>
                        </div>
                        {/* item increase decrees  */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-10">
                            <div className="space-x-2">
                                <button onClick={() => setCount(count - 1)} className="btn py-1 px-2 hover:text-[#412262ff] text-xl duration-200">-</button>
                                <span className="py-1 px-2.5 border hover:bg-[#412262ff] hover:text-white hover:border-[#412262ff] duration-300 ease-in-out rounded-sm">{count}</span>
                                <button onClick={() => setCount(count + 1)} className="btn py-1 px-2 hover:text-[#412262ff] text-xl duration-200">+</button>
                            </div>
                            <h6 className="text-xl font-medium text-slate-800">{totalPrice} Tk.</h6>
                        </div>
                    </div>
                ))}
                {/* calculation part  */}
                <div className="space-y-10">
                    <div className="flex justify-between items-center py-6">
                        <h5 className="text-xl text-slate-800 capitalize">total Price :</h5>
                        <h4 className="text-xl font-medium text-slate-800">{totalPrice} Tk.</h4>
                    </div>
                    <button onClick={handleCheckout} className="font-semibold btn bg-[#412262ff] text-white py-4 w-full duration-500 hover:bg-[#c07ccaff] hover:text-white">Proceed to Checkout</button>
                </div>

            </div>
            <button disabled={disable} onClick={handleEmergencyLoan} className="font-semibold btn bg-[#412262ff] text-white py-4 w-full duration-500 hover:bg-[#c07ccaff] hover:text-white">Take a Loan</button>
        </div>
    );
};

export default MyCart;