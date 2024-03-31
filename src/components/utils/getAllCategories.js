export const AllCategories=async(category)=>{
    const res=await fetch(`http://localhost:5000/products/${category}`,{
        next:{
            revalidate:5
        }
    })
    const data= await res.json()
    // console.log(data)
    return data
}