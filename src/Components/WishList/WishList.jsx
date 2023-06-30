import React, { useContext, useEffect } from 'react'
import { categoriesStore } from '../Context/CatgoriesStore'
import Loading from '../LoadingScreen/Loading'
import EmptyWishList from '../EmptyWishList/EmptyWishList'

export default function WishList() {
    useEffect(()=>{
getWishList()

    },[])
    const {loading,wishListPro,getWishList,addToCart,load,loader,deleteFromWishlist} = useContext(categoriesStore)
return <>
{loading? <Loading/> : <div className='wishList container my-5 py-5'>
<div className="row g-4">
    {wishListPro?.map((pro,ind)=>     <div key={ind} className="col-md-3">
        {wishListPro?.length == 0 ? console.log("empty") :    <div className="innerCol">
            <img style={{height:"250px"}} src={pro.img} alt="" className='w-75' />
            <h5>{pro.productName}</h5>
            <h6  className="fw-bold spcColor"> {pro.price} EGP</h6>
            <h6  className="fw-bold spcColor"> {pro._id} EGP</h6>
            <button className='btn btn-outline-primary my-3' onClick={function(){addToCart(pro._id)}}>Add to Cart</button>
            <button className='btn btn-outline-primary my-3' onClick={function(){deleteFromWishlist(pro._id)}}>Delete from wishlist</button>

        </div>}
     
    </div>)}

</div>


</div>}

       

</>


}
