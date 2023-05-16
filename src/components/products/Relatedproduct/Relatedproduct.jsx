import './Relatedproduct.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../../features/product/productSlice";

function Relatedproduct({categoryId ,productId}) {

  const dispatch = useDispatch();
  useEffect(() => {
    if(categoryId ) dispatch(getProducts(categoryId))
  }, [categoryId]);
  const { products, isLoading } = useSelector((state) => state.product);
  let relatedProducts= products.filter(product => product.id !== productId).slice(0, 6);

  return (
    <>
    <div className="br-found-heading">Related Products</div> 
    <div className='relatedProductsContainer'>
    {relatedProducts.map((product) =>
    <div className="br-sf-widget" key={product.id}>
      <div className="br-sf-widget-merchant-cont">
        <div className="br-sf-widget-merchant-img">
          <img src={product.mainImage}/>
        </div>
        <div className="br-sf-widget-merchant-title">
          <a href={'/products/'+product.id+'/product'}>{product.name}</a>
        </div>
        <div className="br-sf-widget-merchant-desc">
          Details: {product.description}
        </div>
      </div>
    </div>

  )}
    </div>
    </>
  )
}

export default Relatedproduct;
