import { Card,  CardContent, Typography  } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentSuccess = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Card style={{ width: '80%', maxWidth: '600px', backgroundColor: '#feffc8e0' }}>
        <CardContent style={{ textAlign: 'center' }}>
          <CheckCircleIcon style={{ fontSize: '80px', color: 'green', marginBottom: '20px' }} />
          <Typography variant="h3" component="h2" style={{ marginBottom: '20px', color: '#29262D' }}>
            Payment Successful
          </Typography>
          <Typography color="textSecondary" style={{ marginBottom: '20px' }}>
            Thank you for your purchase! We appreciate your business and look forward to serving you again soon.
          </Typography>
          <Typography variant="h6" component="h3" style={{ marginTop: '20px', color: '#595630' }}>
            Don't forget to check out our other great products!
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
export default PaymentSuccess;