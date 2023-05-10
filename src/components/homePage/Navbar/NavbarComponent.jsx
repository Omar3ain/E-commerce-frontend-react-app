import { useState } from 'react';
import styles from './Navbar.module.css';
import Container from 'react-bootstrap/Container';




function NavbarComponent() {
  const [active,setActive] = useState(false);

  return (
      <div className={styles['navContainer']}>
        <p className={styles['logo']}><span>W</span>ebsite</p>
        <div className={styles['hamburger']}>
        <input type="checkbox" className={styles['hamburger-init']}
          checked={active}
          onChange={() => setActive(!active)}
        />
          <div className={styles['menu']}>
            <div className={styles['bar1']}></div>
            <div className={styles['bar2']}></div>
            <div className={styles['bar3']}></div>
          </div>
        </div> 


            <ul className={`${styles['list']} ${active ? styles['isActive'] : ''} ${active ? styles['newClass'] : ''}`}>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Products</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
      </div>

  );
}

export default NavbarComponent;
