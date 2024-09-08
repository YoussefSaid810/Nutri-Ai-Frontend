import AxiosFetch from "services/AxiosFetch";

export const UpdateInformationService = async ({ request }) => {
    let data = await request.formData();

    const userData = {
        activity: data.get("activity"),
        goal: data.get("goal"),
        gender: data.get("gender"),
    };

    if (data.get("height") != "") userData.height = Number(data.get("height"));
    if (data.get("weight") != "") userData.weight = Number(data.get("weight"));
    if (data.get("age") != "") userData.age = Number(data.get("age"));

    let retValues = {
        status: -1,
        data: null,
        error: null,
    };

    await AxiosFetch.put(`/auth/user/info`, userData)
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
