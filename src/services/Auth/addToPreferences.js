import Cookies from "js-cookie";
import AxiosFetch from "services/AxiosFetch";

export const AddToPreferences = async (mealId) => {
    let retVal = {
        status: -1,
        data: null,
        error: null,
    };
    const meal = {
        meal: mealId,
    };

    await AxiosFetch.put(`/auth/user/preference`, meal)
        .then((res) => {
            retVal = {
                status: res.status,
                data: res.data,
                error: null,
            };
        })
        .catch((err) => {
            retVal = {
                status: err.response.status,
                data: null,
                error: err.message,
            };
        });
    return retVal;
};
