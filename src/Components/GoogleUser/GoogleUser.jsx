import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function GoogleUser() {
  const {id} = useParams()
  console.log(id);
  useEffect(()=>{
    const myGoogleUser = localStorage.setItem("googleToken",id)
  },[])
return <>

<div className="alert alert-success text-center my-5 py-5">
  <h3>Welcome Back!</h3>
</div>

</>
}
