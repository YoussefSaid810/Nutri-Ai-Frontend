import axios from "axios";
import Cookies from "js-cookie";

export const UpdateAccountService = async (userData) => {
    let retValues = {
        status: -1,
        data: null,
        error: null,
    };

    await axios
        .put(`${process.env.REACT_APP_BASE_API}/auth/user`, userData, {
            headers: {
                Authorization: `bearer ${Cookies.get("TOKEN")}`,
                "Access-Control-Allow-Origin": process.env.REACT_APP_BASE_URL,
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            retValues = {
                status: res.status,
                data: res.data,
                error: null,
            };
        })
        .catch((err) => {
            try {
                retValues = {
                    status: err.response.status,
                    data: null,
                    error: err.response.data,
                };
            } catch (err) {
                retValues = {
                    status: 500,
                    data: null,
                    error: "Connection Error",
                };
            }
        });

    return retValues;
};
