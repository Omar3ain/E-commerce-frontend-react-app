import * as React from 'react';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './css/product.module.css';
import { Button } from '@mui/material';
import { addToCart } from '../../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';
import { useNavigate } from "react-router-dom";

export default function ProductItem(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, name, description, main_image, price, quantity } = props.product;

    const addWishlist = (id) => { dispatch(addToWishlist(id)) }
    const removeWishlist = (id) => dispatch(removeFromWishlist(id))
    return (

        <Card sx={{ maxWidth: 345, position: 'relative' }} className={styles['card-item']}>
            <CardMedia
                
                component="img"
                height="300"
                image={main_image}
                alt={name}
            />

            <div className={styles['product-detail']} > 
                <CardHeader
                    onClick={()=>{ navigate(`/products/${id}/product`)}}
                    title={name}
                    subheader={price}
                    style={{ cursor: 'pointer' }}
                />
                <CardActions disableSpacing>
                    <IconButton aria-label="remove from wishlist" title={props.inWishList ? 'remove from wishlist' : 'add to wishlist'}
                        onClick={props.inWishList ? () => { removeWishlist(id) } : () => { addWishlist(id) }}>
                        <FavoriteIcon style={props.inWishList ? { color: '#cc0000' } : {}} />
                    </IconButton>
                </CardActions>
            </div>

            {quantity === 0 ? <div className={styles['out-of-stock']}> <ErrorOutlineIcon /> Out of stock</div> : <div className={styles["overlay"]}>
                <Button variant="contained" style={{ backgroundColor: '#ece87d', color: '#2d2a32' }} onClick={() => { dispatch(addToCart(id)) }}>
                    <ShoppingCartIcon />
                    add to cart</Button>
            </div>}

        </Card>
    );
}
