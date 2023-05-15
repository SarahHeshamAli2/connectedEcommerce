import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../LoadingScreen/Loading'

export default function RandomProDetails() {
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getRandomProDetails()
    },[])
    const [proDetails, setproDetails] = useState(null)
    const {id} = useParams()

    async function getRandomProDetails() {

  try {
    setLoading(true)
    const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/products/${id}`)
    console.log(data.product);
    setproDetails(data.product)
setLoading(false)
    
  } catch (error) {
    console.log("error",error);
  }
    }
return <>

{loading ? <Loading/> :<div className="random p-4">
<div className="container">
    <div className="row align-items-center g-4">
        <div className="col-md-4 col-6">
        <div className="inn">
            <img src={proDetails?.img} alt="" className='w-100 rounded'/>
        </div>
        </div>
        <div className="col-md-7">
       
        <h2>{proDetails?.productName}</h2>
        <h3>{proDetails?.category}</h3>
        <p  className="fw-bold spcColor">{proDetails?.price} EGP</p>
        </div>
    </div>
</div>

</div>
}



</>
}
