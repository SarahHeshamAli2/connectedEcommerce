import React, { useContext, useEffect, useReducer, useState } from 'react'
import { categoriesStore } from '../Context/CatgoriesStore'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../LoadingScreen/Loading'

export default function Catg() {
    const {addToCart,load}= useContext(categoriesStore)
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
<div className="catgories my-5 py-5">
    <div className="container">
        <div className="row g-4">
            {catgories?.map((pro,indx)=><div className="col-md-3 col-6  position-relative hoving" key={indx}>
         
          <div className="inner dec rounded">
                <img src={pro.img} alt={pro.productName} className='w-100' style={{height:"200px"}} />
                <h4 className='mt-5'>{pro.productName.slice(0,50)}</h4>
                <p className="fw-bold spcColor" >{pro.price} EGP</p >

                </div>
          
                <div className="position-absolute shopCart rounded text-center m-auto text-white fw-bolder" >
            <Link         to={`/allProducts/${pro._id}`}
>            <button className="btn btn-primary ">View Product</button>
</Link>
            {load?<button className="btn btn-primary"><i className="fa-solid fa-spinner fa-spin  mx-2"></i></button> :            <button className="btn btn-primary mx-2" onClick={function(){addToCart(pro._id)}}>Add to cart</button>
}
        </div>
            </div>)}
        </div>
    </div>
</div>
}


</>
}
