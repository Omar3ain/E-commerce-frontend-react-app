import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { getCart } from "../../../features/cart/cartSlice";

function NavbarComponent() {
  const [active, setActive] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {cartItems } = useSelector((state) => state.cart);
  // useEffect(() => {
  //   dispatch(getCart())
  // }, []);
  let cart = cartItems.reduce((acc, cur) => {
    if (!acc.find(item => item.id === cur.id)) {
      acc.push(cur);
    }
    return acc;
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <>
      <div className={styles["navContainer"]}>
        <p className={styles["logo"]} onClick={() => navigate("/")}>
          <span>W</span>ebsite
        </p>
        <div className={styles["hamburger"]}>
          <input
            type="checkbox"
            className={styles["hamburger-init"]}
            checked={active}
            onChange={() => setActive(!active)}
          />
          <div className={styles["menu"]}>
            <div className={styles["bar1"]}></div>
            <div className={styles["bar2"]}></div>
            <div className={styles["bar3"]}></div>
          </div>
        </div>

        <ul
          className={`${styles["list"]} ${active ? styles["isActive"] : ""} ${
            active ? styles["newClass"] : "" }`}>
          <li>
            <p onClick={() => navigate("/")}>Home</p>
          </li>
          <li>
            <p onClick={() => navigate("/products")}>Products</p>
          </li>
          <li>
            <p onClick={() => navigate("/aboutUs")}>About us</p>
          </li>
          {user ? (
            <>
              <li>
                <p onClick={() => navigate("/profile")}>Profile</p>
              </li>
              <li>
              <div>
                <ShoppingCartIcon onClick={() => navigate("/cart")}  style={{ cursor: 'pointer'}}/>
                {cart.length > 0 && <span>{cart.length}</span>}
              </div>
              </li>
              <li>
                <FavoriteIcon  onClick={() => navigate("/wishlist")} style={{ cursor: 'pointer' , color: '#ece87d' }}/>
              </li>
              <li>
                <a href="/" className={"btn btn-primary " + styles['background_btn']} onClick={onLogout}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
              <a href="/login" className={"btn btn-primary " + styles['background_btn']}>
                Login
              </a>
              </li>
              <li>
                <a href="/register" className={"btn btn-primary " + styles['background_btn']}>
                  Register
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default NavbarComponent;
