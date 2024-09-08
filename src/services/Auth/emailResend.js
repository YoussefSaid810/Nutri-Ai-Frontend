import AxiosFetch from "services/AxiosFetch";

export const EmailResend = async (id) => {
    let retValues = {
        status: -1,
        error: null,
    };

    await AxiosFetch.put(`/auth/user/resend/${id}`)
        .then((res) => {
            retValues = {
                status: res.status,
                error: null,
            };
        })
        .catch((err) => {
            retValues = {
                status: err.response.status,
                error: err.response.data.message,
            };
        });

    return retValues;
};
