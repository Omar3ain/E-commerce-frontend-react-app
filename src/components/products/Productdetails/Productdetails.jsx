import './Productdetails.css'
import { getProductById } from "../../../features/product/productSlice";
import { getCategories  } from "../../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../../features/cart/cartSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Relatedproduct from '../Relatedproduct';

function Productdetails() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { categories } = useSelector((state) => state.category);
  const { product, isLoading } = useSelector((state) => state.product);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductById (productId))
    if(categories.length === 0) dispatch(getCategories()) 
  }, [dispatch]);

  let category = categories.find(category => category.id === product.category);
  const product_images = product.image_urls?.split(',');

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
                { product_images?.map((image,index) =>
                  <img src={image} alt={product.name} key={index+1}/>
                )}
              
              </div>
            </div>
            <div className="img-select">
             {product_images?.length > 1 && product_images?.map((image , index) =>
                  <div className="img-item">
                    <a data-id={index+1}>
                      <img src={image}  alt={product.name}/>
                    </a>
                  </div>
                )}
            </div>
          </div>
          <div className="product-content">
            <h2 className="product-title">{product.name}</h2>

            <div className="product-price">
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

            {user ? (<button 
              onClick={() => { dispatch(addToCart(product.id));
                setIsAddedToCart(true)
              }} 
              type="button" 
              className="btn"
              disabled={isAddedToCart || product.quantity ===0}
            >
              {isAddedToCart ? 'Added to Cart!' : 'Add to Cart'} <AddShoppingCartIcon/>
            </button>): (<button onClick={() =>  navigate("/login")} 
              className="btn">Log in</button>)}
            </div>
                <Relatedproduct categoryId={category?.id} productId = {product.id}/>
          </div>
        </div>
      </div>
 
    </>
  );
}

export default Productdetails;