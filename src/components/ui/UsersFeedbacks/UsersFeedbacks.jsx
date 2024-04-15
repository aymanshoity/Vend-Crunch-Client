"use client"
import { AuthContext } from '@/Provider/Provider';
import UseAxiosSecure from '@/components/Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useContext } from 'react';

const UsersFeedbacks = () => {
    const axiosSecure = UseAxiosSecure()
    const { user } = useContext(AuthContext)
    const { data: feedbacks, refetch } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/feedbacks')
            console.log(res.data)
            return res.data
        }
    })
    return (
        <div>
            {
                feedbacks?.map(feedback => (
                    <div key={feedback._id} className=''>
                        <div className='flex flex-col md:flex-row items-start justify-center gap-6 h-fit border rounded-md border-black border-spacing-2  m-5'>

                            <div className='p-5'>
                                <div className='flex flex-col  md:flex-row items-start md:items-center gap-4'>
                                    <Image width={100} height={100} alt="user" src={feedback?.userImage} />
                                    <div>
                                        <h1>{feedback?.userName}</h1>
                                        <p>{feedback?.userEmail}</p>
                                        <p>{feedback?.userID}</p>
                                        
                                    </div>
                                </div>
                                <div className='divider divider-vertical'></div>
                                <div>
                                    <p><span className='font-bold'>Feedback: </span>{feedback?.userFeedback}</p>
                                    <p className='text-red-600 text-sm'>{feedback?.date}</p>
                                    <button className='btn'>Resolve</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    );
};

export default UsersFeedbacks;