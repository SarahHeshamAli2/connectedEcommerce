import React, { useContext, useEffect } from 'react'
import { categoriesStore } from '../Context/CatgoriesStore'
import { useParams } from 'react-router-dom'
import Loading from '../LoadingScreen/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'
import $ from "jquery"

export default function Review() {
    useEffect(()=>{

        getRandomProDetails(id)
    
    },[])

    const { getRandomProDetails,proDetails,loading} = useContext(categoriesStore)
    const [value, setValue] = React.useState("");
    const [load, setLoad] = React.useState(false);

    const {id} = useParams()
    function handleChange(e) {
        setValue(e.target.value);
      }

  
      async function writeProductReview() {
        try {
            setLoad(true)
              const {data} = await axios.post(`https://e-commerce-9w3i.onrender.com/api/v1/review/`,{
                  "product" : id,
                  "review" : document.getElementById("exampleFormControlTextarea1").value
                
              },{      headers: {
                  Authorization: "Bearer "+ localStorage.getItem("userToken"),
                }})
                if(data.status === "success") {
                  toast.success("Your review is added !",{position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light"})

                } 
                        
                setValue("")
                setLoad(false)
          console.log(data);
         
    
          
          } catch (error) {
            toast.error(error?.response?.data?.message, {
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
    
            })
            setLoad(false)
          console.log("error",error);  
    
          }
      }
    
      async function GooglewriteProductReview() {
        try {
            setLoad(true)
              const {data} = await axios.post(`https://e-commerce-9w3i.onrender.com/api/v1/review/`,{
                  "product" : id,
                  "review" : document.getElementById("exampleFormControlTextarea1").value
                
              },{      headers: {
                  Authorization: "Bearer "+ localStorage.getItem("googleToken"),
                }})
                if(data.status === "success") {
                  toast.success("Your review is added !",{position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light"})

                } 
                        
                setValue("")
                setLoad(false)
          console.log(data);
         
    
          
          } catch (error) {
            toast.error(error?.response?.data?.message, {
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
    
            })
            setLoad(false)
          console.log("error",error);  
    
          }
      }
      async function writeRev() {
        if(localStorage.getItem("userToken") ) {
            await writeProductReview()
           }
           else if (localStorage.getItem("googleToken")) {
             await GooglewriteProductReview()
           }
      }
    
  return <>
  
  {loading ? <Loading/> :<div className="random my-5 py-5">
<div className="container">
    <div className="row align-items-center g-4 px-5">
        <div className="col-md-2 col-4">
        <div className="inn">
            <img src={proDetails?.img} alt="" className='w-75 rounded'/>
        </div>
        </div>
        <div className="col-md-7">
       
        <h2>{proDetails?.productName}</h2>
        <p>Quantity : <span className="fw-bolder"> {proDetails?.quantity}</span> in stock</p>

        </div>
        <hr />
        <div className="writeReview">
            <h5>Write product review</h5>
            <div class="form-group">
    <textarea  class="form-control" value={value} onChange={handleChange} placeholder='How was your experience with the product ?' id="exampleFormControlTextarea1" rows="5"></textarea>
    {load ? <button type='button' className="btn btn-outline-primary"><i className="fa-solid fa-spinner fa-spin  mx-2"></i></button>  :     <button className='btn btn-primary my-2 reviewBtn' onClick={GooglewriteProductReview} disabled={!value}>Submit review</button>
}
  </div>
        </div>
    </div>
</div>

</div>
}
  </>
}
