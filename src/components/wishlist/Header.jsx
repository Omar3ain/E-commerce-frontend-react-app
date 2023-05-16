import { Typography } from '@mui/material';
import styles from './css/Header.module.css';
import { Container } from 'react-bootstrap';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const Header = () => {
  return (
    <Container className={styles['header']} >
        <FavoriteBorderIcon style={{color:'#ECE87D' , fontSize:'3rem'}}/>
      <Typography variant="h4" className={styles['wishlist']} >
        My Wishlist
      </Typography>
    </Container>
  )
}
export default Header;