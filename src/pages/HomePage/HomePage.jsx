import Scene from '../../components/homePage/Scene';
import NavbarComponent from '../../components/homePage/Navbar';
import Nexttoscene from '../../components/homePage/Nexttoscene';
import Categories from '../../components/homePage/Categories';
import Footer from '../../components/homePage/Footer';
import styles from './HomePage.module.css'
function HomePage() {

  return (
    <>
    <div className={styles['layout']}>
    {/* <NavbarComponent/> */}
      <Nexttoscene/>
      <Scene/>
      <Categories/>
      <Footer/>
    </div>
    </>
  )
}

export default HomePage;
