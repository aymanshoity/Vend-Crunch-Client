"use client"
import Image from 'next/image';
import React from 'react';
import { motion } from "framer-motion";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from '@mui/material';
import Link from 'next/link';
const LandingPage = () => {
    return (
        <div className='bg-[#412262ff] flex flex-col justify-center items-center min-h-screen'>
            <motion.div className=' bg-white w-[250px] h-[250px] rounded-full flex flex-col items-center justify-center'
            >
                <motion.div className='flex flex-col items-center justify-center'
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                        scale: {
                            type: "spring",
                            damping: 5,
                            stiffness: 100,
                            restDelta: 0.001
                        }
                    }}>
                    <Image className='bg-white rounded-full' src="https://i.ibb.co/1X9c5PM/Cruch-Logo.png" width={180} height={100} alt="logo" />
                    <span className='text-3xl text-center text-[#412262ff] meri'>Vend Crunch</span>
                </motion.div>
            </motion.div>

            <div className='my-5'>
                <motion.div
                    className="bg-white text-[#412262ff] px-8 py-2 meri rounded-full"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <Link href="/register">
                        <IconButton>
                            <ArrowBackIcon className='text-[#412262ff]' />
                        </IconButton> Register
                    </Link>

                </motion.div>
                <motion.div
                    className="bg-white text-[#412262ff] my-5 px-8 py-2 meri rounded-full"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <Link href="/login">
                        <IconButton>
                            <ArrowForwardIcon className='text-[#412262ff]' />
                        </IconButton> Login
                    </Link>
                </motion.div>
            </div>

        </div>
    );
};

export default LandingPage;