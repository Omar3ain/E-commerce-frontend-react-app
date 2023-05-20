import styles from '../cart/css/CartItem.module.css';
import { Box, Card, CardContent, CardMedia } from "@mui/material";
import Typography from '@mui/material/Typography';


const OrderItems = ({item}) => {
    return (
        <Box className={styles['cart-item']} sx={{ marginTop: 2 }}>
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
                   
                    <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1.5rem' }} >
                        <Typography variant="h6" component="p" sx={{ marginLeft: 1, marginRight: 1 }} className={styles['item-price']}>
                           Total: ${item.product.price * item.quantity}
                        </Typography>
                    </Box>
                </CardContent>

            </Card>
        </Box>

    )
}
export default OrderItems