import axios from 'axios';
import { API_BASE_URL } from '../../baseUrl';

const url = `${API_BASE_URL}user/wishlist/`;

const addToWishlist = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    const response = await axios.post(url + 'add/' + productId, {}, config);
    return response.data;
};
const removeWishlist = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `token ${token} `,
        },
    };
    const response = await axios.delete(url + productId, config);
    return response.data;
};
const getWishlist = async (token) => {
    const config = {
        headers: {
            Authorization: `token ${token} `,
        },
    };
    const response = await axios.get(url, config);
    return response.data;
}


const wishlistService = {
    addToWishlist,
    removeWishlist,
    getWishlist
}

export default wishlistService