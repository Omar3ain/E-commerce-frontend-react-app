import './Threeboxes.css'

function Threeboxes() {
  return (
    <>
      <div className="three_box">
          <div className="container">
            <div className="row">
                <div className="col-md-4">
                  <div className="gift_box">
                      <i><img src="assets/icon_money.png"/></i>
                      <span>Money Back</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="gift_box">
                      <i><img src="assets/icon_gift.png"/></i>
                      <span>Special Gift</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="gift_box">
                      <i><img src="assets/icon_car.png"/></i>
                      <span>Free Shipping</span>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Threeboxes
