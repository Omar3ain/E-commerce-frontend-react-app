import axios from "axios";

const url = 'http://127.0.0.1:8000/user/cart/';


const addToCart = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    const response = await axios.post(url + productId + "/", {}, config);
    return response.data;
};


const getCart = async (token) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    const response = await axios.get(url, config);
    return response.data.Cart;
};

const decreaseQuantity = async (cartItemId, token) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    const response = await axios.delete(url + "delete/" + cartItemId + "/", config);
    return response.data;
};

const increaseQuantity = async (cartItemId, token) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    const response = await axios.put(url + "add/" + cartItemId, {}, config);
    return response.data;
};

const cartService = {
    getCart,
    decreaseQuantity,
    increaseQuantity,
    addToCart,
};

export default cartService;