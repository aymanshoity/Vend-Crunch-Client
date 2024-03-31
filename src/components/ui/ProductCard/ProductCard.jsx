"use client"
import { useContext, useEffect, useState } from 'react';
import { AllCategories } from "@/components/utils/getAllCategories";
import Image from "next/image";
import Swal from 'sweetalert2'
import { usePathname } from 'next/navigation';
import UseAxiosPublic from '@/components/Hooks/UseAxiosPublic';
import { AuthContext } from '@/Provider/Provider';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const ProductCard = () => {
    const { user } = useContext(AuthContext)

    const axiosPublic = UseAxiosPublic()
    const pathname = usePathname()
    // console.log(pathname)
    const extractedCategory = pathname.split('/').pop();
    // console.log(extractedCategory)
    // const [data, setData] = useState([]);

    const { data: category, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${extractedCategory}`)
            console.log(res.data)
            return res.data
        }
    })
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await AllCategories(extractedCategory);
    //         setData(result);
    //     };

    //     fetchData();
    // }, [extractedCategory]);

    // console.log(data.length)

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
                axiosPublic.post('/cart', cartData)
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
    return (
        <div>

            {/* <h1 className="text-center my-10">{extractedCategory}: {category.length}</h1> */}
            <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-5">
                {
                    category?.map(product => (
                        <div key={product?._id} className="card flex md:flex-col flex-row-reverse items-center justify-center bg-white border-t-4 border-[#c07ccaff] shadow-xl ">
                            <div className="flex flex-col items-center ">
                                <figure className='h-[250px]' ><Image height={150} width={100} src={product.imageURL} alt="Shoes" /></figure>

                                <button onClick={() => handleAddToCart(product, user)} className=" p-2 rounded-lg  bg-[#412262ff] text-white hover:bg-[#c07ccaff] hover:text-white w-fit mt-2 mb-5">Add</button>
                            </div>

                            <div className="card-body">
                                <h2 className="font-bold">{product?.productName}</h2>
                                <p>Category: {product?.category}</p>
                                <p>Price: {product?.price}</p>
                                <Link href={`/dashboard/products/${product.category}/${product._id}`}>
                                    <button className="btn bg-[#412262ff] text-white hover:bg-[#c07ccaff] hover:text-white w-fit">Details</button>
                                </Link>

                            </div>
                        </div>
                    ))
                } *
            </div>


        </div>
    );
};

export default ProductCard;