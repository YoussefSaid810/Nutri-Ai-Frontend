import AxiosFetch from "services/AxiosFetch";

export const getAllFoods = async (page, mealsPerPage) => {
    let retValues = {
        data: null,
        err: null,
    };

    await AxiosFetch.get(`/meal`, {
        params: {
            mealsPerPage,
            page,
        },
    })
        .then((res) => {
            const { data } = res;
            retValues.data = data;
        })
        .catch((err) => {
            retValues.err = err;
        });

    return retValues;
};

export const getAdminFoods = async (page, mealsPerPage) => {
    let retValues = {
        data: null,
        err: null,
    };

    await AxiosFetch.get(`/meal/admin`, {
        params: {
            mealsPerPage,
            page,
        },
    })
        .then((res) => {
            const { data } = res;
            retValues.data = data;
        })
        .catch((err) => {
            retValues.err = err;
        });

    return retValues;
};

export const getOneMeal = async (id) => {
    let retValues = {
        status: -1,
        data: null,
        err: null,
    };

    await AxiosFetch.get(`/meal/${id}`)
        .then((res) => {
            const { data } = res;
            retValues = {
                status: res.status,
                data: data,
                err: null,
            };
        })
        .catch((err) => {
            retValues = {
                status: err.status,
                data: null,
                err: err,
            };
        });

    return retValues;
};

export const deleteMeal = async (id) => {
    let retValues = {
        status: -1,
        data: null,
        err: null,
    };

    await AxiosFetch.delete(`/meal/${id}`)
        .then((res) => {
            const { data } = res;
            retValues = {
                status: res.status,
                data: data,
                err: null,
            };
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

export const updateMeal = async (id, updates) => {
    let retValues = {
        status: -1,
        data: null,
        err: null,
    };

    await AxiosFetch.patch(`/meal/${id}`, updates)
        .then((res) => {
            const { data } = res;
            retValues = {
                status: res.status,
                data: data,
                err: null,
            };
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
