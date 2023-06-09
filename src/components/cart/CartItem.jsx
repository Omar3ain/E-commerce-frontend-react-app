import { Box, Card, CardMedia, CardContent, Typography, IconButton,  Modal, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import styles from './css/CartItem.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const CartItem = ({ item, decreaseQuantityHandler, increaseQuantityHandler,  sendingData }) => {
  const navigate = useNavigate()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};
  const [modalOpen, setModalOpen] = useState(false);
  const confirmDeleteHandler = (id) => {
    setModalOpen(false);
    // delete the item from the cart or do other things
    decreaseQuantityHandler(id);
  };
  return (
    <Box className={styles['cart-item']} sx={{ marginTop: 2 }}>
    <Card sx={{ display: 'flex' }} className={styles['card']}>
      <CardMedia className={styles['card-media']}
        component="img"
        sx={{ width: 110, height: 110, objectFit: 'contain'}}
        image={item.product_id.main_image}
        alt={item.product_id.name}
      />
      
      <CardContent sx={{  flex: 1, display: 'flex', alignItems: 'center', color: '#85822E' }} className={styles['card-content']}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h2" sx={{ marginBottom: '0.5rem', cursor: 'pointer' }} className={styles['item-info']}
          onClick={()=>{navigate(`/products/${item.product_id.id}/product`)}}
          >
            {item.product_id.name}
          </Typography>
          <Typography variant="body2" component="p" className={styles['item-desc']}>
            {item.product_id.description}
          </Typography>
        </Box>
      </CardContent>
      <CardContent  sx={{ display: 'flex', alignItems: 'center', color: '#85822E' }} className={styles['item-details']}>
        <Typography variant="h6" component="p" className={styles['item-price']}>
          ${item.product_id.price}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1.5rem' }} className={styles['item-quantity']}>
          <IconButton aria-label="decrement" size="small" disabled={sendingData} onClick={() => {item.quantity == 1 ? setModalOpen(true) : decreaseQuantityHandler(item.id) }} sx={{ '&:hover': { backgroundColor: 'red', color: 'white' }}} >
            <RemoveIcon className={styles['item-buttons']} />
          </IconButton>
          <Modal open={modalOpen} aria-labelledby="modal-modal-title" onClose={() => setModalOpen(false)}>
              <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Are you sure you want to delete "{item.product_id.name}" ?
                    </Typography>
                    <Box>
                    <Button variant='outlined' color='primary' style={{ margin: '1.5rem' }} onClick={() => setModalOpen(false)}>No</Button>
                    <Button variant='outlined' color='error' style={{ margin: '1.5rem' }} onClick={() => confirmDeleteHandler(item.id)}>
                      Delete
                    </Button>
                    </Box>
              </Box>
          </Modal>
          <Typography variant="h6" component="p" sx={{ marginLeft: 1, marginRight: 1 }} className={styles['item-buttons']} >
            {item.quantity}
          </Typography>
          <IconButton aria-label="increment" size="small" disabled={item.quantity >= 10 || sendingData} onClick={() => {increaseQuantityHandler(item.id, item.quantity)}} sx={{ '&:hover': { backgroundColor: 'green', color: 'white' }}} >
            <AddIcon className={styles['item-buttons']}  />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1.5rem' }} >
          <Typography variant="h6" component="p" sx={{ marginLeft: 1, marginRight: 1 }} className={styles['item-price']}>
            ${item.product_id.price * item.quantity}
          </Typography>
        </Box>
      </CardContent>
      
    </Card>
  </Box>
  )
}
export default CartItem;