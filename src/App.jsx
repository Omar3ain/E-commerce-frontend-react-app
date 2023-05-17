import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import pages from './pages';
import Login from './components/user/login';
import Profile from './components/user/profile';
import Register from "./components/user/register/register";

import NavbarComponent from "./components/homePage/Navbar/NavbarComponent";
import CartRoutes from "./pages/CartPage/CartRoutes";
import ProductsRoutes from "./pages/ProductsPage/ProductsRoutes";
import Stripe from './components/stripePayment/Stripe';
import PaymentSuccess from './components/stripePayment/PaymentSuccess';
import Order from './components/order/Order';
import PaymentFail from './components/stripePayment/PaymentFail';
import Orders from './components/order/Orders';
function App() {
  return (
    <>
      {/* <Navigation /> */}

      {/* <pages.HomePage/> */}
      <BrowserRouter basename="/">
        <NavbarComponent />
        <Routes>
          <Route path="" element={<pages.HomePage />} />
          <Route path="/cart/*" element={<CartRoutes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/*" element={< ProductsRoutes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<pages.Wishlist />} />
          <Route path="/order" element={<Order />} />
          <Route path="/user/orders" element={<Orders />} />
          <Route path="/payment" element={<Stripe />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/fail" element={<PaymentFail />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
