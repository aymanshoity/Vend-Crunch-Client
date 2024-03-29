
import CategoryList from "@/components/ui/CategoryList/CategoryList";
const layout = ({ children }) => {
    return (
        <div>
            <div>
                <CategoryList></CategoryList>
            </div>
            <div>
                {children}
            </div>
        </div>



    );
};

export default layout;