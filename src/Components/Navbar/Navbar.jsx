import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../Images/logo.svg"

export default function Navbar() {
return <>
<nav class="navbar navbar-expand-lg ">
  <div class="container-fluid px-5">
    <Link class="navbar-brand"><img src={logo} alt="website-logo" className='logo' /></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page"to={"/home"}>Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" >Cart</Link>
        </li>
     
        <li class="nav-item">
          <Link class="nav-link">Products</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link">Categories</Link>
        </li>
       
      </ul>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page"to={"/login"}>Sign In <i class="fa-solid fa-user"></i></Link>
        </li>

       
      </ul>
   

    </div>
  </div>
</nav>


</>
}
