import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

function NavbarComponent() {
  const [active, setActive] = useState(false);
  const { user } = useSelector((state) => state.auth);
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
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          {user ? (
            <>
              <li>
                <a href="/profile">Profile</a>
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
