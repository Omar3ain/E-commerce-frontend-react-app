import axios from 'axios';
import { API_BASE_URL } from './baseUrl';

const url = `${API_BASE_URL}user/order/payment/`;


const checkout = async (orderId, token) => {
    const config = {
        headers: {
            Authorization: `token ${ token }`,
        },
    };
    const response = await axios.post(url + orderId + "/", {}, config);
    return response.data;
};

const continuePayment = async (orderId, token) => {
    const config = {
        headers: {
            Authorization: `token ${ token } `,
        },
    };
    const response = await axios.post(url + orderId + "/continue", {}, config);
    return response.data;
};


const stripeService = {
    checkout,
    continuePayment,
};

export default stripeService;