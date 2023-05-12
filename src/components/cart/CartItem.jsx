import { Box, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import styles from './css/CartItem.module.css';

const CartItem = ({ item, decreaseQuantityHandler, increaseQuantityHandler }) => {

  return (
    <Box className={styles['cart-item']} sx={{ marginTop: 2 }}>
    <Card sx={{ display: 'flex' }} className={styles['card']}>
      <CardMedia className={styles['card-media']}
        component="img"
        sx={{ width: 110, height: 110, objectFit: 'contain'}}
        image={item.product_id.main_image}
        alt={item.name}
      />
      
      <CardContent sx={{  flex: 1, display: 'flex', alignItems: 'center', color: '#85822E' }} className={styles['card-content']}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h2" sx={{ marginBottom: '0.5rem' }} className={styles['item-info']}>
            {item.product_id.name}
          </Typography>
          <Typography variant="body2" component="p" className={styles['item-desc']}>
            {item.product_id.description}
          </Typography>
        </Box>
      </CardContent>
      <CardContent  sx={{ display: 'flex', alignItems: 'center', color: '#85822E' }} className={styles['item-details']}>
        <Typography variant="h6" component="p" className={styles['item-price']}>
          ${item.product_id.price}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1.5rem' }} className={styles['item-quantity']}>
          <IconButton aria-label="decrement" size="small"  onClick={() => {decreaseQuantityHandler(item.id)}} sx={{ '&:hover': { backgroundColor: 'red', color: 'white' }}} >
            <RemoveIcon className={styles['item-buttons']} />
          </IconButton>
          <Typography variant="h6" component="p" sx={{ marginLeft: 1, marginRight: 1 }} className={styles['item-buttons']} >
            {item.quantity}
          </Typography>
          <IconButton aria-label="increment" size="small"  onClick={() => {increaseQuantityHandler(item.id)}} sx={{ '&:hover': { backgroundColor: 'green', color: 'white' }}} >
            <AddIcon className={styles['item-buttons']}  />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1.5rem' }} >
          <Typography variant="h6" component="p" sx={{ marginLeft: 1, marginRight: 1 }} className={styles['item-price']}>
            ${item.product_id.price * item.quantity}
          </Typography>
        </Box>
      </CardContent>
      
    </Card>
  </Box>
  )
}
export default CartItem;