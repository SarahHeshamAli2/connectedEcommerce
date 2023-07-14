import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout({currentUser,clearUserData,googleUser,clearGoogleUser}) {
return<>



<Navbar currentUser={currentUser} googleUser={googleUser} clearGoogleUser={clearGoogleUser} clearUserData={clearUserData}/>
<Outlet/>
<Footer/>
</>
}
