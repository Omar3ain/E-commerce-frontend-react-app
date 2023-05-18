import { Box, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import styles from './css/wishlistItem.module.css';
import { addToCart } from '../../features/cart/cartSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../features/wishlist/wishlistSlice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const WishlistItem = ({ item }) => {
    const dispatch = useDispatch()
    return (
        <Box className={styles['wishlist-item']} sx={{ marginTop: 2 }}>
            <Card sx={{ display: 'flex' }} className={styles['card']}>
                <CardMedia className={styles['card-media']}
                    component="img"
                    sx={{ width: 110, height: 110, objectFit: 'contain' }}
                    image={item.product.main_image}
                    alt={item.product.name}
                />

                <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center', color: '#85822E' }} className={styles['card-content']}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="h2" sx={{ marginBottom: '0.5rem' }} className={styles['item-info']}>
                            {item.product.name}
                        </Typography>
                        <Typography variant="body2" component="p" className={styles['item-desc']}>
                            {item.product.description}
                        </Typography>
                    </Box>
                </CardContent>
                <CardContent sx={{ display: 'flex', alignItems: 'center', color: '#85822E' }} className={styles['item-details']}>

                    <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1.5rem' }} className={styles['item-quantity']}>
                    {item.product.quantity? <Button variant="contained" onClick={() => { dispatch(addToCart(item.product.id)) }} style={{ backgroundColor: 'white', color: '#85822E' }}>
                            <ShoppingCartIcon />
                            add to cart</Button>:
                             <Typography style={{color:'red'}}><ErrorOutlineIcon style={{color:'red', fontSize:'1.4rem'}}/>Out Of Stock</Typography>}
                        <Button variant="contained" onClick={() => { dispatch(removeFromWishlist(item.product.id)) }} title="remove item" style={{ backgroundColor: 'white', color: '#85822E', marginLeft:'1rem' }}>
                            <DeleteOutlineIcon />
                        </Button>
                    </Box>
                </CardContent>

            </Card>
        </Box>
    )
}
export default WishlistItem;