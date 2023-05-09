import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import pages from './pages';
import NavbarComponent from "./components/homePage/Navbar/NavbarComponent";
import CartRoutes from "./pages/CartPage/CartRoutes";
function App() {
  return (
    <>
    <BrowserRouter basename="/">
      <NavbarComponent />
      <Routes>
        <Route path="" element={<pages.HomePage />} />
        <Route path="/cart/*" element={<CartRoutes />} />
      </Routes>
    </BrowserRouter>
    {/* <BrowserRouter basename="/auth">
      <NavbarComponent />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter> */}
    </>
  )
}

export default App
