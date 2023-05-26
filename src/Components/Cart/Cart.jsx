import React, { useContext, useEffect, useState } from 'react'
import { categoriesStore } from '../Context/CatgoriesStore'
import Loading from '../LoadingScreen/Loading'
import $ from "jquery"
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmptyCart from '../EmptyCartImg/EmptyCart';
import Spinner from '../Spinner/Spinner';

export default function Cart() {
    
    const [open, setOpen] = React.useState(false);

    const { getCartProducts,cartProducts,deleteCartItem,load,emptyYourCart,cartQuantity,updateCartItemsQuantity,loading} = useContext(categoriesStore)
useEffect(()=>{
    getCartProducts()
},[])

useEffect(()=>{



},[])


async function getCartUpdated(id,count) {

updateCartItemsQuantity(id,count)


}


return <>

{load ? <Spinner/> : <div className="cart py-2">
 {cartProducts?.length == 0 ? <EmptyCart/> :    <div className="container-fluid">
        <div className='d-flex justify-content-between'>
        <h3 >
            Shopping Cart
        </h3>
        
        <div className='warningBox' id='warn'>
        <Box sx={{ width: '100%' }} id="demo">
            
      <Collapse in={open}>
        <Alert
        
        severity="error"
        
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
                
              <CloseIcon fontSize="inherit" />
            
            </IconButton>
     
          }
          sx={{ mb: 2 }}
        >
         Are you sure to delete all cart items?
         <IconButton size='small' onClick={emptyYourCart}>
            
               <CheckCircleIcon/>
                </IconButton>
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
     Clear Your Cart
      </Button>
    </Box>
        </div>
        </div>
        {cartProducts?.map((pro,ind)=>     <div className="row my-5" key={ind}>
            <div className="col-md-1 col-3">
                <img src={pro.product.img} className='w-100' alt="" />
            </div>
            <div className="col-md-9 border-bottom">
                <h5>{pro.product.productName}</h5>
                <h6  className="fw-bold spcColor"> {pro.product.price} EGP</h6>
                <div className='d-flex justify-content-between align-items-center'>
                 <input className='form-control w-25' type="number" value={ pro.quantity }   id='qunt' min={1}  onChange={function(e){getCartUpdated(pro._id,e.target.value)}}/>
                  <button className='btn btn-danger my-2' onClick={function(){deleteCartItem(pro._id)}}>Remove Item from cart</button>

                </div>
            </div>
            
        </div>)}
   
    </div>}
  

</div>}

</>
}
