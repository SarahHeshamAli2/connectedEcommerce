import React, { useEffect, useState } from 'react'
import SignUp from './Components/SignUp/SignUp'
import{ Navigate, RouterProvider, createBrowserRouter, createHashRouter} from "react-router-dom"
import Login from './Components/Login/Login'
import Test from './Components/Test/Test'
import jwtDecode from 'jwt-decode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Loading from './Components/LoadingScreen/Loading'
import Catg from './Components/Categoires/Catg'
import CatgoriesStoreProvider from './Components/Context/CatgoriesStore'
import Products from './Components/Products/Products'
import AllProDetails from './Components/AllProductsDetails/AllProDetails'






export default function App() {

    
    useEffect(function(){


  
        if(localStorage.getItem("userToken") !=null && currentUser == null) {
        
            getUserDataDecoded()
        }
        
            },[])
        
        
    const [currentUser, setCurrentUser] = useState(null)


    function getUserDataDecoded() {
        let userToken = localStorage.getItem("userToken")
        let decodedToken = jwtDecode(userToken)
        setCurrentUser (decodedToken)
      


    }


    const router = createHashRouter ([
        {
            path:"",element:<CatgoriesStoreProvider><Layout/></CatgoriesStoreProvider>,children:[{
                path:"home",element:<Home/>
            },
            {index:true , element : <Home/>},
            {path:"login",element:<Login getUserDataDecoded={getUserDataDecoded}/>},
        {path:"allProducts/:id",element:<CatgoriesStoreProvider><AllProDetails/></CatgoriesStoreProvider>},
            {path:"resetPassword/:id" , element : <ResetPassword/>},
            {path:"register" , element : <SignUp/>},
            {path:"products" , element : <Products/>},
            {path:"categories/:id" , element : <CatgoriesStoreProvider><Catg/></CatgoriesStoreProvider>},
    
    ]
        }
       


])

   

    return <>
    
        <RouterProvider router={router}></RouterProvider>

    
    
    
    </>








}