import { Typography } from '@mui/material';
import styles from './css/Header.module.css';
import { Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Container className={styles['header']}>
      <Typography variant="h5" className={styles['cart']} >
        My Cart
      </Typography>
    </Container>
  )
}
export default Header;