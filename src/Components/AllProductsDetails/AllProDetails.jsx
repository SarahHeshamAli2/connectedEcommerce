import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../LoadingScreen/Loading"
import { categoriesStore } from "../Context/CatgoriesStore"

export default function AllProDetails() {
     const {id} = useParams()
    const { getRandomProDetails,proDetails,loading} = useContext(categoriesStore)
    useEffect(()=>{
        getRandomProDetails(id)
    },[])
 return <>
 
 
 {loading ? <Loading/> :<div className="random p-4 my-5">
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
        <h3>{proDetails?.description.slice(0,240)}</h3>
        <p  className="fw-bold spcColor">{proDetails?.price} EGP</p>
        </div>
    </div>
</div>

</div>
}
 
 
 
 
 </>
}
