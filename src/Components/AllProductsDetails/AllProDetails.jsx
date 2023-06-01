import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../LoadingScreen/Loading"
import { categoriesStore } from "../Context/CatgoriesStore"
import $ from "jquery"
export default function AllProDetails() {
    const userToken = localStorage.getItem("userToken")
     const {id} = useParams()
    const { getRandomProDetails,proDetails,loading,addToCart,load} = useContext(categoriesStore)
    
    useEffect(()=>{

        getRandomProDetails(id)
    
    },[])



 return <>
 
 
 {loading ? <Loading/> :<div className="random my-5 py-5">
<div className="container">
    <div className="row align-items-center g-4 px-5">
        <div className="col-md-4 col-6">
        <div className="inn">
            <img src={proDetails?.img} alt="" className='w-75 rounded'/>
        </div>
        </div>
        <div className="col-md-7">
       
        <h2>{proDetails?.productName}</h2>
        <h3>{proDetails?.category}</h3>
        <h3>{proDetails?.description.slice(0,240)}</h3>
        <p  className="fw-bold spcColor">{proDetails?.price} EGP</p>
        <p>Quantity : <span className="fw-bolder"> {proDetails?.quantity}</span> in stock</p>
    {load ? <button className="btn btn-outline-primary"><i className="fa-solid fa-spinner fa-spin  mt-3"></i></button> : <button className="btn btn-outline-primary w-25" onClick={function(){addToCart(id)}}>Add to cart</button> }
        </div>
    </div>
</div>

</div>
}
 
 
 
 
 </>
}
