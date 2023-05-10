import { Routes, Route } from "react-router-dom";
import CartPage from "./CartPage";

const CartRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<CartPage />} />
    </Routes>
  )
}
export default CartRoutes