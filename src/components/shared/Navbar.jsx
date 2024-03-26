"use client"

import Link from "next/link";

const Navbar = () => {

    const navLinks = 
        <>
            <Link href='/' className={({ isActive }) => (isActive ? ' text-xl font-bold  text-[#c07ccaff] mr-4' : ' text-xl text-white  font-bold  mr-4')}>Home</Link>
            <Link href='/addProduct' className={({ isActive }) => (isActive ? ' text-xl font-bold  text-[#c07ccaff] mr-4' : ' text-xl text-white  font-bold  mr-4')}>Add Product</Link>
            <Link href='/myBag' className={({ isActive }) => (isActive ? ' text-xl font-bold  text-[#c07ccaff] mr-4' : ' text-xl text-white  font-bold  mr-4')}>My Bag</Link>
        </>
    
    return (
        <div className="navbar bg-[#412262ff]">
            <div className="navbar-start  text-white meri">
                <div className="dropdown bg-[#412262ff]">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#412262ff] rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-3xl text-white meri">Vend Crunch</a>
            </div>
            <div className="navbar-end hidden lg:flex text-white meri">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

        </div>
    );
};

export default Navbar;