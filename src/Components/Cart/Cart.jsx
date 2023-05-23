import React, { useContext, useEffect } from 'react'
import { categoriesStore } from '../Context/CatgoriesStore'

export default function Cart() {
    const { getCartProducts,cartProducts} = useContext(categoriesStore)
useEffect(()=>{
    getCartProducts()
},[])
return <>

<div className="cart py-5">
    <div className="container-fluid">
        <h3 >
            Shopping Cart
        </h3>
        {cartProducts?.map((pro)=>     <div className="row my-5">
            <div className="col-md-1 col-3">
                <img src={pro.product.img} className='w-100' alt="" />
            </div>
            <div className="col-md-9 border-bottom">
                <h5>{pro.product.productName}</h5>
                <h6  className="fw-bold spcColor"> {pro.product.price} EGP</h6>
                <div className='d-flex justify-content-between'>
                <h6>Qty:{pro.product.quantity}</h6>
                <button className='btn btn-danger'>Remove Item from cart</button>

                </div>
            </div>
        </div>)}
   
    </div>
</div>

</>
}
