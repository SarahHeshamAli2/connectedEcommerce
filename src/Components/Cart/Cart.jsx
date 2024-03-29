import React, { useContext, useEffect, useState } from 'react'
import { categoriesStore } from '../Context/CatgoriesStore'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmptyCart from '../EmptyCartImg/EmptyCart';
import Spinner from '../Spinner/Spinner';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail'
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'View Cart Details' || anchor === 'View Cart Details' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
<div className='my-5 mx-2'>
<h5 className='fw-bolder'>Order summary</h5>
<Divider/>
      <h6 className='fw-bolder my-3'> Total <span className='price text-muted'>(Inclusive of VAT)</span> <span className='fw-bold spcColor'>{totalCartPrice}  EGP</span> </h6>
      <Divider/>
      <Link to={"/checkout"} >      <button className='btn btn-outline-primary w-100' type='button'>Check Out</button>
</Link>
</div>
    </Box>
  );
    
    const [open, setOpen] = React.useState(false);

    const { getCartProducts,cartProducts,deleteCartItem,load,emptyYourCart,cartQuantity,updateCartItemsQuantity,loading,totalCartPrice,getGoogleCart,deleteGoogleCartItem,emptyGoogleCart,updateGoogleCartItemsQuantity} = useContext(categoriesStore)
useEffect(()=>{
  if(localStorage.getItem("userToken") !=null ) {
    getCartProducts()

  } 
  if(localStorage.getItem("googleToken") !=null) {
    getGoogleCart()
  }
},[])

function deleteCartItems(id)
{
  if(localStorage.getItem("userToken") !=null) {
    deleteCartItem(id)
  }
  if(localStorage.getItem("googleToken") !=null) {
    deleteGoogleCartItem(id)
  }
}
async function getCartUpdated(id,count) {
  if(localStorage.getItem("userToken") !=null) {
    updateCartItemsQuantity(id,count)

  }
  if(localStorage.getItem("googleToken") !=null) {
    updateGoogleCartItemsQuantity(id,count)
  }



}


function emptyYourCartItemsAll() {
  if(localStorage.getItem("userToken") !=null) {
    emptyYourCart()
  }
  if(localStorage.getItem("googleToken") !=null) {
    emptyGoogleCart()
  }
}

return <>

{load ? <Spinner/> : <div className="cart py-5 my-5 ">
 {cartProducts?.length == 0 ? <EmptyCart/> :    <div className="container position-relative ">
        <div className='d-flex justify-content-between'>
        <div>
      {[ 'view cart details'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
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
         <IconButton size='small' onClick={emptyYourCartItemsAll}>
            
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
                <div className='d-flex align-items-center'>
                  <div>
                    <button onClick={function(){getCartUpdated(pro._id,pro.quantity+1)}}  className='btn btn-sm btn-outline-primary'>+</button>
                    <span id='quantt' className='mx-2'>{pro.quantity}</span>
                    {pro.quantity >=2 ?                     <button  className='btn btn-sm btn-outline-primary' onClick={function(){getCartUpdated(pro._id,pro.quantity-1)}}>-</button>
 :  <button  className='btn btn-sm btn-outline-primary' disabled>-</button>}
                  </div>

                </div>
                <span className='my-3 d-inline-block cursor-pointer' onClick={function(){deleteCartItems(pro._id)}}>Remove <i className="fa-solid fa-trash-can text-danger"></i></span>
            </div>
        </div>)}
       
    </div>}


</div>}

</>
}
