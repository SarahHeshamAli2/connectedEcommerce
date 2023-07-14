import React from 'react'
import { Link } from 'react-router-dom'

export default function ThankYou() {
return <>

<div className="container w-75 my-5 py-5">
    <div className='d-flex justify-content-center'>
    <img src={require("../../Images/dev.jpg")} alt="EmptyWishList img" className='w-50'/>

    </div>

<h3 className='text-center m-0 '>Your order has been shipped.. thank you for choosing us</h3>
<Link to={"/allorders"}>

<button className=' btn btn-outline-primary d-block w-50 m-auto m-0'>all orders</button>

</Link>


  </div>
  

</>
}
