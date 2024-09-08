import AxiosFetch from "services/AxiosFetch";
import Cookies from "js-cookie";

export const AuthService = async ({ request }) => {
    let data = await request.formData();
    let Auth_Type = "" + data.get("auth");
    let response;

    if (Auth_Type.toLowerCase() === "login")
        response = await LoginService(data);
    else response = await RegisterService(data);

    return response;
};

const LoginService = async (formData) => {
    let userData = {
        email: formData.get("loginEmail"),
        password: formData.get("loginPassword"),
    };

    let retValues = {
        api: "login",
        status: -1,
        data: null,
        error: null,
    };

    await AxiosFetch.post(`/auth/login`, userData)
        .then((res) => {
            if (res.status !== 203) {
                let response = res.data;
                Cookies.set("TOKEN", response.TOKEN, { expires: 7 });

                // Update user
                delete response.TOKEN;
            }

            retValues = {
                api: "login",
                status: res.status,
                data: res.data,
                error: null,
            };
        })
        .catch((err) => {
            retValues = {
                api: "login",
                status: err.response.status ? err.response.status : 500,
                data: null,
                error: err.response,
            };
        });

    return retValues;
};

const RegisterService = async (formData) => {
    let userData = {
        name: formData.get("registerUsername"),
        email: formData.get("registerEmail"),
        password: formData.get("registerPassword"),
    };

    let retValues = {
        api: "register",
        status: -1,
        data: null,
        error: null,
    };

    await AxiosFetch.post(`/auth/signup`, userData)
        .then((res) => {
            let response = res.data;

            retValues = {
                api: "register",
                status: res.status,
                data: response,
                error: null,
            };
        })
        .catch((err) => {
            retValues = {
                api: "register",
                status: err.response.status ? err.response.status : 500,
                data: null,
                error: err.response,
            };
        });

    return retValues;
};
