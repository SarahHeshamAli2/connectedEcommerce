import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../LoadingScreen/Loading";


export default function Home() {
    useEffect(()=> {
        getRandomItems()
    },[])
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
            console.log(data);
            setrandom(data.products)
            setLoading(false)
        } catch (error) {
            console.log("error",error);
        }
      }

return <>

{loading ? <Loading/> : <div className="home py-5">
    <div className="container">
    <Slider {...settings}>
  
      <div className="d-flex align-items-center p-3 slid rounded">
      <div className="mx-5">
      <h3>Sale up to 60% on games</h3>
       <button className="btn btn-outline-dark">Shop Now</button>
      </div>
      <div>
      <img src={require("../../Images/pngegg (1).png")} alt="" className="slideImg" />

      </div>
      </div>
  
      <div className="d-flex align-items-center p-3 slid rounded">
      <div className="mx-5">
      <h3>Shop your favorite sport wear</h3>
       <button className="btn btn-outline-dark">Shop Now</button>
      </div>
      <div>
      <img src={require("../../Images/pngegg (2).png")} alt="" className="slideImg" />

      </div>
      </div>
 
  
    </Slider>

    <div className="recommended my-5">
        <h1>Recommended for you</h1>
        <div className="row g-5 my-3 cursor-pointer">
            {random?.map((pro,indx)=> < div className="col-md-2 col-5 rounded" key={indx}>
               <Link to={`/proDetails/${pro._id}`}>
               
               <div className="inner">
                    <img src={pro.img} alt="" className="w-100" />
                    <h3>{pro.productName.slice(0,20)}</h3>
                    <p className="fw-bold spcColor">{pro.price} EGP</p>

                </div>
               </Link>
            </div>)}
        </div>

    </div>
    </div>
</div>}

</>
}
