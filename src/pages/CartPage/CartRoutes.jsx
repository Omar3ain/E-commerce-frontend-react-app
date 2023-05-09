import { Routes, Route } from "react-router-dom";
import Cart from "../../components/cart/Cart";

const CartRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Cart />} />
    </Routes>
  )
}
export default CartRoutes