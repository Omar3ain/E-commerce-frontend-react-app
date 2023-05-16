import axios from "axios";

const url = 'http://127.0.0.1:8000/user/order/';

const placeOrder = async ( data, token) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    const response = await axios.post(url, data, config);
    return response.data;
};

const deleteOrder = async ( orderId, token) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    const response = await axios.delete(url+ orderId, config);
    return response.data;
}


const orderService = {
    placeOrder,
    deleteOrder
}

export default orderService