import React, { useState } from 'react';
import { Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Modal } from '@mui/material';
import styles from './css/Stripe.module.css';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../features/order/orderSlice';
import { useNavigate } from 'react-router';

const Invoice = ({ order, orderItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <Box className={styles['form']} >
        <Typography variant="h5" gutterBottom>
          Invoice #{order.id}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Invoice Date: {order.createdAt}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {/* Customer Name: {customerName} */}
            </Typography>
          </div>
        </Box>

        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.product.price}</TableCell>
                  <TableCell>${item.quantity * item.product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Typography variant="subtitle1">Total Amount: ${order.total_amount}</Typography>
        </Box>
      </Box>
      <Button variant="outlined" color="error" style={{ display: 'flex', margin: '1rem auto' }} onClick={handleOpen}>Cancel Order</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to cancel the order
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your order will be permanently deleted    </Typography>
          <Button variant='outlined' color='error' style={{ margin: '1rem' }} onClick={() => {dispatch(deleteOrder(order.id)); navigate('/products')}}>Yes, delete</Button>
          <Button variant='outlined' color='primary' style={{ margin: '1rem' }} onClick={handleClose}>No</Button>
        </Box>
      </Modal>
    </Box>
  );
};



export default Invoice
