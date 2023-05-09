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

const authService = {
    login,
};

export default authService;