"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
    const router=usePathname()
    const [isActive, setIsActive] = useState('');

    useEffect(()=>{
        setIsActive(router)
    },[router])

    const dashMenu=<>
    {/* for both */}
    <li  className={isActive==='/dashboard/products/allProducts' ? '   bg-[#c07ccaff] text-white mr-4' : ' text-white mr-4'}><Link href='/dashboard/products/allProducts'>Products</Link></li>

    {/* user panel */}
    <li className={isActive==='/dashboard/myBag' ? '   bg-[#c07ccaff] text-white mr-4' : ' text-white mr-4'}><Link href='/dashboard/myBag'>My Bag</Link></li>
    <li className={isActive==='/dashboard/paymentHistory' ? '   bg-[#c07ccaff] text-white mr-4' : 'text-white  mr-4'}><Link href='/dashboard/paymentHistory'>Payment History</Link></li>
    <li className={isActive==='/dashboard/myOffer' ? '   bg-[#c07ccaff] text-white mr-4' : 'text-white  mr-4'}><Link href='/dashboard/myOffer'>My Offer</Link></li>
    <li className={isActive==='/dashboard/studentProfile' ? '   bg-[#c07ccaff] text-white mr-4' : ' text-white mr-4'}><Link href='/dashboard/studentProfile'>My Profile</Link></li>
    <li className={isActive ==='/dashboard/myLoan' ? '   bg-[#c07ccaff] text-white mr-4' : 'text-white  mr-4'}><Link href='/dashboard/myLoan'>My Loan</Link></li>
    <li className={isActive ==='/dashboard/feedback' ? '   bg-[#c07ccaff] text-white mr-4' : 'text-white  mr-4'}><Link href='/dashboard/feedback'>My Feedback</Link></li>

    {/* admin panel */}
    <li className={isActive ==='/dashboard/adminProfile' ? '   bg-[#c07ccaff] text-white mr-4' : 'text-white  mr-4'}><Link href='/dashboard/adminProfile'>My Profile(admin)</Link></li>
    <li className={isActive ==='/dashboard/customersFeedback' ? '   bg-[#c07ccaff] text-white mr-4' : 'text-white  mr-4'}><Link href='/dashboard/customersFeedback'>Customer&apos;s Feedback</Link></li>
    <li className={isActive ==='/dashboard/addProduct' ? '   bg-[#c07ccaff] text-white mr-4' : 'text-white  mr-4'}><Link href='/dashboard/addProduct'>Add Product</Link></li>
    <li className={isActive ==='/dashboard/manageUser' ? '   bg-[#c07ccaff] text-white mr-4' : 'text-white  mr-4'}><Link href='/dashboard/manageUser'>Manage User</Link></li>
    <li className={isActive ==='/dashboard/loans' ? '   bg-[#c07ccaff] text-white mr-4' : 'text-white  mr-4'}><Link href='/dashboard/loans'>Loans</Link></li>
    <li className={isActive ==='/dashboard/statistics' ? '   bg-[#c07ccaff] text-white mr-4' : 'text-white  mr-4'}><Link href='/dashboard/statistics'>Product Stat</Link></li>
    
    </>
    
    return (
        <div className='p-4 w-80 min-h-full bg-[#412262ff]'>
                    <div className="flex flex-col items-center">
                        <Image className='bg-white rounded-full' src="https://i.ibb.co/C6pbtVv/Pngtree-hand-drawn-a-bunch-of-4375898.png" width={100} height={100} priority alt="logo" />
                        <h1 className='text-2xl text-white meri'>Vend Cruch</h1>
                    </div>
                    <ul className="menu  text-white">
                        {/* Sidebar content here */}
                       {dashMenu}
                    </ul>
                </div>
    );
};

export default Navbar;