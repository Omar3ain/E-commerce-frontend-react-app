import axios from "axios";

const url = 'http://127.0.0.1:8000/user/wishlist/add/';

const addToWishlist = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    const response = await axios.post(url + productId , {}, config);
    return response.data;
};


const wishlistService = {
    addToWishlist
}

export default wishlistService