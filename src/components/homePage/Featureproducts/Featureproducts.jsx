import './Featureproducts.css';
import { useEffect } from "react";
import { getProducts } from "../../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Loader from '../../layout/loader/Loader';

function Featureproducts() {
  const dispatch = useDispatch();
  const { products, next, previous, isLoading } = useSelector((state) => state.product);
  const  navigate =  useNavigate();
  useEffect(() => {
    dispatch(getProducts({ categoryId:undefined, search: ''}))
}, [])
const featuredProducts = [...products]
featuredProducts?.sort(() => 0.5 - Math.random()).slice(0, 15);
  return (
    <>
      <div id="project" className="project">
          <div className="container">
            <div className="row">
                <div className="col-md-12">
                  <div className="titlepage">
                      <h2>Featured Products</h2>
                  </div>
                </div>
            </div>
            <div className="row">
            <div className="product_main">
            {isLoading ? (
                <Loader/>
              ) : featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <div className="project_box" key={product.id} onClick={() => navigate(`/products/${product.id}/product`) }>
                    <div className="dark_white_bg">
                      <img src={product.main_image} alt={product.name} />
                    </div>
                    <h3>
                      {product.name} {product.price}EGP
                    </h3>
                  </div>
                ))
              ) : (
                <h1>No featured Products yet</h1>
              )}
              <div className="col-md-12">
                  <button className="read_more" onClick={()=> {navigate('/products')}}>Go to all products</button>
              </div>
            </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Featureproducts
