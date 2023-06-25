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





export default function App() {
    const [googleUser, setGoogleUser] = useState(null)

    const {id} = useParams() 
    console.log(id);
    function googleDecodeToken() {
        if(id != "home" && id !=null){
            const googleUser = localStorage.setItem("googleTkn",id)
            const googleTkn = localStorage.getItem("googleTkn")
            let decodedToken = jwtDecode(googleTkn)
            setGoogleUser(decodedToken)
            console.log(decodedToken);
        } 
        


    }
 

    
    useEffect(function(){


  
        if(localStorage.getItem("userToken") !=null && currentUser == null ) {
        
            getUserDataDecoded()
        }
        if(localStorage.getItem("googleTkn") !=null && googleUser == null){
            googleDecodeToken()
        }
        
            },[])
        
        
    const [currentUser, setCurrentUser] = useState(null)
 
console.log("app");

    function getUserDataDecoded() {
        let userToken = localStorage.getItem("userToken")
        let decodedToken = jwtDecode(userToken)
        setCurrentUser (decodedToken)
        


    }

    
    function clearUserData () {
        localStorage.removeItem("userToken")
        localStorage.removeItem("decode")
        setCurrentUser(null)
        localStorage.removeItem("googleTkn")
        setGoogleUser (null)
    


    }


    const router = createHashRouter ([
        {
            path:"",element:<CatgoriesStoreProvider><Layout currentUser={currentUser} googleUser={googleUser} clearUserData={clearUserData}/></CatgoriesStoreProvider>,children:[{
                path:"home/:id",element:<Home/>
            },
            {index:"true" , element : <Home/>},
            {path:"login",element:<CatgoriesStoreProvider><Login getUserDataDecoded={getUserDataDecoded}/></CatgoriesStoreProvider>},
        {path:"allProducts/:id",element:<CatgoriesStoreProvider><AllProDetails/></CatgoriesStoreProvider>},
            {path:"reset/:id" , element : <ResetPassword/>},
            {path:"register" , element :<CatgoriesStoreProvider> <SignUp/></CatgoriesStoreProvider>},
            {path:"products" , element : <CatgoriesStoreProvider><Products/></CatgoriesStoreProvider>},
            {path:"categories/:id" , element : <CatgoriesStoreProvider><Catg/></CatgoriesStoreProvider>},
            {path:"cart" , element : <CatgoriesStoreProvider><Cart/></CatgoriesStoreProvider>},
    
    ]
        }
       


])

   

    return <>
           

        <RouterProvider router={router}></RouterProvider>
        <ToastContainer/>
    
    
    
    </>








}
