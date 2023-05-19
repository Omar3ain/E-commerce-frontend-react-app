import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import CartItem from './CartItem';
import styles from './css/Cart.module.css';
import { getCart, decreaseQuantity, increaseQuantity } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getCart());
}, [dispatch]);


const decreaseQuantityHandler = (id) => {
  dispatch(decreaseQuantity(id))
}

const increaseQuantityHandler = (id, quantity) => {
  if(quantity == 10){
    toast.error("You have reached the limit for the quantity for a customer. Try again in another order!");
  }else{
    dispatch(increaseQuantity(id))
  }
}

if (isLoading) {
  return (
    <div className="loading">
      <h1>Loading....</h1>
    </div>
  )
}

const total = cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.product_id.price * item.quantity, 0): 0;
// const navigate = useNavigate();
return (
    <Box className="container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, boxSizing: 'border-box' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {cartItems.length > 0 ? 
           cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <CartItem item={item} key={item.id} decreaseQuantityHandler={decreaseQuantityHandler} increaseQuantityHandler={increaseQuantityHandler}/>
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
        <Box className={styles['total']} sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="p" sx={{ marginBottom: { xs: 1, md: 0 }, marginRight: { xs: 0, md: 2 } }} className={styles['total_amount']}>
              Total: ${total}
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#DDD92A', '&:hover': { backgroundColor: '#85822E' }}} disabled={cartItems.length === 0}>
              <a href="/order" style={{textDecoration:'none',color:'#fff'}}>
                 Place Order
                </a>
            </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;