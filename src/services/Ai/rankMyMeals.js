import AxiosFetch from "services/AxiosFetch";

export const rankMyMeals = async (preferences, excludes, dietType) => {
    let retValues = {
        status: 200,
        data: null,
        err: null,
    };

    const body = { preferences, excludes, dietType };

    await AxiosFetch.put(`/ai/rank_meals`, body)
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
