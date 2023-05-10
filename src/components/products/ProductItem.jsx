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

export default function ProductItem(props) {

    const dispatch = useDispatch();

    const {id, name, description, main_image, price, quantity } = props.product;
    return (

        <Card sx={{ maxWidth: 345, position: 'relative' }} className={styles['card-item']}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={"http://127.0.0.1:8000/"+main_image}
                        alt="Paella dish"
                    />

            <div className={styles['product-detail']}>
                    <CardHeader
                        title={name}
                        subheader={price}
                    />
                <CardActions disableSpacing>
                    <IconButton aria-label="add to wishlist" title='add to wishlist'>
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </div>

            {quantity === 0 ? <div className={styles['out-of-stock']}> <ErrorOutlineIcon /> Out of stock</div> : <div className={styles["overlay"]}>
                <Button variant="contained" onClick={() => {dispatch(addToCart(id))}}>
                    <ShoppingCartIcon />
                    add to cart</Button>
            </div>}

        </Card>
    );
}
