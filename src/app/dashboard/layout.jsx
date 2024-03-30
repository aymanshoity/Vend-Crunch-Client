

import Banner from '@/components/shared/Banner';
import Navbar from '@/components/shared/Navbar';




const layout = ({ children }) => {
    
    
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center ">
                {/* Page content here */}
                <Banner></Banner>
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                {/*  */}
                <Navbar></Navbar>

            </div>
        </div>
    );
};

export default layout;