"use client"
import { useContext } from 'react';
import { AuthContext } from '@/Provider/Provider';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '@/components/Hooks/UseAxiosSecure';
import Link from 'next/link';

const MyProfile = () => {
    const { user,loading } = useContext(AuthContext)
    const axiosSecure = UseAxiosSecure()
    const { data: myProfile, refetch } = useQuery({
        queryKey: ['myProfile'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })
    return (
        <div className="py-8 flex  flex-col font-sans  space-y-4 my-10 justify-center  items-center mx-auto bg-white">
            <div>
                <div className='flex flex-col items-center justify-center'>

                    <div className="relative group">
                        <Image width={110} height={110} className=" bg-slate-500 object-cover rounded-full" src={user?.photoURL} alt="card navigate ui" />
                        <span className="h-5 w-5 bg-green-500 absolute rounded-full bottom-3 right-0 border-[3px] border-white"></span>
                        <span className="h-5 w-5 bg-green-500 absolute rounded-full bottom-3 right-0 animate-ping"></span>
                    </div>
                    <div className="text-center mt-5 ">
                        <h1 className="text-2xl text-gray-700">{user?.displayName}</h1>
                        <p className="text-gray-400 text-sm">Student</p>
                    </div>
                </div>
                <div className="divider divider-vertical md:divider-horizontal"></div>

            </div>

            <div className='flex flex-col items-center justify-center'>
                <div className="flex flex-col items-center w-full py-2">
                    <div className="text-center mt-5">
                        <p className="text-gray-500">Email</p>
                        <p className="text-xl font-mono text-gray-700 mb-5">{user?.email}</p>
                    </div>
                    <div className="text-center mt-5">
                        <p className="text-gray-500">Student ID</p>
                        <p className="text-xl font-mono text-gray-700">{myProfile?.userID}</p>
                    </div>

                </div>

                <div>
                    <Link href='/dashboard/paymentHistory'>
                        <button className="btn mt-10 text-white hover:bg-[#c07ccaff] bg-[#412262ff]">My Purchase</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;