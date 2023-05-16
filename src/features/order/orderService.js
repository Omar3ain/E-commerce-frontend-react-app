import axios from "axios";

const url = 'http://127.0.0.1:8000/user/order/';

const placeOrder = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    const response = await axios.post(url , {}, config);
    return response.data;
};



const orderService = {
    placeOrder
}

export default orderService