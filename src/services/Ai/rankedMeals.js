import AxiosFetch from "services/AxiosFetch";

export const allRankedMeals = async () => {
    let retValues = {
        status: 200,
        data: null,
        err: null,
    };

    await AxiosFetch.get(`/ai/ranked_meals`)
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
