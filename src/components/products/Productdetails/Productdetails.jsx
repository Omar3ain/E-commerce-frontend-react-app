import './Productdetails.css'

function Productdetails() {
  const imgs = document.querySelectorAll('.img-select a');
  const imgBtns = [...imgs];
  let imgId = 1;
  console.log();
  imgBtns.forEach((imgItem) => {
      imgItem.addEventListener('click', (event) => {
          event.preventDefault();
          imgId = imgItem.dataset.id;
          slideImage();
      });
  });
  
  function slideImage(){
      const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
  
      document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
  }
  
  window.addEventListener('resize', slideImage);
  
  return (
    <>
      <div class = "card-wrapper">
        <div class = "product_card">
          <div class = "product-imgs">
            <div class = "img-display">
              <div class = "img-showcase">
                <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg" alt = "shoe image"/>
                <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt = "shoe image"/>
                <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt = "shoe image"/>
                <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt = "shoe image"/>
              </div>
            </div>
            <div class = "img-select">
              <div class = "img-item">
                <a data-id = "1">
                  <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg" alt = "shoe image"/>
                </a>
              </div>
              <div class = "img-item">
                <a  data-id = "2">
                  <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt = "shoe image"/>
                </a>
              </div>
              <div class = "img-item">
                <a  data-id = "3">
                  <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt = "shoe image"/>
                </a>
              </div>
              <div class = "img-item">
                <a data-id = "4">
                  <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt = "shoe image"/>
                </a>
              </div>
            </div>
          </div>
          <div class = "product-content">
            <h2 class = "product-title">nike shoes</h2>
            {/* <a href = "#" class = "product-link">visit nike store</a> */}
            {/* <div class = "product-rating">
              <i class = "fas fa-star"></i>
              <i class = "fas fa-star"></i>
              <i class = "fas fa-star"></i>
              <i class = "fas fa-star"></i>
              <i class = "fas fa-star-half-alt"></i>
              <span>4.7(21)</span>
            </div> */}

            <div class = "product-price">
              {/* <p class = "last-price">Old Price: <span>$257.00</span></p> */}
              <p class = "new-price">Price: <span>$249.00 (5%)</span></p>
            </div>

            <div class = "product-detail">
              <h2>about this item: </h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
              <ul>
                {/* <li>Color: <span>Black</span></li> */}
                <li>Available: <span>in stock</span></li>
                <li>Category: <span>Shoes</span></li>
                <li>Shipping Area: <span>All over the world</span></li>
                {/* <li>Shipping Fee: <span>Free</span></li> */}
              </ul>
            </div>

            <div class = "purchase-info">
              <input type = "number" min = "0" />
              <button type = "button" class = "btn">
                Add to Cart <i class = "fas fa-shopping-cart"></i>
              </button>
            </div>

          </div>
        </div>
      </div>
      
    </>
  )
}

export default Productdetails
