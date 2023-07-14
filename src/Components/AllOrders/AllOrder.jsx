import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../LoadingScreen/Loading';
import EmptyCart from '../EmptyCartImg/EmptyCart';
import { Link } from 'react-router-dom';

export default function AllOrders({currentUser}) {
const [allOrder, setallOrder] = useState(null)
const [loading, setloading] = useState(false)

useEffect(()=>{
   getAllOrders()
},[])



    async function getAllOrders () {


try {
    setloading(true)
    const {data}= await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/profile/orders`,{
        headers: {
            Authorization: "Bearer "+ localStorage.getItem("userToken"),
          }
    })
    setallOrder(data.orders)
    console.log(data.orders);
    setloading(false)
    
} catch (error) {
    console.log("error" , error);
    setloading(false)
}        
    }
return <> 
{loading ? <Loading/> : <div className='my-5 py-5 container'>
{allOrder?.map((order,ind)=> <div className="row g-5 align-items-center border border-1 my-2 rounded-1" key={ind}>
<div className="col-md-3">
    <div className="inner-col">
        <p>Placed On: <span className='mx-2 fw-bolder'>{order.createdAt}</span></p>
        <p>Total price: <span className='mx-2  fw-bolder'> {order.total_price}</span> EGP</p>
        <span>Payment method : <span className='mx-2  fw-bolder'>Visa</span></span>

    </div>
</div>
{
    order.products.map((item,spc)=> <div className="col-md-2 col-6" key={spc}>
        <Link to={`/allProducts/${item.product._id}`}>
        <div className="inner d-flex align-items-center">
        <div>
        <img src={item.product.img} alt="" className='w-100 '/>
        </div>
        <div className='mx-2'>
            <h5 className='p-item'>{item.product.productName.slice(0,15)}</h5>
            <h5 className='small spcColor'>{item.product.price} LE</h5>
        </div>
    </div>
        
        </Link>
</div>)
}
</div>)}


</div>}




</>
}
