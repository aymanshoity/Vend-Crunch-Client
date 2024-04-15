"use client"
import { useContext } from 'react';
import { AuthContext } from '@/Provider/Provider';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import UseAxiosSecure from '@/components/Hooks/UseAxiosSecure';
const UserFeedback = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure=UseAxiosSecure()
    const { data: myProfile, refetch } = useQuery({
        queryKey: ['myProfile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })

    const {register,handleSubmit,reset,formState: { errors },} = useForm()
    
    const date = new Date().toDateString()
    const today = date.split(' ');
    const todaysDate = `${today[1]}. ${today[2]},${today[3]}`;

      const onSubmit = (data) => {
        console.log(data)
        const userImage={userImage: user?.photoURL ,date:todaysDate}
        const customerFeedback={...userImage,...data}
        console.log(customerFeedback)
        Swal.fire({
            title: "Do you want to send the feedback?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Send",
            denyButtonText: `Don't send`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.post('/feedbacks',customerFeedback)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.insertedId){
                        Swal.fire("Sent!", "", "success");
                        reset()
                    }
                })
              
            } else if (result.isDenied) {
              Swal.fire("Changes are not sent", "", "info");
            }
          });

    }
    return (
        <div className=' card shrink-0 w-full my-10  p-10 shadow-2xl hover:shadow-[#c07ccaff] shadow-[#412262ff] bg-base-100'>

            <div className='flex md:flex-row flex-col items-center md:items-start justify-between gap-10 mx-5'>
                <div className=' '>
                    <div className="relative group">
                        <Image width={110} height={110} className=" bg-slate-500 object-cover rounded-full" src={user?.photoURL} alt="card navigate ui" />
                        <span className="h-5 w-5 bg-[#412262ff] absolute rounded-full bottom-3 right-0 border-[3px] border-white"></span>
                        <span className="h-5 w-5 bg-[#c07ccaff] absolute rounded-full bottom-3 right-0 animate-ping"></span>
                    </div>
                </div>
                <div className="lg:w-1/3 md:1/2 mt-5 flex-1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("userName", { required: true })} type="text" defaultValue={user?.displayName} placeholder="John Doe" className="input input-bordered" required />
                            {errors.userName && <span>This field is required</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("userEmail", { required: true })} type="email" defaultValue={user?.email} placeholder="johndoe123@yahoo.com" className="input input-bordered" required />
                            {errors.userEmail && <span>This field is required</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Student ID</span>
                            </label>
                            <input {...register("userID", { required: true })} defaultValue={myProfile?.userID} type="text" placeholder="" className="input input-bordered" required />
                            {errors.userID && <span>This field is required</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Feedback</span>
                            </label>
                            <textarea {...register("userFeedback", { required: true })} className="textarea textarea-bordered" placeholder="Provide feedback..."></textarea>
                            {errors.userFeedback && <span>This field is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn  text-white  hover:text-white hover:bg-[#c07ccaff] bg-[#412262ff]">Submit Feedback</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UserFeedback;