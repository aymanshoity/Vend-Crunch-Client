"use client"

import Image from "next/image";

const PaymentSuccess = () => {
    return (
        <div>
            <h1 className="text-2xl mt-10 text-red-500">Payment  Successful!!</h1>
            <h1 className="text-xl text-red-500 mb-5">Grab your Reward!!</h1>
            <div className="border border-spacing-2 border-black rounded-lg flex flex-col items-center gap-5">
                <div>
                    <h1>2 X</h1>
                    <Image alt="candy" width={60} height={60} src="https://i.ibb.co/m0scMhG/icons8-candy-64.png" />
                </div>
                <button className="btn">Grab Now</button>
            </div>

        </div>
    );
};

export default PaymentSuccess;