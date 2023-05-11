import axios from 'axios';

const URL = 'http://127.0.0.1:8000/user/'

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

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;

};

const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    login,
    register,
    logout,
};

export default authService;