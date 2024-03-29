
export const AllProducts=async()=>{
    const res=await fetch(`http://localhost:5000/products`,{
        next:{
            revalidate:5
        }
    })
    const data= await res.json()
    // console.log(data)
    return data
}