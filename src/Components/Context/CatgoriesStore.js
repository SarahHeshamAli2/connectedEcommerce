import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import $ from "jquery"
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
export const categoriesStore = createContext()



export default function CatgoriesStoreProvider({children}) {


  const notify = () => toast("Product added successfully to cart");
const [cartProducts, setcartProducts] = useState(null)
    const [loading, setLoading] = useState(false)
  const [load , setLoad] = useState (false)
  const [loader , setLoader] = useState (false)
const [cartQuantity,setCartQuantity] = useState(null)
    const [proDetails, setproDetails] = useState(null)
    const [totalCartPrice, setTotalCartPrice] = useState(null)
    const [wishListPro, setWishListPro] = useState(null)
    const [productReviews, setProductReview] = useState(null)


const navigate = useNavigate()
function navigateToLogin () {
  toast.error("please login in first" )
  navigate("/login")

}
    async function getRandomProDetails(id) {

  try {
    setLoading(true)
    const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/products/${id}`)
    setproDetails(data.product)
    console.log(data.product);
    setProductReview(data.product.reviews)
setLoading(false)
    
  } catch (error) {
    console.log("error",error);
  }
    }


    async function getCartProducts()
    {
      setLoad(true)

        try {
          const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/cart/`,{
            headers: {
              Authorization: "Bearer "+ localStorage.getItem("userToken"),
            }
            
          })
          setcartProducts(data.cart)
          setLoad(false)
          setCartQuantity(data.cart.quantity)
          setTotalCartPrice(data.price)
          console.log(data);
          
        } catch (error) {
          console.log("error",error);
          navigateToLogin()
          setLoad(false)
        }
    }
    async function getGoogleCart()
    {
      setLoad(true)

        try {
          const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/cart/`,{
            headers: {
              Authorization: "Bearer "+ localStorage.getItem("googleToken"),
            }
            
          })
          setcartProducts(data.cart)
          setLoad(false)
          setCartQuantity(data.cart.quantity)
          setTotalCartPrice(data.price)
          console.log(data);
          
        } catch (error) {
          console.log("error",error);
          navigateToLogin()
          setLoad(false)
        }
    }
    async function getWishList()
    {
      setLoading(true)

        try {
          const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/profile/wishlist`,{
            headers: {
              Authorization: "Bearer "+ localStorage.getItem("userToken"),
            }
            
          })
          setWishListPro(data.wishList)
          setLoading(false)
          setCartQuantity(data.wishList.quantity)
          setTotalCartPrice(data.price)
          console.log(data.wishList);
          
        } catch (error) {
          console.log("error",error);
          navigateToLogin()
          setLoading(false)
        }
    }
    async function getGoogleWishList()
    {
      setLoading(true)

        try {
          const {data} = await axios.get(`https://e-commerce-9w3i.onrender.com/api/v1/profile/wishlist`,{
            headers: {
              Authorization: "Bearer "+ localStorage.getItem("googleToken"),
            }
            
          })
          setWishListPro(data.wishList)
          setLoading(false)
          setCartQuantity(data.wishList.quantity)
          setTotalCartPrice(data.price)
          console.log(data.wishList);
          
        } catch (error) {
          console.log("error",error);
          navigateToLogin()
          setLoading(false)
        }
    }
    async function addToCart (prodId) {

      try {
        setLoad(true)
          const {data} = await axios.post(`https://e-commerce-9w3i.onrender.com/api/v1/cart`,{
              "product" : prodId,
              "quantity" : 1
            
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
        
      setLoad(false)
      setCartQuantity(data.cart.quantity)
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
    async function googleAddToCart (prodId) {

      try {
        setLoad(true)
          const {data} = await axios.post(`https://e-commerce-9w3i.onrender.com/api/v1/cart`,{
              "product" : prodId,
              "quantity" : 1
            
          },{      headers: {
              Authorization: "Bearer "+ localStorage.getItem("googleToken"),
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
        
      setLoad(false)
      setCartQuantity(data.cart.quantity)
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
      
    async function addToWishList (prodId) {
      setLoader(true)

      try {
          const {data} = await axios.post(`https://e-commerce-9w3i.onrender.com/api/v1/profile/wishlist`,{
              "product" : prodId
              
            
          },{      headers: {
              Authorization: "Bearer "+ localStorage.getItem("userToken"),
            }})
            if(data.status === "sucess") {
              setWishListPro(data.wishList)
              $(".wishlistAdd").fadeIn(500,function(){
                setTimeout(() => {
                  $(".wishlistAdd").fadeOut(1000)
                }, 1000);
              })
            } 
            setLoader(false)

      console.log(data.wishList);

      
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
        setLoader(false)

      console.log("error",error);  

      }
      }
    async function addGoogleWishList (prodId) {
      setLoader(true)

      try {
          const {data} = await axios.post(`https://e-commerce-9w3i.onrender.com/api/v1/profile/wishlist`,{
              "product" : prodId
              
            
          },{      headers: {
              Authorization: "Bearer "+ localStorage.getItem("googleToken"),
            }})
            if(data.status === "sucess") {
              setWishListPro(data.wishList)
              $(".wishlistAdd").fadeIn(500,function(){
                setTimeout(() => {
                  $(".wishlistAdd").fadeOut(1000)
                }, 1000);
              })
            } 
            setLoader(false)

      console.log(data.wishList);

      
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
        setLoader(false)

      console.log("error",error);  

      }
      }
      

async function deleteCartItem(id) {
try {
  const {data} =  await axios.delete(`https://e-commerce-9w3i.onrender.com/api/v1/cart/${id}`,{
    headers: {
      Authorization: "Bearer "+ localStorage.getItem("userToken"),
    }


  })
  if(data.status=="Deleted successfully") {
    console.log(data);

setcartProducts(data.cart)
toast.error("item deleted from cart", {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light"

})
  }
} catch (error) {
  console.log("error",error);
  toast.warn("something went wrong please try again")
}
 }
async function deleteGoogleCartItem(id) {
try {
  const {data} =  await axios.delete(`https://e-commerce-9w3i.onrender.com/api/v1/cart/${id}`,{
    headers: {
      Authorization: "Bearer "+ localStorage.getItem("googleToken"),
    }


  })
  if(data.status=="Deleted successfully") {
    console.log(data);

setcartProducts(data.cart)
toast.error("item deleted from cart", {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light"

})
  }
} catch (error) {
  console.log("error",error);
  toast.warn("something went wrong please try again")
}
 }
async function deleteFromWishlist(id) { 
try {
  const {data} =  await axios.delete(`https://e-commerce-9w3i.onrender.com/api/v1/profile/wishlist/${id}` ,{
    headers: {
      Authorization: "Bearer "+ localStorage.getItem("userToken"),
    } 


  })
  if(data.status == "success") {

setWishListPro(data.wishList)
console.log(data.wishList);
toast.error("item deleted from wishList", {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light"

})
  }
} catch (error) {
  console.log("error",error);
  toast.warn("something went wrong please try again")
}
 }
async function deleteFromGoogleWishList(id) { 
try {
  const {data} =  await axios.delete(`https://e-commerce-9w3i.onrender.com/api/v1/profile/wishlist/${id}` ,{
    headers: {
      Authorization: "Bearer "+ localStorage.getItem("googleToken"),
    } 


  })
  if(data.status == "success") {

setWishListPro(data.wishList)
console.log(data.wishList);
toast.error("item deleted from wishList", {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light"

})
  }
} catch (error) {
  console.log("error",error);
  toast.warn("something went wrong please try again")
}
 }


////////////

// async function deleteItemFromWishList(id) {

// const {data} = await axios.delete("https://e-commerce-9w3i.onrender.com/api/v1/profile/wishlist" , {
//   "product" : id
// } , {
//   headers: {
//     Authorization: "Bearer "+ localStorage.getItem("userToken"),
//   }

// }) 
// if(data.status == "success") {
//   console.log(data);
// }

// }


async function emptyYourCart() {

try {
  const response = await axios.delete(`https://e-commerce-9w3i.onrender.com/api/v1/cart/`,{
  headers: {
    Authorization: "Bearer "+ localStorage.getItem("userToken"),
  }
})
if(response.status == 204) {
  toast.error("all items are deleted from cart!",{

    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"

  })
  setcartProducts([])

}

} catch (error) {
  console.log("error",error);
  toast.error("something went wrong please try again!")
}

}
async function emptyGoogleCart() {

try {
  const response = await axios.delete(`https://e-commerce-9w3i.onrender.com/api/v1/cart/`,{
  headers: {
    Authorization: "Bearer "+ localStorage.getItem("googleToken"),
  }
})
if(response.status == 204) {
  toast.error("all items are deleted from cart!",{

    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"

  })
  setcartProducts([])

}

} catch (error) {
  console.log("error",error);
  toast.error("something went wrong please try again!")
}

}

async function updateCartItemsQuantity(id,count) {
  setLoading(true)
  try {
    const {data} = await axios.patch(`https://e-commerce-9w3i.onrender.com/api/v1/cart/${id}`,{
    "quantity" : count
    
  },
  {      headers: {
    Authorization: "Bearer "+ localStorage.getItem("userToken"),
  }}
  
  
  )
  if(data.status === "success") {
 console.log(data);
setcartProducts(data.cart)
setTotalCartPrice(data.price)
  }
setLoading(false)
} catch (error) {
    console.log("error",error);
    toast.error("the amount you added is succeed the amount in stock!"  )
  }
  
  
  }
async function updateGoogleCartItemsQuantity(id,count) {
  setLoading(true)
  try {
    const {data} = await axios.patch(`https://e-commerce-9w3i.onrender.com/api/v1/cart/${id}`,{
    "quantity" : count
    
  },
  {      headers: {
    Authorization: "Bearer "+ localStorage.getItem("googleToken"),
  }}
  
  
  )
  if(data.status === "success") {
 console.log(data);
setcartProducts(data.cart)
setTotalCartPrice(data.price)
  }
setLoading(false)
} catch (error) {
    console.log("error",error);
    toast.error("the amount you added is succeed the amount in stock!"  )
  }
  
  
  }



 return <categoriesStore.Provider value={{getRandomProDetails,proDetails,loading,addToCart,load,getCartProducts,cartProducts,deleteCartItem,emptyYourCart,cartQuantity,updateCartItemsQuantity,totalCartPrice,addToWishList,loader,wishListPro,getWishList,deleteFromWishlist,googleAddToCart,getGoogleCart,deleteGoogleCartItem,emptyGoogleCart,addGoogleWishList,getGoogleWishList,deleteFromGoogleWishList,updateGoogleCartItemsQuantity,productReviews}}>



{children}



 </categoriesStore.Provider>
 
 

}
