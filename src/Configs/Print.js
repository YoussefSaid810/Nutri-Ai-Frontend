const Print = (message, ...optionalParams) => {
    if (process.env.REACT_APP_ENV === "dev")
        optionalParams
            ? console.log(message, ...optionalParams)
            : console.log(message);
};

export default Print;
