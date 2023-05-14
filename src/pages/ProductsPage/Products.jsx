import { Container, Grid } from "@mui/material"
import styles from './products.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../features/product/productSlice";
import Categories from "../../components/category/Categories";
import ProductItem from "../../components/products/index.js";
import { addToWishlist, removeFromWishlist } from "../../features/wishlist/wishlistSlice";


const Products = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const addWishlist = (id) => {dispatch(addToWishlist(id)) }
    const removeWishlist = (id) => dispatch(removeFromWishlist(id)) 
    const { products, isLoading } = useSelector((state) => state.product)

    return (

        <div className={styles['products']}>
            {/* <Categories /> */}
            <Container maxWidth="xl" sx={{ marginTop: 3, marginBottom: 3 }} >

                <Grid container spacing={{ xs: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {products.map((product) => (
                        <Grid item xs={3} sm={3} md={3} key={product.id}>
                            <ProductItem product={product} addWishlist={addWishlist} removeWishlist={removeWishlist} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>

    )
}
export default Products