import { useState } from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import CartItem from './CartItem';
import styles from './css/Cart.module.css';


const Cart = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', description: 'Lorem ipsum dolor sit amet', price: 9.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', description: 'Consectetur adipiscing elit', price: 19.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', description: 'Sed do eiusmod tempor incididunt', price: 29.99, image: 'https://via.placeholder.com/150' },
  ];

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', boxSizing: 'border-box' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <CartItem item={item} />
            </Grid>
          ))}
        </Grid>
        <Box className={styles['total']} sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="p" sx={{ marginBottom: { xs: 1, md: 0 }, marginRight: { xs: 0, md: 2 } }}>
              Total: $1292923
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#DDD92A', '&:hover': { backgroundColor: '#85822E' }}}>
              Place Order
            </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;