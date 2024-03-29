"use client"
import { useRouter } from "next/navigation";
import { AuthContext } from '@/Provider/Provider';
import React, { useContext } from 'react';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Image from 'next/image';

const Banner = () => {
    const router = useRouter()
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => router.push('/login'))
            .catch()
    }
    return (
        <div className="flex flex-row items-start justify-between lg:bg-white bg-[#412262ff] rounded-b-badge w-full  p-10">
            <div className="flex flex-row items-center">
                
                <label htmlFor="my-drawer-2" className="border border-[#412262ff] bg-white drawer-button lg:hidden rounded-lg">

                    <MenuOpenIcon className='bg-white text-[#412262ff] m-2' />

                </label>
                <h1 className="lg:text-[#412262ff] lg:text-3xl text-2xl text-white meri">Vend Crunch</h1>

            </div>

            <div className="dropdown dropdown-end text-right">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">

                    <Image className=" rounded-full " width={150} height={150} alt="user image" src={user?.photoURL} />

                </div>
                <ul className="text-white lg:text-[#412262ff] text-xs text-right">
                    <li>{user?.displayName}</li>
                    <li>{user?.email}</li>
                </ul>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-xs dropdown-content bg-[#c07ccaff] rounded-box text-xs w-52 text-white">

                    <li><a onClick={handleLogOut}>Logout</a></li>
                </ul>
            </div>

        </div>
    );
};

export default Banner;