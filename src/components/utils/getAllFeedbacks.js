
export const AllFeedbacks=async()=>{
    const res=await fetch(`http://localhost:5000/feedbacks`)
    
    const data =await res.json() 
    return  data
}