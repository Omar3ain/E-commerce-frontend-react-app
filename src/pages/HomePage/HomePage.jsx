import Scene from '../../components/homePage/Scene';
import NavbarComponent from '../../components/homePage/Navbar';
import Nexttoscene from '../../components/homePage/Nexttoscene';
import styles from './HomePage.module.css'
function HomePage() {

  return (
    <>
    <div className={styles['layout']}>
    <NavbarComponent/>
    <Nexttoscene/>
    <Scene/>
    </div>
    </>
  )
}

export default HomePage;
