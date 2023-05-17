import React, { useContext, useEffect, useReducer, useState } from 'react'
import { categoriesStore } from '../Context/CatgoriesStore'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../LoadingScreen/Loading'

export default function Catg() {
    const id =useParams()
    const myId = id.id

    useEffect(()=>{
        getCatgories()
      
    },[id])


    const [catgories, setcatgories] = useState(null)
    const [loading, setLoading] = useState(false)


    async function getCatgories() {

        try {
                setLoading(true)
            const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/products/category/${myId}`)
       
            setcatgories(data.products)
            setLoading(false)
        } catch (error) {
            console.log("error",error);
        }


    }

return <>
{loading ? <Loading/> : 
<div className="catgories my-5">
    <div className="container">
        <div className="row g-4">
            {catgories?.map((pro,indx)=><div className="col-md-3 col-6" key={indx}>
          <Link to={`/allProducts/${pro._id}`}>
          <div className="inner">
                <img src={pro.img} alt={pro.productName} className='w-100' style={{height:"200px"}} />
                <h4 className='mt-5'>{pro.productName}</h4>
                <h6 className=' mb-3'>{pro.description.slice(0,150)}</h6>
                <p className="fw-bold spcColor" >{pro.price} EGP</p >

                </div>
          
          </Link>
            </div>)}
        </div>
    </div>
</div>
}


</>
}
