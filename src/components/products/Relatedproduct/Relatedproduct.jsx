import './Relatedproduct.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../../features/product/productSlice";
import { useNavigate } from 'react-router-dom';

function Relatedproduct({categoryId ,productId}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if(categoryId ) dispatch(getProducts({categoryId,search:''}))
  }, [categoryId]);
  const { products, isLoading } = useSelector((state) => state.product);
  let relatedProducts= products.filter(product => product.id !== productId).slice(0, 6);
  return (
    <>
    <div>
      
    </div>
    <div className="br-found-heading m-2">Related Products</div> 
    <div className='relatedProductsContainer'>
    {relatedProducts?.length >= 1 ?
  relatedProducts.map((product) =>
    <div className="br-sf-widget" key={product.id}>
      <div className="br-sf-widget-merchant-cont">
        <div className="br-sf-widget-merchant-img">
          <img src={product.main_image}/>
        </div>
        <div className="br-sf-widget-merchant-title">
          <a href=''  onClick={(e)=>{ navigate(`/products/${product.id}/product/`)}} >{product.name}</a>
        </div>
        <div className="br-sf-widget-merchant-desc">
          Details: {product.description}
        </div>
      </div>
    </div>
  )
  :
  <p>No products available</p>
}
    </div>
    </>
  )
}

export default Relatedproduct;
