import { Box, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import styles from './css/CartItem.module.css';

const CartItem = ({ item }) => {
  return (
    <Box className={styles['cart-item']} sx={{ marginTop: 2 }}>
    <Card sx={{ display: 'flex' }} className={styles['card']}>
      <CardMedia className={styles['card-media']}
        component="img"
        sx={{ width: 150 }}
        image={item.image}
        alt={item.name}
      />
      
      <CardContent sx={{  flex: 1, display: 'flex', alignItems: 'center' }} className={styles['card-content']}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h2" sx={{ marginBottom: '0.5rem' }} className={styles['item-info']}>
            {item.name}
          </Typography>
          <Typography variant="body2" component="p" >
            {item.description}
          </Typography>
        </Box>
      </CardContent>
      <CardContent  sx={{ display: 'flex', alignItems: 'center' }} className={styles['item-details']}>
        <Typography variant="h6" component="p" className={styles['item-price']}>
          ${item.price}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1.5rem' }} className={styles['item-quantity']}>
          <IconButton aria-label="decrement" size="small" >
            <RemoveIcon />
          </IconButton>
          <Typography variant="h6" component="p" sx={{ marginLeft: 1, marginRight: 1 }}>
            3
          </Typography>
          <IconButton aria-label="increment" size="small">
            <AddIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1.5rem' }} className={styles['item-price']}>
          <Typography variant="h6" component="p" sx={{ marginLeft: 1, marginRight: 1 }}>
            $5776
          </Typography>
        </Box>
      </CardContent>
      
    </Card>
  </Box>
  )
}
export default CartItem