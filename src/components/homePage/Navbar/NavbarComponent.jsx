import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef, } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getCart } from "../../../features/cart/cartSlice";
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Logout } from "@mui/icons-material";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { API_BASE_URL } from '../../../baseUrl';

function NavbarComponent() {
  const AdminURL = `${API_BASE_URL}admin/`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const ref = useRef();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  let [cart, setCart] = useState(0);
  useEffect(() => {

    dispatch(getCart())
  }, [])

  let cartItem;
  useEffect(() => {
    cartItem = cartItems.reduce((acc, cur) => {
      if (!acc.find((item) => item.id === cur.id)) {
        acc.push(cur);
      }
      return acc;
    }, []);
    localStorage.setItem('cartItems' , JSON.stringify(cartItem.length) );

    setCart(JSON.parse(localStorage.getItem('cartItems')));
  }, [cartItems])
 const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className={styles["navContainer"]}>
        <p className={styles["logo"]} onClick={() => navigate("/")}>
          <span>W</span>ebsite
        </p>
        <div className="d-flex justify-content-end align-items-center">
          <div className={styles["hamburger"]} ref={ref}>
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
            className={`${styles["list"]} ${active ? styles["isActive"] : ""} ${active ? styles["newClass"] : ""
              }`}
          >
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
                  <div>
                    <ShoppingCartIcon
                      onClick={() => navigate("/cart")}
                      style={{ cursor: "pointer" }}
                    />
                    {cart > 0 && <span>{cart}</span>}
                  </div>
                </li>
                <li>
                  <FavoriteIcon
                    onClick={() => navigate("/wishlist")}
                    style={{ cursor: "pointer", color: "#ece87d" }}
                  />
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/login"
                    className={"btn btn-primary " + styles["background_btn"]}
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className={"btn btn-primary " + styles["background_btn"]}
                  >
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
          {user ?
            (<div>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar>{user.name[0].toUpperCase()}</Avatar>
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem disabled style={{ color: "black" }}>{user.name}</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={() => { navigate("/profile"); handleClose() }}><ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>Profile</MenuItem>

                {user.isAdmin && (
                  <MenuItem onClick={() => window.open(AdminURL, "_blank")}><ListItemIcon>
                    <AdminPanelSettingsIcon fontSize="small" />
                  </ListItemIcon>Admin Panel</MenuItem>
                )}


                <MenuItem onClick={() => { navigate("/user/orders"); handleClose() }}>
                  <ListItemIcon>
                    <ReceiptLongIcon fontSize="small" />
                  </ListItemIcon>My orders</MenuItem>
                <Divider style={{ backgroundColor: 'black' }}></Divider>
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <a href="/" style={{ color: 'black', textDecoration: 'none' }} onClick={() => { onLogout(); handleClose() }}>
                    Logout
                  </a></MenuItem>
              </Menu>
            </div>) : ''}
        </div>
      </div>
    </>
  );
}

export default NavbarComponent;
