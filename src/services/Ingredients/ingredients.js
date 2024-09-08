import AxiosFetch from "services/AxiosFetch";

export const getListOfIngredients = async (page, countPerPage) => {
    let retValues = {
        status: 200,
        data: null,
        err: null,
    };

    await AxiosFetch.get(`/ingredient`, {
        params: {
            countPerPage,
            page,
        },
    })
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

export const searchForIngredient = async (key, exceptions) => {
    let retValues = {
        status: 200,
        data: null,
        err: null,
    };

    await AxiosFetch.get(`/ingredient/search`, {
        params: {
            key,
            exceptions: JSON.stringify(exceptions),
        },
    })
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
