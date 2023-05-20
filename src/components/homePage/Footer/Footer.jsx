import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <>
      <footer>
        <div className="footer">
          <div className="container">
              <div className="row">
                <div className="col-md-3">
                    <div className="inror_box">
                      <h3>INFORMATION </h3>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="inror_box">
                      <h3>MY ACCOUNT </h3>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="inror_box">
                      <h3>ABOUT  </h3>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="inror_box">
                      <h3>CONTACTS  </h3>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable</p>
                    </div>
                </div>
              </div>
          </div>
          <div className="copyright">
              <div className="container">
                <div className="row">
                    <div className="col-md-12">
                      <p>Sellio © 2023 All Rights Reserved</p>
                    </div>
                </div>
              </div>
          </div>
        </div>
    </footer>
    </>
  )
}

export default Footer
