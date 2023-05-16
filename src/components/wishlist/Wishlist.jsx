
import { Container, Grid, Box, Typography } from '@mui/material';
import WishlistItem from './wishlistItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWishlist } from '../../features/wishlist/wishlistSlice';

const Wishlist= () => {

    const dispatch = useDispatch();
    const { wishlistItems, isLoading } = useSelector((store) => store.wishlist);

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="loading">
                <h1>Loading....</h1>
            </div>
        )
    }

    return (

            <Box className="container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, boxSizing: 'border-box' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {wishlistItems.length > 0 ?
                            wishlistItems.map((item) => (
                                <Grid item xs={12} key={item.id}>
                                    <WishlistItem item={item} />
                                </Grid>
                            ))
                            :
                            <Grid item xs={12}>
                                <Typography color="error" style={{ textAlign: "center" }}>
                                    Nothing in wishlist yet
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                </Container>
            </Box>
    );

}
export default Wishlist;