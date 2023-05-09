import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import pages from './pages';
import Login from './components/user/login';

import NavbarComponent from "./components/homePage/Navbar/NavbarComponent";
import CartRoutes from "./pages/CartPage/CartRoutes";
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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
