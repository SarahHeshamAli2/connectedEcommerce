import React, { useContext, useEffect } from 'react'
import { categoriesStore } from '../Context/CatgoriesStore'
import Loading from '../LoadingScreen/Loading'
import EmptyWishList from '../EmptyWishList/EmptyWishList'

export default function WishList() {
    useEffect(()=>{

  if(localStorage.getItem("userToken") !=null ) {
    getWishList()

  } 
  if(localStorage.getItem("googleToken") !=null) {
    getGoogleWishList()
  }
    },[])
    
    const {loading,wishListPro,getWishList,addToCart,load,loader,deleteFromWishlist,getGoogleWishList,deleteFromGoogleWishList,googleAddToCart} = useContext(categoriesStore)

    function deleteAllFromWishList(id) {
        
  if(localStorage.getItem("userToken") !=null ) {
    deleteFromWishlist(id)

  } 
  if(localStorage.getItem("googleToken") !=null) {
    deleteFromGoogleWishList(id)
  }
    }


    function addingTest(id) {
        if(localStorage.getItem("userToken" !=null)) {
            addToCart(id)
    
        }
        console.log("extraNew");
        if(localStorage.getItem("googleToken") !=null) {
            googleAddToCart(id)
        }
    }
return <>
{loading? <Loading/> : <div className='wishList container my-5 py-5'>
    {wishListPro?.length == 0 ?  <EmptyWishList/>: <div className="row g-4">
    {wishListPro?.map((pro,ind)=>     <div key={ind} className="col-md-3">
            <div className="innerCol">
            <img style={{height:"250px"}} src={pro.img} alt="" className='w-75' />
            <h5>{pro.productName}</h5>
            <h6  className="fw-bold spcColor"> {pro.price} EGP</h6>
            <button className='btn btn-outline-primary my-3' onClick={function(){addingTest(pro._id)}}>Add to Cart</button>
            <button className='btn btn-outline-danger  d-block' onClick={function(){deleteAllFromWishList(pro._id)}}>Delete from wishlist</button>

        </div>
     
    </div>)}

</div> }



</div>}

       

</>


}
