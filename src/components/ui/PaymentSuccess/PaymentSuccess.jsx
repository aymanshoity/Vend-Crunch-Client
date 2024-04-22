"use client"

import Image from "next/image";
import Link from "next/link";

const PaymentSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl my-20 font-extrabold text-red-500">Payment  Successful!!</h1>
            <Link href='/dashboard/products/allProducts'>
                <button className="btn bg-[#412262ff] text-white hover:bg-[#c07ccaff] hover:text-white w-fit">Go Home</button>
            </Link>

            {/* <h1 className="text-xl text-red-500 mb-5">Grab your Reward!!</h1>
            <div className="border border-spacing-2 border-black rounded-lg flex flex-col items-center gap-5">
                <div className="mt-10">
                    <h1>2 X</h1>
                    <Image alt="candy" width={60} height={60} src="https://i.ibb.co/m0scMhG/icons8-candy-64.png" />
                </div>
                <button className="btn">Grab Now</button>
            </div> */}

        </div>
    );
};

export default PaymentSuccess;