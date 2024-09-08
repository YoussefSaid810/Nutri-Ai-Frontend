import AxiosFetch from "services/AxiosFetch";

export const UpdatePasswordService = async ({ request }) => {
    let data = await request.formData();

    const userData = {
        old_password: data.get("old_password"),
        new_Password: data.get("new_password"),
        confirm_password: data.get("confirm_password"),
    };

    let retValues = {
        status: -1,
        data: null,
        error: null,
    };

    await AxiosFetch.put(`/auth/user/password`, userData)
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
