"use client"

import UseAxiosSecure from "@/components/Hooks/UseAxiosSecure";
import Swal from 'sweetalert2'
const AddItems = () => {
    const axiosSecure = UseAxiosSecure()
    const handleAddItem = (e) => {
        e.preventDefault()
        const form = e.target
        const item = {
            productName: form.productName.value,
            amount: form.amount.value,
            quantity: parseInt(form.quantity.value),
            category: form.category.value,
            price: parseInt(form.price.value),
            brandName: form.brandName.value,
            imageURL: form.imageURL.value
        }
        console.log(item)
        Swal.fire({
            title: "Do you want to add this Item?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Add",
            denyButtonText: `Don't add`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.post('/products', item)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire("Added!", "", "success");
                        }
                    })

            } else if (result.isDenied) {
                Swal.fire("Changes are not added", "", "info");
            }
        });
    }
    return (
        <div>

            <div className="lg:w-[800px] md:w-[500px] w-[280px] mx-auto my-10 shadow-lg bg-white shadow-[#412262ff]">
                <form onSubmit={handleAddItem} className="p-12">
                    <h1 className="backdrop-blur-sm text-4xl pb-8">Add a new Item</h1>
                    <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 items-center gap-6">

                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Name</label>
                            <input name="productName" type="text" placeholder="juice" className="p-3 block w-full drop-shadow-lg outline-none" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Brand Name</label>
                            <input name="brandName" type="text" placeholder="pran/.." className="p-3 block w-full drop-shadow-lg outline-none" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Category</label>
                            <select name="category" className="p-3 block w-full drop-shadow-lg outline-none ">
                                <option value="Chips">Chips</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Drinks">Drinks</option>
                                <option value="CandyBar">Chips</option>
                                <option value="Biscuits">Biscuits</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Image</label>
                            <input name="imageURL" type="url" placeholder="http://.." className="p-3 block w-full drop-shadow-lg outline-none" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Amount</label>
                            <input name="amount" type="text" placeholder="20 gm " className="p-3 block w-full drop-shadow-lg outline-none" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Quantity</label>
                            <input name="quantity" type="number" placeholder="10/5" className="p-3 block w-full drop-shadow-lg outline-none" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="name" className="block">Product Price</label>
                            <input name="price" type="text" placeholder="20 " className="p-3 block w-full drop-shadow-lg outline-none" />
                        </div>

                    </div>
                    {/* button type will be submit for handling form submission*/}
                    <button type="submit" className="btn bg-[#412262ff] text-white my-5 w-full hover:bg-[#c07ccaff] hover:text-white">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;