import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const categoriesStore = createContext()



export default function CatgoriesStoreProvider({children}) {




  const notify = () => toast("Product added successfully to cart");
const [cartProducts, setcartProducts] = useState(null)
    const [loading, setLoading] = useState(false)
  const [load , setLoad] = useState (false)

    const [proDetails, setproDetails] = useState(null)

    async function getRandomProDetails(id) {

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
    async function getCartProducts()
    {
   const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/cart/`,{
     headers: {
       Authorization: "Bearer "+ localStorage.getItem("userToken"),
     }
     
   })
   setcartProducts(data.cart)
   console.log(data);
   
    }
    async function addToCart (prodId) {

      try {
        setLoad(true)
          const {data} = await axios.post(`https://e-commerce-9w3i.onrender.com/api/v1/cart`,{
              "product" : prodId
          },{      headers: {
              Authorization: "Bearer "+ localStorage.getItem("userToken"),
            }})
            if(data.status === "success") {
              toast.success("Product added successfully to your cart",{position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"})
            }
          console.log(data);
      setLoad(false)
      
      } catch (error) {
        toast.error("You must log in first", {
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
      









 return <categoriesStore.Provider value={{getRandomProDetails,proDetails,loading,addToCart,load,getCartProducts,cartProducts}}>



{children}



 </categoriesStore.Provider>
 
 

}
