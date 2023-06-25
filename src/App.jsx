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


 

    
    useEffect(function(){


  
        if(localStorage.getItem("userToken") !=null && currentUser == null ) {
        
            getUserDataDecoded()
        }
       
            },[])
        
        
    const [currentUser, setCurrentUser] = useState(null)
 

    function getUserDataDecoded() {
        let userToken = localStorage.getItem("userToken")
        let decodedToken = jwtDecode(userToken)
        setCurrentUser (decodedToken)
        


    }

    
    function clearUserData () {
        localStorage.removeItem("userToken")
        localStorage.removeItem("decode")
        setCurrentUser(null)
 
    


    }


    const router = createHashRouter ([
        {
            path:"",element:<CatgoriesStoreProvider><Layout currentUser={currentUser}  clearUserData={clearUserData}/></CatgoriesStoreProvider>,children:[{
                path:"home/:id",element: <CatgoriesStoreProvider><Home /></CatgoriesStoreProvider>
            },
            {index:"true" , element :  <CatgoriesStoreProvider><Home /></CatgoriesStoreProvider>},
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
