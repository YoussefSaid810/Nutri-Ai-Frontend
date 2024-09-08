import AxiosFetch from "services/AxiosFetch";

export const generateOnePlan = async () => {
    let retValues = {
        data: null,
        err: null,
    };

    await AxiosFetch.get(`/ai/generate_one_plan`)
        .then((res) => {
            const { data } = res;
            retValues.data = data;
        })
        .catch((err) => {
            retValues.err = err;
        });

    return retValues;
};
