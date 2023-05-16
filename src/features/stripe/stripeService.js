import axios from "axios";

const url = 'http://127.0.0.1:8000/user/order/payment/';


const checkout = async (orderId, token) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    const response = await axios.post(url + orderId + "/", {}, config);
    return response.data;
};

const stripeService = {
    checkout,
};

export default stripeService;