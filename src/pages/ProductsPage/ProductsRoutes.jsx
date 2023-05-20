import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import Productdetails from "../../components/products/Productdetails";
const ProductsRoutes = () => {
  return (
    <Routes>
    <Route path="/:categoryId?" element={<Products />} />
    <Route path="/:productId/product" element={<Productdetails />} />
    </Routes>
  )
}
export default ProductsRoutes