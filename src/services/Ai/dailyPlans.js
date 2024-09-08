import AxiosFetch from "services/AxiosFetch";

export const getUserDailyPlans = async () => {
    let retValues = {
        status: 200,
        data: null,
        err: null,
    };

    await AxiosFetch.get(`/ai/daily_plans`)
        .then((res) => {
            const { data } = res;
            retValues.data = data;
        })
        .catch((err) => {
            retValues = {
                status: err.response.status,
                data: null,
                err: err.response.data.message,
            };
        });

    return retValues;
};
