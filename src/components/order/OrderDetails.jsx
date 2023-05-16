import { useDispatch, useSelector } from "react-redux";
import Cart from "../cart/Cart"
import { getCart } from "../../features/cart/cartSlice";
import { Box, Grid, Typography, Container, Paper } from "@mui/material";
import CartItem from "../cart/CartItem";
import { useEffect } from "react";

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { cartItems, isLoading } = useSelector((store) => store.cart);

    useEffect(() => {
        dispatch(getCart());
    }, []);

    return (
        <>
            {/* <Box className="container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, boxSizing: 'border-box' }}> */}
                <h3 >Your Order</h3>
                <div style={{ display: 'flex' }}>

                    {cartItems.map((item) => (
                        <Grid item xs={12} key={item.id} style={{marginRight:'1rem'}}>
                            <Paper variant="outlined" square >
                                <img src={item.product_id.main_image} style={{ width: 110, height: 110, objectFit: 'contain' }}
                                    alt={item.product_id.name} />
                                <p>{item.product_id.name}</p>
                            </Paper>
                        </Grid>
                    ))
                    }
                </div>
            {/* </Box> */}
        </>
    )
}
export default OrderDetails