import axios from 'axios';
import { API_BASE_URL } from './baseUrl';

const url = `${API_BASE_URL}user/order/`;

const placeOrder = async (data, token) => {
    const config = {
        headers: {
            Authorization: `token ${ token }`,
        },
    };
    const response = await axios.post(url, data, config);
    return response.data;
};

const deleteOrder = async (orderId, token) => {
    const config = {
        headers: {
            Authorization: `token ${ token } `,
        },
    };
    const response = await axios.delete(url + orderId, config);
    return response.data;
}
const getOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `token ${ token } `,
        },
    };
    const response = await axios.get(url, config);
    return response.data;
}


const cancelPayment = async (orderId, token) => {
    const config = {
        headers: {
            Authorization: `token ${ token } `,
        },
    };
    const response = await axios.post(`${API_BASE_URL}user/order/payment/${orderId}/cancel`, {}, config);
return response.data;
};


const orderService = {
    placeOrder,
    deleteOrder,
    getOrders,
    cancelPayment,
}

export default orderService