import Scene from '../../components/homePage/Scene';
import NavbarComponent from '../../components/homePage/Navbar';
import Nexttoscene from '../../components/homePage/Nexttoscene';
import Categories from '../../components/homePage/Categories';
import Footer from '../../components/homePage/Footer';
import styles from './HomePage.module.css'
import Productsicons from '../../components/homePage/Productsicons/Productsicons';
import Featureproducts from '../../components/homePage/Featureproducts/Featureproducts';
import Fashion from '../../components/homePage/Fashion/Fashion';
import Threeboxes from '../../components/homePage/Threeboxes/Threeboxes';

function HomePage() {

  return (
    <>
    <div className={styles['layout']}>
    {/* <NavbarComponent/> */}
    <div style={{ position: 'relative' }}>
        <Nexttoscene/>
        <Scene/>
      </div>
      <Productsicons/>
      <Featureproducts/>
      <Fashion/>
      <Categories/>

      <Threeboxes/>
      <Footer/>
    </div>
    </>
  )
}

export default HomePage;
