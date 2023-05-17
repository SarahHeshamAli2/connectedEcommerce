import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../LoadingScreen/Loading"

export default function Products() {
    const [loading,setLoading] = useState(false)
    const [allProdcuts, setallProdcuts] = useState(null)
    useEffect(()=>{
        getAllProducts()
    },[])
    async function getAllProducts() {

    try {
        setLoading(true)
        const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/products`)
        setallProdcuts(data.products)
        setLoading(false)
    } catch (error) {
        console.log("error",error);
    }
    }
return <>

{loading ? <Loading/> : <div className="products my-5 ">
    <div className="container">
        <div className="row g-5">
        {allProdcuts?.map((pro,indx)=>    <div className="col-md-3 col-6" key={indx}>
        <Link  to={`/allProducts/${pro._id}`}>
        
        <div className="inn">
        <img src={pro.img} alt="au" className='w-100' style={{height:"200px"}} />
                <h4 className='mt-5'>{pro.productName}</h4>
                <h6 className=' mb-3'>{pro.description.slice(0,150)}</h6>
                <p className="fw-bold spcColor" > {pro.price} EGP</p >
        </div>

        </Link>
            </div>)}
        </div>
    </div>
</div>
}


</>
}
