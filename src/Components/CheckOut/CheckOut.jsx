import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cvv from "../../Images/credit-card.svg"
import $ from "jquery"
import axios from 'axios'
import { toast } from 'react-toastify'
import ThankYou from '../ThankYou/ThankYou'

export default function CheckOut() {
  const navigate = useNavigate()
  const [loading, setloading] = useState(null)
  function copyTextToClipBoard() {
    $("#myInput").on("click", navigator.clipboard.writeText($("#myInput").text()))
    $(".copied").fadeIn(500,function(){
      $(".copied").fadeOut(700)
    })
    
   
  }

    function validateCardInfo() {

   
        const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

const focusSibling = function(target, direction, callback) {
  const nextTarget = target[direction];
  nextTarget && nextTarget.focus();
  // if callback is supplied we return the sibling target which has focus
  callback && callback(nextTarget);
}

// input event only fires if there is space in the input for entry. 
// If an input of x length has x characters, keyboard press will not fire this input event.
monthInput.addEventListener('input', (event) => {

  const value = event.target.value.toString();
  // adds 0 to month user input like 9 -> 09
  if (value.length === 1 && value > 1) {
      event.target.value = "0" + value;
  }
  // bounds
  if (value === "00") {
      event.target.value = "01";
  } else if (value > 12) {
      event.target.value = "12";
  }
  // if we have a filled input we jump to the year input
  2 <= event.target.value.length && focusSibling(event.target, "nextElementSibling");
  event.stopImmediatePropagation();
});

yearInput.addEventListener('keydown', (event) => {
  // if the year is empty jump to the month input
  if (event.key === "Backspace" && event.target.selectionStart === 0) {
    focusSibling(event.target, "previousElementSibling");
    event.stopImmediatePropagation();
  }
});

const inputMatchesPattern = function(e) {
  const { 
    value, 
    selectionStart, 
    selectionEnd, 
    pattern 
  } = e.target;
  
  const character = String.fromCharCode(e.which);
  const proposedEntry = value.slice(0, selectionStart) + character + value.slice(selectionEnd);
  const match = proposedEntry.match(pattern);
  
  return e.metaKey || // cmd/ctrl
    e.which <= 0 || // arrow keys
    e.which == 8 || // delete key
    match && match["0"] === match.input; // pattern regex isMatch - workaround for passing [0-9]* into RegExp
};

document.querySelectorAll('input[data-pattern-validate]').forEach(el => el.addEventListener('keypress', e => {
  if (!inputMatchesPattern(e)) {
    return e.preventDefault();
  }
}));
    }

    useEffect(()=>{
        const myForm = document.getElementById("myForm")
        myForm.addEventListener("submit",function(e){
            e.preventDefault()
        })
        validateCardInfo()
    },[])


    async function visaPayment() {
      try {
        setloading(true)
        const {data} = await axios.post(`https://e-commerce-9w3i.onrender.com/api/v1/cart/checkout`,{"email":$("#email").val(),
            "card_number":$("#cardNumber").val(),
            "exp_month":$("#month").val(),
            "exp_year":$("#year").val(),
            "cvc":$("#cvv").val(),
            "country":$("#country").val(),
            "city":$("#city").val(),
            "address":$("#address").val()} , {
                        headers: {
                            Authorization: "Bearer "+ localStorage.getItem("userToken"),
                          } 
                    })
                    console.log(data)
                    if(data.status == "success") {
                      navigate("/thank")
                      setloading(false)
                    }
      } catch (error) {
        console.log("error" ,error);
        setloading(false)
        toast.error(error.response.data.message)
      };
    }
    async function GoogleVisaPayment() {
      try {
        setloading(true)
        const {data} = await axios.post(`https://e-commerce-9w3i.onrender.com/api/v1/cart/checkout`,{"email":$("#email").val(),
            "card_number":$("#cardNumber").val(),
            "exp_month":$("#month").val(),
            "exp_year":$("#year").val(),
            "cvc":$("#cvv").val(),
            "country":$("#country").val(),
            "city":$("#city").val(),
            "address":$("#address").val()} , {
                        headers: {
                            Authorization: "Bearer "+ localStorage.getItem("googleToken"),
                          } 
                    })
                    console.log(data)
                    if(data.status == "success") {
                      navigate("/thank")
                      setloading(false)
                    }
      } catch (error) {
        console.log("error" ,error);
        setloading(false)
        toast.error(error.response.data.message)
      };
    }

    async function payment() {
      if(localStorage.getItem("userToken") ) {
       await visaPayment()
      }
      else if (localStorage.getItem("googleToken")) {
        await GoogleVisaPayment()
      }
    }
$(".cvIcon").on("mouseenter" , function() {
    $(".cvInfo").show()
    })
    $(".cvIcon").on("mouseleave",function(){
        $(".cvInfo").hide()
    } )
  return <>
  
  
  <div className="checkOut my-5 py-5 container">
    <div className="miniNav">
        <Link to={"/cart"}  className='fw-bolder mx-2'> <i className="fa-solid fa-arrow-left"></i> Cart</Link >
    </div>
    <div className="shippingDetail my-4 w-50">
        <h5>Choose Your Payment Method: </h5>
    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Cash</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Visa</button>
  </li>

</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade  active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">...</div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">


<form action="" id='myForm'>
    <input type="email"  placeholder=' email' className='form-control w-50' id='email'/>
    <input type="text"  placeholder=' country' className='form-control w-50 my-3' id='country'/>
    <input type="text"  placeholder=' city' className='form-control w-50 my-3' id='city'/>
    <input type="text"  placeholder=' address' className='form-control w-50' id='address'/>
    <div className="visa-box p-5">
        <h6 className='text-muted' >CARD NUMBER</h6>
        <div className="note position-relative fw-bolder text-muted">
        <p>Note: Only stripe cards test are allowed !
          <p className='p-0 m-0'>eg:</p>
         
          <p  className='position-relative' id='myInput' >  
  4242424242424242</p>
        </p>
        <i className="fa-regular fa-clipboard position-absolute " onClick={copyTextToClipBoard}></i>
        
        </div>
        <div style={{display:"none"}} className='copied'><p className='text-success '>Text Copied to clipBoard !</p></div>
        <input type="number" placeholder='**** **** **** ***'  className='form-control' id='cardNumber'/>
<div className="row">
    <div className="col-md-6">
    <h6 className='my-4 text-muted'> EXPIRY DATE</h6>
        <div className="seprator d-flex position-relative">
            <input type="number" className='border-0 text-center expiry exp' placeholder='MM' id='month' maxLength="2" pattern="[0-9]*" inputmode="numerical" autoComplete='off' data-pattern-validate />
            <div className="sep position-absolute">
                /
            </div>
            <input type="number"  className='border-0 text-center expiry exp' placeholder='YY' id='year' maxLength="4" pattern="[0-9]*" inputmode="numerical" autoComplete='off' data-pattern-validate/>
        </div>
    </div>
    <div className="col-md-6">
    <h6 className='my-4 text-muted'> CVV</h6>
    <div className="cvv position-relative">
    <input type="number"  className='border-0 text-center cv ' id='cvv' placeholder='Code'/>
    <i className="fa-solid fa-circle-question position-absolute fs-5 cvIcon"></i>
    <div className="cvInfo text-muted w-50 position-absolute bg-white" style={{display:"none"}}>
        <p className='p-0 m-0 fw-bolder'>Enter the 3 digit code on the back of your card</p>
        <img src={cvv} alt="" className='w-50' />
    </div>

    </div>
    
    </div>
</div>
    </div>
    {loading ? <button type='button' className="btn btn-outline-primary"><i className="fa-solid fa-spinner fa-spin  mx-2"></i></button> :    <button onClick={payment} type='submit' className='btn btn-outline-primary' >Confirm Checkout</button>
}
</form>
  </div>

</div>
    </div>
  </div>
  
  
  
  
  </>
}
