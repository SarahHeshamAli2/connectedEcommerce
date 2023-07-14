import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyWishList() {
return <>



<div className="container w-75">
    <div className='d-flex justify-content-center'>
    <img src={require("../../Images/flat-design-santa-letter-template-design_52683-97636.webp")} alt="EmptyWishList img" className='w-50'/>

    </div>

<h3 className='text-center m-0 '>Looks Like your wishlist is empty!</h3>
<Link to={"/products"}>

<button className=' btn btn-outline-primary d-block w-50 m-auto m-0'>start shopping</button>

</Link>


  </div>
  



</>
}
