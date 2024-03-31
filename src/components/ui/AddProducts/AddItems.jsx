"use client"

import UseAxiosSecure from "@/components/Hooks/UseAxiosSecure";
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"
const AddItems = () => {
    const axiosSecure = UseAxiosSecure()
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
        console.log(item)
        Swal.fire({
            title: "Do you want to add this Item?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Add",
            denyButtonText: `Don't add`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.post('/products', item)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire("Added!", "", "success");
                            reset()
                            
                        }
                    })

            } else if (result.isDenied) {
                Swal.fire("Changes are not added", "", "info");
            }
        });
    }
    
    return (
        <div>

            <div className="lg:w-[800px] md:w-[500px] w-[280px] mx-auto my-10 shadow-lg bg-white shadow-[#412262ff]">
                <form onSubmit={handleSubmit(onSubmit)} className="p-12">
                    <h1 className="backdrop-blur-sm text-4xl pb-8">Add a new Item</h1>
                    <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 items-center gap-6">

                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Name</label>
                            <input {...register("productName", { required: true })} name="productName" type="text" placeholder="juice" className="p-3 block w-full drop-shadow-lg outline-none" />
                            {errors.productName && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Brand Name</label>
                            <input {...register("brandName", { required: true })} name="brandName" type="text" placeholder="pran/.." className="p-3 block w-full drop-shadow-lg outline-none" />
                            {errors.brandName && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Category</label>
                            <select {...register("category", { required: true })} name="category" className="p-3 block w-full drop-shadow-lg outline-none ">
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
                            <input {...register("imageURL", { required: true })} name="imageURL" type="url" placeholder="http://.." className="p-3 block w-full drop-shadow-lg outline-none" />
                            {errors.imageURL && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Amount</label>
                            <input {...register("amount", { required: true })} name="amount" type="text" placeholder="20 gm " className="p-3 block w-full drop-shadow-lg outline-none" />
                            {errors.amount && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Quantity</label>
                            <input {...register("quantity", { required: true })} name="quantity" type="number" placeholder="10/5" className="p-3 block w-full drop-shadow-lg outline-none" />
                            {errors.quantity && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Price</label>
                            <input {...register("price", { required: true })} name="price" type="text" placeholder="20 " className="p-3 block w-full drop-shadow-lg outline-none" />
                            {errors.price && <span className="text-red-600">This field is required</span>}
                        </div>

                    </div>
                    {/* button type will be submit for handling form submission*/}
                    <button type="submit" className="btn bg-[#412262ff] text-white my-5 w-full hover:bg-[#c07ccaff] hover:text-white">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;