import Cookies from "js-cookie";
import AxiosFetch from "services/AxiosFetch";

export const EmailVerificationService = async (id, code) => {
    let retValues = {
        status: -1,
        data: null,
        error: null,
    };

    await AxiosFetch.put(`/auth/user/verify/${id}`, { code })
        .then((res) => {
            if (res.status !== 203) {
                let response = res.data;
                Cookies.set("TOKEN", response.TOKEN, { expires: 1 });

                // Update user
                delete response.TOKEN;
                Cookies.set("user", JSON.stringify(response), { expires: 1 });
            }

            retValues = {
                status: res.status,
                data: res.data,
                error: null,
            };
        })
        .catch((err) => {
            retValues = {
                status: err.status || err.response.status || 500,
                data: null,
                error: err.response,
            };
        });

    return retValues;
};
