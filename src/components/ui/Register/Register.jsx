"use client"

import UseAxiosPublic from "@/components/Hooks/UseAxiosPublic";
import Image from "next/image";
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "@/Provider/Provider";
import { updateProfile } from "firebase/auth";
const Register = () => {
    const router = useRouter()
    const { createUser, logOut } = useContext(AuthContext)
    const axiosPublic = UseAxiosPublic()
    const [error, setError] = useState("")
    const {register,handleSubmit,reset,formState: { errors }} = useForm()

    const onSubmit = (data) => {
        console.log(data)

        const Role = { role: 'student' }
        const userData = { ...data, ...Role }
        console.log(userData)

        createUser(data.userEmail, data.userPassword)
            .then(result => {
                console.log(result.user)
                updateProfile(result.user, {
                    displayName: data.userName,
                    photoURL: data.userImage
                })
                    .then(() => {
                        axiosPublic.post('/users', userData)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.insertedId) {
                                    Swal.fire("Registration Successful!!!");
                                    reset();
                                    logOut()
                                        .then()
                                        .catch()
                                    router.push('/login')

                                } else {
                                    setError('User Already Exists..Please go for login')
                                }
                            })
                    })
                    .catch(error => {
                        console.log(error)

                    })
            })
            .catch(error => {
                console.log(error)
                setError('User Already Exists..Please go for login')
            })

    }


    return (
        <div className="bg-[#412262ff] min-h-screen flex flex-col items-center justify-center" >
            <div className="my-20 max-w-md p-8 space-y-3 rounded-xl border-t-4 border-[#c07ccaff] shadow-xl bg-white  font-sans mx-auto">
                <div className="flex flex-col items-center">
                    <Image className='bg-white ' src="https://i.ibb.co/C0Mmx1T/eeee.png" width={100} height={100} priority alt="logo" />
                </div>
                <h1 className="text-3xl font-bold text-center text-[#412262ff]">Register!!!</h1>
                {/* Input fields and the form started */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2 text-sm form-control">
                        <label className="block ">
                            Your Name
                        </label>
                        <input {...register("userName", { required: true })} type="text" name="userName" required placeholder="John Doe" className="w-full px-4 py-3 rounded-md border border-[#412262ff] focus:outline-none focus:ring  " />
                        {errors.userName && <span>This field is required</span>}
                    </div>
                    <div className="space-y-2 text-sm form-control">
                        <label className="block ">
                            Student Id
                        </label>
                        <input {...register("userID", { required: true })} type="text" name="userID" placeholder="201826040" required className="w-full px-4 py-3 rounded-md border border-[#412262ff] focus:outline-none focus:ring  " />
                        {errors.userID && <span>This field is required</span>}
                    </div>
                    <div className="space-y-2 text-sm form-control">
                        <label className="block ">
                            Your Image
                        </label>
                        <input {...register("userImage", { required: true })} type="url" required name="userImage" placeholder="john.png" className="w-full px-4 py-3 rounded-md border border-[#412262ff] focus:outline-none focus:ring  " />
                        {errors.userImage && <span>This field is required</span>}

                    </div>
                    <div className="space-y-2 text-sm form-control">
                        <label className="block ">
                            Your Email
                        </label>
                        <input {...register("userEmail", { required: true })} type="email" required name="userEmail" placeholder="johndoe@gmail.com" className="w-full px-4 py-3 rounded-md border border-[#412262ff] focus:outline-none focus:ring  " />
                        {errors.userEmail && <span>This field is required</span>}

                    </div>

                    <div className="space-y-2 text-sm form-control">
                        <label className="block ">
                            Password
                        </label>
                        <input {...register("userPassword", { required: true, minLength: 6, maxLength: 16, pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/ })} type="password" name="userPassword" placeholder="*****" className="w-full px-4 py-3 rounded-md border border-[#412262ff] focus:outline-none focus:ring  " required />
                        {errors.userPassword?.type === "required" && (
                            <p className="text-red-600">Password is required</p>
                        )}
                        {errors.userPassword?.type === "minLength" && (
                            <p className="text-red-600">Password length should be at least 6</p>
                        )}
                        {errors.userPassword?.type === "maxLength" && (
                            <p className="text-red-600">Password length should be maximum 16 characters</p>
                        )}
                        {errors.userPassword?.type === "pattern" && (
                            <p className="text-red-600">Password should contain at least 1 number and one Special character 1 Uppercase and 1 lowercase</p>
                        )}


                    </div>
                    {
                        error && <span className="text-red-600">{error}</span>
                    }
                    {/* Sign in Button */}
                    <div className="form-control mt-5">

                        <button className="text-lg rounded-xl relative p-[10px] block w-full bg-[#412262ff] text-white border-y-4 duration-500 overflow-hidden focus:border-[#412262ff] z-50 group">
                            Register
                            <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
                                Let&apos;s go
                            </span>
                            <span className="bg-[#c07ccaff] absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                            <span className="bg-[#c07ccaff] absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                            <span className="bg-[#c07ccaff] absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                            <span className="bg-[#c07ccaff] absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                        </button>


                    </div>

                </form>

                <p className="text-sm text-center gap-2 flex justify-center sm:px-6 ">
                    Already have an Account?
                    <a href="/login" className="underline hover:text-[#c07ccaff]">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;