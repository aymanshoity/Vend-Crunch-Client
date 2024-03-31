"use client"
import UseAxiosSecure from "@/components/Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Swal from 'sweetalert2'
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "@/Provider/Provider";
import CancelIcon from '@mui/icons-material/Cancel';
import { useForm } from "react-hook-form"
const ItemDetails = () => {
    const axiosSecure = UseAxiosSecure()
    const { user } = useContext(AuthContext)
    const pathname = usePathname()
    // console.log(pathname)
    const extractedID = pathname.split('/').pop();
    console.log(extractedID)
    const [openModal, setOpenModal] = useState(false);
    const { data: item, refetch } = useQuery({
        queryKey: ['item'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/category/${extractedID}`)
            console.log(res.data)
            return res.data
        }
    })
   

    const handleAddToCart = (product, user) => {
        console.log(product?._id)
        // console.log(product)
        const productData = {
            product_id: product?._id,
            productName: product?.productName,
            category: product?.category,
            brandName: product?.brandName,
            quantity: product?.quantity,
            amount: product?.amount,
            price: product?.price,
            imageURL: product?.imageURL,
        };
        const userInfo = { userName: user?.displayName, userEmail: user?.email };
        console.log(userInfo)
        const cartData = { ...productData, ...userInfo }
        console.log(cartData)
        Swal.fire({
            title: "Do you want to add this product in your cart?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Add",
            denyButtonText: `Don't Add`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.post('/cart', cartData)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire("Product Added!", "", "success");
                        } else {
                            Swal.fire("Product Already Added!", "", "success");
                        }
                    })


            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const {register,handleSubmit,reset,formState: { errors }} = useForm()
    
    const onSubmit = (data) => {
        console.log(data)
        const item = {
            productName: data.productName,
            amount: data.amount,
            quantity: parseInt(data.quantity),
            category: data.category,
            price: parseInt(data.price),
            brandName: data.brandName,
            imageURL: data.imageURL
        };


        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.patch(`/products/${extractedID}`,item)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.modifiedCount>0){
                        Swal.fire("Product Updated!", "", "success");
                    }
                })
              
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
    }
    console.log(item)
    return (
        <div className="min-w-[90%] flex flex-col p-5 md:flex-row items-center justify-evenly">
            <div className="flex-1">
                <motion.div className='flex flex-col items-center'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                    <Image width={200} height={200} alt="item Image" src={item?.imageURL} />
                </motion.div>

            </div>
            <div className="flex-1">
                <h1 className="text-xl mb-3">Name: {item?.productName}</h1>
                <h1 className="text-lg mb-3 text-slate-700">{item?.amount}</h1>
                <h1 className="text-md mb-3 text-slate-700"> Category: {item?.category}</h1>
                <h1 className="text-sm mb-3">Brand: {item?.brandName}</h1>
                <h1 className="text-sm mb-3">Quantity: {item?.quantity}</h1>
                <h1 className="text-md mb-3">Price: {item?.price} Tk.</h1>
                <button onClick={() => handleAddToCart(item, user)} className="btn mb-3 text-white bg-[#412262ff] hover:text-white hover:bg-[#c07ccaff] mr-4 ">Add</button>
                <button onClick={() => setOpenModal(true)} className="btn mb-3 text-white bg-[#412262ff] hover:text-white hover:bg-[#c07ccaff] ">Update</button>
                <div onClick={() => setOpenModal(false)} className={`fixed flex justify-center items-center z-[100] ${openModal ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}>
                    <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-full lg:w-[500px] bg-white drop-shadow-2xl rounded-lg ${openModal ? 'opacity-1 duration-300 translate-y-0' : '-translate-y-20 opacity-0 duration-150'}`}>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-12">
                            <CancelIcon onClick={() => setOpenModal(false)} className="w-10 mx-auto mr-0 flex items-end cursor-pointer" />

                            <h1 className="backdrop-blur-sm text-4xl pb-8">Update</h1>
                            <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 items-center gap-6">

                                <div className="form-control">
                                    <label htmlFor="name" className="block">Product Name</label>
                                    <input defaultValue={item?.productName} {...register("productName", { required: true })} name="productName" type="text" placeholder="juice" className="p-3 block w-full drop-shadow-lg outline-none" />
                                    {errors.productName && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label htmlFor="name" className="block">Brand Name</label>
                                    <input defaultValue={item?.brandName} {...register("brandName", { required: true })} name="brandName" type="text" placeholder="pran/.." className="p-3 block w-full drop-shadow-lg outline-none" />
                                    {errors.brandName && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label htmlFor="name" className="block">Product Category</label>
                                    <select defaultValue={item?.category} {...register("category", { required: true })} name="category" className="p-3 block w-full drop-shadow-lg outline-none ">
                                        <option value="Chips">Chips</option>
                                        <option value="Snacks">Snacks</option>
                                        <option value="Drinks">Drinks</option>
                                        <option value="CandyBar">Chips</option>
                                        <option value="Biscuits">Biscuits</option>
                                    </select>
                                    {errors.category && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label htmlFor="name" className="block">Product Image</label>
                                    <input defaultValue={item?.imageURL} {...register("imageURL", { required: true })} name="imageURL" type="url" placeholder="http://.." className="p-3 block w-full drop-shadow-lg outline-none" />
                                    {errors.imageURL && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label htmlFor="name" className="block">Product Amount</label>
                                    <input defaultValue={item?.amount} {...register("amount", { required: true })} name="amount" type="text" placeholder="20 gm " className="p-3 block w-full drop-shadow-lg outline-none" />
                                    {errors.amount && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label htmlFor="name" className="block">Product Quantity</label>
                                    <input defaultValue={item?.quantity} {...register("quantity", { required: true })} name="quantity" type="number" placeholder="10/5" className="p-3 block w-full drop-shadow-lg outline-none" />
                                    {errors.quantity && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label htmlFor="name" className="block">Product Price</label>
                                    <input defaultValue={item?.price} {...register("price", { required: true })} name="price" type="text" placeholder="20 " className="p-3 block w-full drop-shadow-lg outline-none" />
                                    {errors.price && <span className="text-red-600">This field is required</span>}
                                </div>

                            </div>
                            {/* button type will be submit for handling form submission*/}
                            <button type="submit" className="btn bg-[#412262ff] text-white my-5 w-full hover:bg-[#c07ccaff] hover:text-white">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;