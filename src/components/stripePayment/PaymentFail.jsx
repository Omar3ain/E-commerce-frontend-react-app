import { Card,  CardContent, Typography  } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from 'react';


const PaymentFail = () => {

  const {token} = useSelector((store) => store.auth.user);

  const orderId = new URLSearchParams(window.location.search).get(
    "orderId",
  );


  const updatePaymentStatus = async () => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    await axios.put(`http://127.0.0.1:8000/user/order/payment/${orderId}/update`, {}, config);
  };

  useEffect(() => {
    if(orderId){
      updatePaymentStatus();
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Card style={{ width: '80%', maxWidth: '600px', backgroundColor: '#feffc8e0' }}>
        <CardContent style={{ textAlign: 'center' }}>
          <ErrorIcon style={{ fontSize: '80px', color: 'red', marginBottom: '20px' }} />
          <Typography variant="h3" component="h2" style={{ marginBottom: '20px', color: '#29262D' }}>
            Payment Failed
          </Typography>
          <Typography color="textSecondary" style={{ marginBottom: '20px' }}>
            Sorry, your payment could not be processed at this time. Please check your payment details and try again later.
          </Typography>
          <Typography variant="h6" component="h3" style={{ marginTop: '20px', color: '#595630' }}>
            If the problem persists, please contact customer support.
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
export default PaymentFail;