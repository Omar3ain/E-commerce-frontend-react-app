import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import CartItem from './CartItem';
import styles from './css/Cart.module.css';
import { getCart, decreaseQuantity, increaseQuantity } from '../../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getCart());
}, [dispatch]);


const decreaseQuantityHandler = (id) => {
  dispatch(decreaseQuantity(id))
}

const increaseQuantityHandler = (id) => {
  dispatch(increaseQuantity(id))
}

if (isLoading) {
  return (
    <div className="loading">
      <h1>Loading....</h1>
    </div>
  )
}

  const total = cartItems.reduce((acc, item) => acc + item.product_id.price * item.quantity, 0);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', boxSizing: 'border-box' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <CartItem item={item} key={item.id} decreaseQuantityHandler={decreaseQuantityHandler} increaseQuantityHandler={increaseQuantityHandler}/>
            </Grid>
          ))}
        </Grid>
        <Box className={styles['total']} sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="p" sx={{ marginBottom: { xs: 1, md: 0 }, marginRight: { xs: 0, md: 2 } }}>
              Total: ${total}
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#DDD92A', '&:hover': { backgroundColor: '#85822E' }}} disabled={cartItems.length === 0}>
              Place Order
            </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;