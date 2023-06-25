import axios from 'axios'
import { useFormik } from 'formik'
import React, {  useState } from 'react'
import $ from "jquery"
import { Link, useNavigate } from 'react-router-dom'


import * as Yup from "yup"
import { toast } from 'react-toastify'
import { categoriesStore } from '../Context/CatgoriesStore'
export default function SignIn({getUserDataDecoded}) {
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
   async function signIn(value){
  try {
    setisLoading(true)
    const {data} = await axios.post(`https://e-commerce-9w3i.onrender.com/api/v1/auth/login`,value)
    console.log(data);
    if(data.status=="success") {
      localStorage.setItem("userToken" , data.token)
      $(".fa-check").fadeIn(500)
      $(".successMsg").fadeIn(500, function() {
        setTimeout(() => {
          getUserDataDecoded()
          navigate("/home")
        }, 500);
      })
       

       }

    setisLoading(false)

  } catch (error) {
    console.log("error",error);

    setisLoading(false)
    toast.error("invalid email or password")
 
  }
  }

 function toForgotPassword() {
    $(".inner-signUp").fadeOut(500,function(){

      setTimeout(() => {
        $(".forgot").fadeIn(500)
      }, 500);
    })
  
     
  }

  function hideForgotPass()
 {


  $(".forgot").fadeOut(1 , function() {
    setTimeout(() => {
      $(".inner-signUp").fadeIn(500)
    }, 500);

  })



 }
  async function forgotPass() {
    try {
      
      setisLoading(true)
      const {data} = await axios.post (`https://e-commerce-9w3i.onrender.com/api/v1/auth/forgotPassword` , {
      
    
      "email": document.querySelector(".forgotEmail").value
      
    
   
  
  })
  if(data.status=="success") {
 toast.success("email sent!")
    setisLoading(false)
  }
 
console.log(data);
      
    } catch (error) {
      console.log("Error",error);
      setisLoading(false)
        toast.error("Your email does not exist",{
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"

        })
    }
    
  }

// async function signUpWithGoogle()
//  {

// try {
//   const {data} = await axios.get (`https://e-commerce-9w3i.onrender.com/api/v1/auth/google`)
//   console.log(data);

// } catch (error) {
//   console.log("error:" , error);
// }
//  }


let user = {
  "email":"",
  "password":"",
}
let validation = Yup.object({
  email : Yup.string().required("email is required").email("email is invalid"),
  password:Yup.string().required("password is requried").matches(/^([-\#\$\.\%\&\@\!\+\=\<\>\*])?(?=.*[a-zA-Z0-9]).{8,20}$/gm,"password must be at least 8 charachters and maximum 20 "),


})

 const formik = useFormik({
initialValues : user ,
onSubmit : function (values) {
  signIn(values)
},validationSchema:validation


})



return <>
{console.log("hello")}
<div className="alert alert-danger doesntExist" style={{display:"none"}}>Email doesn't exist !</div>
<div className="alert alert-success sentDone "  style={{display:"none"}}>Reset Link sent successfully to your email !</div>

<div style={{"textAlign":"center" ,"display":"none" }} className='alert alert-success successMsg'>Welcome back !</div>


<div className="container  justify-content-center mt-5 pt-5 logINS">
    <div className="inner-signUp w-50 ">
      <div className="row">
      <div className="col-md-12">
        <h3>Login</h3>
        
        <form onSubmit={formik.handleSubmit}>
        
        <label className='my-2' htmlFor="email">email</label>
        <input  onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.email} type="Email" id='email' className='form-control ' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}

        <label className='my-2' htmlFor="password">Password</label>
        <input  onBlur={formik.handleBlur}   onChange={formik.handleChange} value={formik.values.password} type="Password" id='password' className='form-control '  />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}

   
        {isLoading? <button  className='btn btn-success ' type='button'><i className="fa-solid fa-spinner fa-spin  mt-3"></i></button>:<button type='submit' className='btn btn-success mt-3 load-bt'>Login</button>}
        <button onClick={toForgotPassword} type='button' className='float-end btn btn-outline-primary mt-3 '>Forgot Password</button>
        
        <p className='my-3'>New member ? <Link to="/register" className='text-primary'>Sign up</Link></p>  
        <Link to={"https://e-commerce-9w3i.onrender.com/api/v1/auth/google"}  id='googleWindow' className="login-with-google-btn my-2" >
  Sign In with Google
</Link >

        </form>
        </div>

        
      </div>

    </div>

    <div className=" w-50 m-auto forgot" style={{display:"none"}} >
         <div className='w-75 text-center'>
          <h4>Forgot your password?</h4>
        <p>Enter your email address and we'll send you a link to reset your password</p>
          </div>
        <input type="email" className='form-control forgotEmail' placeholder='enter your email'/>
        {isLoading ? <button  className='w-50 btn btn-outline-primary mt-3 ' type='button'><i className="fa-solid fa-spinner fa-spin  mt-3"></i></button> :         <button onClick={forgotPass} className='w-50 btn btn-outline-primary mt-3 '>Confirm email</button>}
        <button onClick={hideForgotPass} className='d-block  btn btn-outline-primary my-2'> <i className="fa-sharp fa-solid fa-arrow-left"></i> </button>

         </div>
     
   
        

</div>


</>
}

