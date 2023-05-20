import { Button, Container, Grid, TextField } from "@mui/material"
import styles from './products.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getNextPage, getPrevPage, getProducts } from "../../features/product/productSlice";
import Filters from "../../components/products/Filters/Filters";
import ProductItem from "../../components/products/index.js";
import { getWishlist } from "../../features/wishlist/wishlistSlice";
import { useParams } from 'react-router-dom';
import debounce from "lodash.debounce";
import Loader from "../../components/layout/loader/Loader";

const Products = () => {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const [filter, setFilter] = useState('')
    const [key, setKey] = useState('')

    const debouncedSetFilter = useRef(debounce((value) => {
        setFilter(value);
    }, 1000)).current;
    const handleChange = (e) => {
        const { value } = e.target;
        setKey(value);
        debouncedSetFilter(value);
    };

    const { products, next, previous, isLoading } = useSelector((state) => state.product)
    const wishlist = useSelector((state) => state.wishlist);
    const wishlistProductIds = wishlist.wishlistItems.map(item => item.product.id)
    useEffect(() => {
        dispatch(getProducts({ categoryId, search: filter }))
        dispatch(getWishlist())
    }, [dispatch, filter , categoryId])
    return (
        <>
            <div className={styles['products']}>
                <Filters />
                <Container maxWidth="xl" sx={{ marginTop: 3, marginBottom: 3 }} >
                    <TextField
                        id="outlined-controlled"
                        label="Search in products"
                        fullWidth
                        value={key}
                        onChange={handleChange}
                        sx={{ marginBottom: 5 }}
                    />
                    {isLoading ? (
                        <Loader/>
                    ) : products.length === 0 ? (
                        <h2 style={{ textAlign: 'center' }}>No products to display</h2>
                    ) : (
                        <Grid container spacing={{ xs: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {products.map((product) => (
                                <Grid item xs={12} sm={4} md={3} key={product.id}>
                                    <ProductItem product={product} inWishList={wishlistProductIds.includes(product.id)} />
                                </Grid>
                            ))}
                        </Grid>
                    )
                    }
                </Container>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center mt-4">
                    <li className="page-item">
                        <Button disabled={!previous} variant="outlined" className="page-link" onClick={() => dispatch(getPrevPage(previous))}>Previous</Button>
                    </li>
                    {/* <li><a className="page-link">1</a></li> */}
                    <li className="page-item">
                        <Button disabled={!next} variant="outlined" className="page-link" onClick={() => dispatch(getNextPage(next))}>Next</Button>
                    </li>
                </ul>
            </nav>
        </>

    )
}

export default Products