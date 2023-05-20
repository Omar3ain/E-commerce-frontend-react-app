import axios from 'axios';
import { API_BASE_URL } from '../../baseUrl';

const URL = `${API_BASE_URL}user/`

const login = async (userData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post(
        URL + "login/",
        userData,
        config
    );

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const register = async (userData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    };

    const response = await axios.post(
        URL + "create/",
        userData,
        config
    );

    // if (response.data) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
    // }
    return response.data;

};

const logout = () => {
    localStorage.removeItem("user");
};

const updateUserInfo = async (userData, token, id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `token ${ token }`
        },
    };
    const response = await axios.patch(
        URL + `profile / ${ id } /`,
userData,
    config
    )
localStorage.setItem(
    "user",
    JSON.stringify({ ...user, ...response.data })
);
return response.data;
};

const authService = {
    login,
    register,
    logout,
    updateUserInfo,
};

export default authService;