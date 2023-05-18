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
import ContStripe from './components/continuePayment/ContStripe';
import PaymentSuccess from './components/stripePayment/PaymentSuccess';
import Order from './components/order/Order';
import PaymentFail from './components/stripePayment/PaymentFail';
import Orders from './components/order/Orders';
import NotFoundPage from './pages/404Page/NotFoundPage';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <>
      {/* <Navigation /> */}

      {/* <pages.HomePage/> */}
      <BrowserRouter basename="/">
        <NavbarComponent />
        <Routes>
          <Route path="/products/*" element={< ProductsRoutes />} />
          <Route path="/login" element={<Login />} />
          <Route path="" element={<pages.HomePage />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/*" element={<NotFoundPage/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart/*" element=
          {
          <ProtectedRoute>
              <CartRoutes />
          </ProtectedRoute>
          } />
          <Route path="/wishlist" element={<ProtectedRoute><pages.Wishlist /></ProtectedRoute>} />
          <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/user/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Stripe /></ProtectedRoute>} />
          <Route path="/continue-payment" element={<ProtectedRoute><ContStripe /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
          <Route path="/fail" element={<ProtectedRoute><PaymentFail /></ProtectedRoute>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
