"use client"

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from "framer-motion";
const CategoryList = () => {


    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 items-center my-5">
            {/* All Products */}
            <Link href='/dashboard/products/allProducts'>
                <motion.div className='flex flex-col items-center'

                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                    <div className='flex flex-col items-center w-[80px] h-[80px] rounded-lg border border-spacing-3 p-2 border-[#412262ff]'>
                        <Image width={80} height={80} alt="chips" src="https://i.ibb.co/1X9c5PM/Cruch-Logo.png" />

                    </div>
                    <h1>All Items</h1>
                </motion.div>
            </Link>
            {/* chips */}
            <Link href='/dashboard/products/Chips'>
                <motion.div className='flex flex-col items-center'
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                    <div className='flex flex-col items-center w-[80px] h-[80px] rounded-lg border border-spacing-3 p-2 border-[#412262ff]'>
                        <Image width={80} height={80} alt="chips" src="https://i.ibb.co/NmYgTrW/icons8-chips-66.png" />

                    </div>
                    <h1>Chips</h1>
                </motion.div>
            </Link>
            {/* Snacks */}
            <Link href='/dashboard/products/Snacks'>
                <motion.div className='flex flex-col items-center'
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                    <div className='flex flex-col items-center w-[80px] h-[80px] rounded-lg border border-spacing-3 p-2 border-[#412262ff]'>
                        <Image width={80} height={80} alt="chips" src="https://i.ibb.co/b2fcgCk/icons8-snacks-64.png" />

                    </div>
                    <h1>Snacks</h1>
                </motion.div>
            </Link>
            <Link href='/dashboard/products/CandyBar'>
                <motion.div className='flex flex-col items-center'
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                    <div className='flex flex-col items-center w-[80px] h-[80px] rounded-lg border border-spacing-3 p-2 border-[#412262ff]'>
                        <Image width={80} height={80} alt="chips" src="https://i.ibb.co/QHjqh1t/6126926681642324255-128.png" />

                    </div>
                    <h1>Candy Bar</h1>
                </motion.div>
            </Link>

            <Link href='/dashboard/products/Biscuits'>
                <motion.div className='flex flex-col items-center'
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                    <div className='flex flex-col items-center w-[80px] h-[80px] rounded-lg border border-spacing-3 p-2 border-[#412262ff]'>
                        <Image width={80} height={80} alt="chips" src="https://i.ibb.co/4fm2zqT/99543811639323065-128.png" />

                    </div>
                    <h1>Biscuits</h1>
                </motion.div>
            </Link>
            <Link href='/dashboard/products/Drinks'>
                <motion.div className='flex flex-col items-center'
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                    <div className='flex flex-col items-center w-[80px] h-[80px] rounded-lg border border-spacing-3 p-2 border-[#412262ff]'>
                        <Image width={80} height={80} alt="chips" src="https://i.ibb.co/LpsF2m8/icons8-can-64.png" />

                    </div>
                    <h1>Drinks</h1>
                </motion.div>
            </Link>
        </div>
    );
};

export default CategoryList;
//

//
//
// 