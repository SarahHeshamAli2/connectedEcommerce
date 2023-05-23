import React, { useContext, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from "../../Images/logo.svg"


export default function Navbar({currentUser,clearUserData}) {
  const navigate = useNavigate()
  function navigateToHome() {
  clearUserData()
  navigate("/login")
  
  }

return <> 

<nav className="navbar navbar-expand-lg ">
  <div className="container-fluid px-5">
    <Link className="navbar-brand"><img src={logo} alt="website-logo" classNameName='logo' /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page"to={"/home"}>Home</Link>
        </li>
       

        <li className="nav-item">
          <Link to={"/products"} className="nav-link">Products</Link>
        </li>
        <div className="dropdown">
  <button className="btn  dropdown-toggle ctgBTN" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Categories
  </button>
  <ul className="dropdown-menu">
    <li   ><Link id='sport' className="dropdown-item categ"  to={"/categories/sport"}>sport</Link></li>
    <li><Link  className="dropdown-item categ"  to={"/categories/book"} >book</Link></li>
    <li  ><Link  className="dropdown-item categ"  to={"/categories/game"} >game</Link></li>
  </ul>
</div>
       
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        {currentUser ?      <>
        <Link to={"/cart"}>          <i className="fa-solid fa-cart-shopping fs-5 mx-3 cursor-pointer"></i>
</Link>
          <li className="nav-item">
          <span className="nav-link active cursor-pointer" aria-current="page" onClick={navigateToHome}>Sign Out </span>
        </li> 
       
        </>
        
        :    <li className="nav-item">
          <Link className="nav-link active" aria-current="page"to={"/login"}>Sign In <i className="fa-solid fa-user"></i></Link>
        </li> }
     
 

       
      </ul>
   

    </div>
  </div>
</nav>


</>
}
