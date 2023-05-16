import './Productdetails.css'
import { getProductById } from "../../../features/product/productSlice";
import { getCategories  } from "../../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { addToCart } from '../../../features/cart/cartSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Relatedproduct from '../Relatedproduct';
function Productdetails() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { categories } = useSelector((state) => state.category);
  const { product, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById (productId))
    if(categories.length === 0) dispatch(getCategories()) 
  }, []);

  let category = categories.find(category => category.id === product.category);

  const imgs = document.querySelectorAll('.img-select a');
  const imgBtns = [...imgs];
  let imgId = 1;
  imgBtns.forEach((imgItem) => {
      imgItem.addEventListener('click', (event) => {
          event.preventDefault();
          imgId = imgItem.dataset.id;
          slideImage();
      });
  });
  
  function slideImage(){
      const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
      document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
  }
  window.addEventListener('resize', slideImage);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Product Details</h1>
      <div className="card-wrapper">
        <div className="product_card">
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img src={product.main_image} alt={product.name}/>
                <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt="shoe image"/>
                <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt="shoe image"/>
                <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt="shoe image"/>
              </div>
            </div>
            <div className="img-select">
              <div className="img-item">
                <a data-id="1">
                  <img src={product.main_image}  alt="shoe image"/>
                </a>
              </div>
              <div className="img-item">
                <a data-id="2">
                  <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt="shoe image"/>
                </a>
              </div>
              <div className="img-item">
                <a data-id="3">
                  <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt="shoe image"/>
                </a>
              </div>
              <div className="img-item">
                <a data-id="4">
                  <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt="shoe image"/>
                </a>
              </div>
            </div>
          </div>
          <div className="product-content">
            <h2 className="product-title">{product.name}</h2>
            {/* <a href="#" className="product-link">visit nike store</a> */}
            {/* <div className="product-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
              <span>4.7(21)</span>
            </div> */}

            <div className="product-price">
              {/* <p className="last-price">Old Price: <span>$257.00</span></p> */}
              <p className="new-price">Price: <span>${product.price}</span></p>
            </div>

            <div className="product-detail">
              <h2>about this item: </h2>
              <p>{product.description}</p>
              
              <ul>
                {/* <li>Color: <span>Black</span></li> */}
                <li>Available: <span>in stock</span></li>
                <li>Category: <span>{category?.name}</span></li>
                <li>Shipping Area: <span>All over the world</span></li>
                <li>Quantity: <span>{product.quantity}</span></li>
              </ul>
            </div>

            <div className="purchase-info">
              {/* <label htmlFor="quantity">Quantity</label>
              <input type="number" min="0" name='quantity' id='quantity'/> */}
              <button 
              onClick={() => { dispatch(addToCart(product.id));
                setQuantity(quantity - 1); }} 
              type="button" 
              className="btn"
              disabled={product.quantity === 0}
            >
              Add to Cart <AddShoppingCartIcon/>
            </button>
            </div>
                <Relatedproduct categoryId={category?.id} productId = {product.id}/>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Productdetails;