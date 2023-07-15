import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../LoadingScreen/Loading"
import { categoriesStore } from "../Context/CatgoriesStore"
import $ from "jquery"
import { toast } from "react-toastify"
export default function AllProDetails() {
    const userToken = localStorage.getItem("userToken")
     const {id} = useParams()
    const { getRandomProDetails,proDetails,loading,addToCart,load,addToWishList,loader,googleAddToCart,addGoogleWishList,productReviews} = useContext(categoriesStore)
    
    useEffect(()=>{

        getRandomProDetails(id)
    
    },[])


  async function addingTest(id) {
    if(localStorage.getItem("userToken")) {
         await addToCart(id)
    }
    else if( localStorage.getItem("googleToken")) {
        await googleAddToCart(id)
    }
    else {
        toast.error("please log in to add to your cart")
    }
  }  

async function addAllToWishList(id) {
    if(localStorage.getItem("userToken")) {
        addToWishList(id)

    }
    else if(localStorage.getItem("googleToken") ) {
        addGoogleWishList(id)
    } 
    else{
        toast.error("please log in to add to your wishlist")
    }
  
}
function toggleProductReview() {
    $(".productReview").show()
    $(".reviewBtn").hide()
    $(".hidereviewBtn").show()

}
function hideReviews() {
    $(".productReview").hide()
    $(".hidereviewBtn").hide()
    $(".reviewBtn").show()



}
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
    {load ? <button className="btn btn-outline-primary"><i className="fa-solid fa-spinner fa-spin  mt-3"></i></button> : <button className="btn btn-outline-primary w-25" onClick={function(){addingTest(id)}}>Add to cart</button> }
    {loader ?<button className="btn btn-outline-primary d-block"><i className="fa-solid fa-spinner fa-spin  mt-3"></i></button> :    <button onClick={function(){addAllToWishList(id)}} className="btn btn-outline-primary d-block my-3 wishListBtn">Add to wishlist <i className="fa-regular fa-heart"></i></button>
}
    <div className="wishlistAdd" style={{display:"none"}}>
    <i className="fa-solid fa-heart text-danger" >item added to wishList!</i>
    </div>
        </div>
    </div>
    <button onClick={toggleProductReview} className="btn btn-outline-primary reviewBtn my-3">Show product reviews</button>
    <button onClick={hideReviews}  className="btn btn-outline-primary hidereviewBtn my-3" style={{display:"none"}}>hide product reviews</button>
    <div className="productReview my-3 p-3 rounded" style={{display:"none"}}>
        
        {productReviews?.length ==0 ? <h3>This product does not have any reviews yet !</h3> : <>        <h3> {productReviews?.length} Customer reviews</h3>
        {productReviews?.map((review)=>       <div className="review">
            <p className="fw-bold p-3 text-muted">{review}</p>
            <hr />
        </div>)}</>}

  
    </div>
</div>

</div>
}
 
 
 
 
 </>
}
