import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../Images/logo.svg"
import { categoriesStore } from '../Context/CatgoriesStore'
import $ from "jquery"

export default function Navbar() {

return <> 

<nav className="navbar navbar-expand-lg ">
  <div className="container-fluid px-5">
    <Link className="navbar-brand"><img src={logo} alt="website-logo" classNameName='logo' /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page"to={"/home"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" >Cart</Link>
        </li>

        <li className="nav-item">
          <Link to={"/products"} className="nav-link">Products</Link>
        </li>
        <div className="dropdown">
  <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Categories
  </button>
  <ul className="dropdown-menu">
    <li   ><Link id='sport' className="dropdown-item categ"  to={"/categories/sport"}>sport</Link></li>
    <li><Link  className="dropdown-item categ"  to={"/categories/book"} >book</Link></li>
    <li  ><Link  className="dropdown-item categ"  to={"/categories/game"} >game</Link></li>
  </ul>
</div>
       
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page"to={"/login"}>Sign In <i className="fa-solid fa-user"></i></Link>
        </li>

       
      </ul>
   

    </div>
  </div>
</nav>


</>
}
