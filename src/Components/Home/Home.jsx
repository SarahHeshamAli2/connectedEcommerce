import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../LoadingScreen/Loading";
import jwtDecode from 'jwt-decode'


export default function Home() {

    useEffect(()=> {
        getRandomItems()
    },[])
const mtP = useParams()
    
    const [random, setrandom] = useState(null)
    const [loading, setLoading] = useState(false)
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }

      async function getRandomItems() {
        try {
            setLoading(true)
            const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/products/random`)
            setrandom(data.products)
            setLoading(false)
        } catch (error) {
            console.log("error",error);
        }
      }

return <>

{loading ? <Loading/> : <div className="home ">
<div class="header_section">
         <div class="container">

         </div>
         {/* <!--banner section start --> */}
         <div class="banner_section layout_padding">
         <div class="container">
                        <div class="row">
                           <div class="col-md-6">
                              <div class="taital_main my-5">
                                 <h4 class="banner_taital">Shop your favorite items!</h4>
                              <Link to={"/products"}>   <button className="btn btn-outline-light">Start Shopping !</button></Link>
                       
                              </div>
                           </div>
                           <div class="col-md-6">
                              <div><img src={require("../../Images/img-1.png")} class="image_1"/></div>
                           </div>
                        </div>
                     </div>
         </div>
         {/* <!--banner section end --> */}
      </div>
    <div className="container">
 

    <div className="recommended my-5  ">

        <h1 >Recommended for you</h1>
        <div className="row g-5 my-3 cursor-pointer ">
            {random?.map((pro,indx)=> < div className="col-md-2 col-5 rounded " key={indx}>
               <Link to={`/allProducts/${pro._id}`}>
               
               <div className="inner rounded  ">
                    <img src={pro.img} alt="" className="w-100" />
                    <h3>{pro.productName.slice(0,20)}</h3>
                    <p className="fw-bold spcColor">{pro.price} EGP</p>

                </div>
               </Link>
            </div>)}
        </div>

    </div>
    <Slider className="cursor-pointer" {...settings}>
  
      <div className="d-flex align-items-center p-3 slid rounded">
      <div className="mx-5">
      <h3>Sale up to 60% on games</h3>
       <Link  to={"/categories/game"} className="btn btn-primary text-white" >Shop Now</Link>
      </div>
      <div>

      <img src={require("../../Images/pngegg (1).png")} alt="" className="slideImg" />

      </div>
      </div>
  
      <div className="d-flex align-items-center p-3 slid rounded">
      <div className="mx-5">
      <h3>Shop your favorite sport wear</h3>
       <Link to={"/categories/sport"}  className="btn btn-primary text-white">Shop Now</Link >
      </div>
      <div>
      <img src={require("../../Images/pngegg (2).png")} alt="" className="slideImg" />

      </div>
      </div>
 
  
    </Slider>
    </div>
   
</div>}

</>
}
