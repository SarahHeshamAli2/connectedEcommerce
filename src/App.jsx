import React, { useEffect, useState } from 'react'
import SignUp from './Components/SignUp/SignUp'
import{ Navigate, RouterProvider, createBrowserRouter, createHashRouter, useParams} from "react-router-dom"
import Login from './Components/Login/Login'
import jwtDecode from 'jwt-decode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Loading from './Components/LoadingScreen/Loading'
import Catg from './Components/Categoires/Catg'
import CatgoriesStoreProvider from './Components/Context/CatgoriesStore'
import Products from './Components/Products/Products'
import AllProDetails from './Components/AllProductsDetails/AllProDetails'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Components/Cart/Cart'
import WishList from './Components/WishList/WishList'
import GoogleUser from './Components/GoogleUser/GoogleUser'
import CheckOut from './Components/CheckOut/CheckOut'
import ThankYou from './Components/ThankYou/ThankYou'
import AllOrders from './Components/AllOrders/AllOrder'





export default function App() {


 

    
    useEffect(function(){


  
        if(localStorage.getItem("userToken") !=null && currentUser == null ) {
        
            getUserDataDecoded()
        }
       
            },[])
        
        
    const [currentUser, setCurrentUser] = useState(null)
    const [googleUser , setGoogleUser] = useState(null)
 

    function getUserDataDecoded() {
        let userToken = localStorage.getItem("userToken")
        let decodedToken = jwtDecode(userToken)
        setCurrentUser (decodedToken)
        console.log(currentUser);
        


    }

    
    function clearUserData () {
        localStorage.removeItem("userToken")
        localStorage.removeItem("decode")
        setCurrentUser(null)
 
    


    }

    function clearGoogleUser () {
        localStorage.removeItem("googleToken")
        setGoogleUser(null)
    }
    function googleUserDecoded() {
        let googleUser = localStorage.getItem("googleToken")
        let decodedToken = jwtDecode(googleUser)
        setGoogleUser (decodedToken)
        console.log(googleUser);
    }

    const router = createHashRouter ([
        {
            path:"",element:<CatgoriesStoreProvider><Layout currentUser={currentUser} clearGoogleUser ={clearGoogleUser} googleUser={ googleUser}  clearUserData={clearUserData}/></CatgoriesStoreProvider>,children:[{
                path:"home/:id",element: <CatgoriesStoreProvider><Home /></CatgoriesStoreProvider>
            },
            {index:"true" , element :  <CatgoriesStoreProvider><Home /></CatgoriesStoreProvider>},
            {path:"login",element:<CatgoriesStoreProvider><Login getUserDataDecoded={getUserDataDecoded}/></CatgoriesStoreProvider>},
        {path:"allProducts/:id",element:<CatgoriesStoreProvider><AllProDetails/></CatgoriesStoreProvider>},
            {path:"reset/:id" , element : <ResetPassword/>},
            {path:"googleuser/:id" , element : <GoogleUser googleUserDecoded = {googleUserDecoded}/>},
            {path:"checkout" , element : <CheckOut/>},
            {path:"thank" , element : <ThankYou/>},
            {path:"allorders" , element : <AllOrders/>},
            {path:"register" , element :<CatgoriesStoreProvider> <SignUp/></CatgoriesStoreProvider>},
            {path:"products" , element : <CatgoriesStoreProvider><Products/></CatgoriesStoreProvider>},
            {path:"categories/:id" , element : <CatgoriesStoreProvider><Catg/></CatgoriesStoreProvider>},
            {path:"cart" , element : <CatgoriesStoreProvider><Cart/></CatgoriesStoreProvider>},
            {path:"wishlist" , element : <CatgoriesStoreProvider><WishList/></CatgoriesStoreProvider>},
    
    ]
        }
       


])

   

    return <>
           

        <RouterProvider router={router}></RouterProvider>
        <ToastContainer/>
    
    
    
    </>








}
