import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import CartItem from './CartItem';
import styles from './css/Cart.module.css';
import { getCart, decreaseQuantity, increaseQuantity } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../layout/loader/Loader';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, isLoading, isSuccess } = useSelector((store) => store.cart);
  const [sendingData, setSendingData] = useState(false);


  useEffect(() => {
    dispatch(getCart());
}, [dispatch]);


const decreaseQuantityHandler = (id) => {
  setSendingData(true);
  dispatch(decreaseQuantity(id)).then(() => {
    setSendingData(false);
  }).catch(() => {
    setSendingData(true);
  });
}

const increaseQuantityHandler = (id, quantity) => {
  setSendingData(true);
  if(quantity >= 10){
    toast.error("You have reached the limit for the quantity for a customer. Try again in another order!");
    setSendingData(false);
  }else{
    dispatch(increaseQuantity(id)).then(() => {
      setSendingData(false);
    }).catch(() => {
      setSendingData(true);
    });
  }
}

if (isLoading) {
  return (
    <Loader />
  )
}

const total = cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.product_id.price * item.quantity, 0): 0;

return (
    <Box className="container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, boxSizing: 'border-box' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {cartItems.length > 0 ? 
           cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <CartItem item={item} key={item.id}  sendingData={ sendingData } decreaseQuantityHandler={decreaseQuantityHandler} increaseQuantityHandler={increaseQuantityHandler}/>
            </Grid>
          ))
          :
          <Grid item xs={12}>
            <Typography color="error"  style={{ textAlign: "center" }}>
               No cart items yet
            </Typography>
          </Grid>
          }
        </Grid>
        <Box className={styles['total']} sx={{ marginTop: 2 , marginBottom: "10rem"}}>
            <Typography variant="h6" component="p" sx={{ marginBottom: { xs: 1, md: 0 }, marginRight: { xs: 0, md: 2 } }} className={styles['total_amount']}>
              Total: ${total}
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#DDD92A', '&:hover': { backgroundColor: '#85822E' }}} disabled={cartItems.length === 0}>
              <a onClick={()=>{navigate('/order')}} style={{textDecoration:'none',color:'#fff'}}>
                 Place Order
                </a>
            </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;