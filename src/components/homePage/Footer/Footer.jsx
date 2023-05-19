import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <>
        <footer className="bg-dark text-center text-white">

          <div className="container p-4 pb-0">

            <section className="mb-4">

              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                  <FacebookIcon/>
                </a>

              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                < TwitterIcon/>
                </a>

            
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                < GoogleIcon />
                </a>

              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                <InstagramIcon/>
                </a>

            </section>

          </div>



          <div className="text-center p-3">
            Website © 2023 All Rights Reserved.
          </div>

        </footer>
    </>
  )
}

export default Footer
