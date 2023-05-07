import styles from './Nexttoscene.module.css';


function Nexttoscene() {
  return (
    <>
    <div className={styles['layout']}>
      <div className={styles['text']}>
      <h1 >Welcome to our store!</h1>
      <p>Discover our wide selection of top-quality products at unbeatable prices. From electronics to fashion, home goods to beauty products, we have everything you need to live your best life. Shop now and take advantage of our exclusive deals and promotions, only available on our website!</p>
      <button>Click here to start!</button>
      </div>
      <div className={styles['flex-wrap']}></div>
    </div>
    </>
  )
}

export default Nexttoscene;
