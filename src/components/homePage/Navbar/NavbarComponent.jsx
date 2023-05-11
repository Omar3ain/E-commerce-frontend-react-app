import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Navbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

function NavbarComponent() {
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
      <Navbar bg="light" variant="light" className={styles["navbar-pos"]}>
        <Container>
          <a href="" className={styles["logo"]}>
            <span>W</span>ebsite
          </a>
          <Nav>
            <Nav.Link
              href="#home"
              style={{ color: "#2D2A32", fontSize: "18px" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#features"
              style={{ color: "#2D2A32", fontSize: "18px" }}
            >
              Products
            </Nav.Link>
            <Nav.Link
              href="#pricing"
              style={{ color: "#2D2A32", fontSize: "18px" }}
            >
              Pricing
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link
                  href="/"
                  className="btn btn-primary"
                  style={{ color: "#fff", fontSize: "18px", marginRight: 4 }}
                  onClick={onLogout}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  href="/login"
                  className="btn btn-primary"
                  style={{ color: "#fff", fontSize: "18px", marginRight: 4 }}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  href="/register"
                  className="btn btn-primary"
                  style={{ color: "#fff", fontSize: "18px", marginLeft: 4 }}
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
