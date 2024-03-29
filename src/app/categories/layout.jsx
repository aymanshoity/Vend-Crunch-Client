import Banner from "@/components/shared/Banner";
import Navbar from "@/components/shared/Navbar";
import CategoryList from "@/components/ui/CategoryList/CategoryList";
import Link from "next/link";



const layout = ({ children }) => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <div className="my-10">
                <div className="lg:w-1/4 ">
                    <div className="bg-gray-200 mt-5 px-5 py-2 flex flex-col items-start">
                        {
                            allCategories.map((category, index) => (
                                <button className='btn' key={index}>
                                    <Link>{category.title}</Link>
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div>
                    {children}
                </div>


            </div>

        </div>
    );
};

export default layout;