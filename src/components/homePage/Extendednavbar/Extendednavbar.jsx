import './Extendednavbar.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import CallIcon from '@mui/icons-material/Call';


function Extendednavbar() {
  return (
    <>
      <div className="header_top d_none1">
               <div className="container">
                  <div className="row">
                     <div className="col-md-4">
                        <ul className="conta_icon ">
                           <li><a href="#">< CallIcon/>Call us: 0115 - 152 - 8162</a> </li>
                        </ul>
                     </div>
                     <div className="col-md-4">
                        <ul className="social_icon">
                           <li> <a href="#"> <FacebookIcon/>
                              </a>
                           </li>
                           <li> <a href="#"> < TwitterIcon /></a></li>
                           <li> <a href="#"> < GoogleIcon /></a></li>
                           <li> <a href="#"> <InstagramIcon/>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div className="col-md-4">
                        <div className="se_fonr1">
                           <span className="time_o"> Open hour: 8.00 - 18.00</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
    </>
  )
}

export default Extendednavbar
