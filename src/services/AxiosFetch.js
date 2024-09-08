import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

/**
 *
 * `
 */
const AxiosFetch = () => {
    let axiosfetch = axios.create({
        withCredentials: true,
        baseURL:
            process.env.REACT_APP_ENV !== "dev" &&
            !process.env.REACT_APP_BASE_API.startsWith("https")
                ? `https://${process.env.REACT_APP_SERVER_URI}`
                : process.env.REACT_APP_BASE_API,
        headers: {
            "Content-Type": "application/json",
            "Content-Security-Policy": "upgrade-insecure-requests",
        },
    });

    axiosfetch.interceptors.request.use((config) => {
        // Set Authorization header using token from cookies
        config.headers.Authorization = `Bearer ${Cookies.get("TOKEN")}`;
        return config;
    });

    axiosfetch.interceptors.response.use((config) => {
        if (config.status == 401) {
            localStorage.removeItem("user");
            document.location.reload();
        }
        return config;
    });

    // get on axios error

    return axiosfetch;
};

export default AxiosFetch();
