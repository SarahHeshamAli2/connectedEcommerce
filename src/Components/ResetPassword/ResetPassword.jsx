import axios from "axios";
import $ from "jquery"
import { useParams } from "react-router-dom"

export default function ResetPassword() {

  const params = useParams()
  console.log(params.id);

  async function takeUserTokenPasswordReset() {
    try {
      const {data} = await axios.patch(`https://e-commerce-9w3i.onrender.com/api/v1/auth/resetPassword/${params}`,{
        "password" : $("#nPassword").val,
        "passwordConfirm" : $("#cPassword").val
        
      })
      if(data.status == "success"){
        $(".mssg").fadeIn(500,function(){
          setTimeout(() => {
            $(".mssg").fadeOut(500)
          }, 1000);
        })
      }
      console.log(data);

    } catch (error) {
      console.log(error);
      $(".mssg2").fadeIn(500,function(){
        setTimeout(() => {
          $(".mssg2").fadeOut(500)
        }, 1000);
      })
    }
    



  }

return <>

<div className="container  justify-content-center mt-5 pt-5 logINS">
<div className="inner-signUp w-50 ">
      <div className="row">
      <div className="col-md-12">
        <h3>Reset Your Password</h3>
        
        <form >
        
        <label className='my-2' htmlFor="nPassword">New Password</label>
        <input   type="password" id='nPassword' className='form-control ' />

        <label className='my-2' htmlFor="cPassword">Confirm New Password</label>
        <input   type="Password" id='cPassword' className='form-control '  />

   
        <button type='button' className='btn btn-success mt-3 load-bt'>Confirm</button>
        
   

        </form>
        </div>
  <div className="alert alert-success my-2 mssg" style={{display:"none"}}>
  password changed successfully
  </div>
  <div className="alert alert-danger my-2 mssg2" style={{display:"none"}}>
  An error occurred Please try again..
  </div>
        
      </div>

    </div>
</div>

</>
}
