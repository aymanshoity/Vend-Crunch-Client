
import { AllFeedbacks } from "@/components/utils/getAllFeedbacks";


const CustomersFeedbacks = async() => {
    
    const {data:feedbacks}=await AllFeedbacks()
    console.log(feedbacks)
    return (
        <div>
            <h1>Lets see the feedbacks {feedbacks?.userName}</h1>
        </div>
    );
};

export default CustomersFeedbacks;