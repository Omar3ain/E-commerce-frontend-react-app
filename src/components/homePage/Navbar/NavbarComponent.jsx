import styles from './Navbar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function NavbarComponent() {
  return (
    <>
    <Navbar bg="light" variant="light" className={styles['navbar-pos']}>
        <Container>
          <a href=""className={styles['logo']}><span>W</span>ebsite</a>
          <Nav>
            <Nav.Link href="#home"style={{ color: '#2D2A32',fontSize:'18px'}} >Home</Nav.Link>
            <Nav.Link href="#features" style={{ color: '#2D2A32',fontSize:'18px' }} >Products</Nav.Link>
            <Nav.Link href="#pricing" style={{ color: '#2D2A32',fontSize:'18px' }} >Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  </>
  )
}

export default NavbarComponent;
