const email_validation = (email) => {
    const value = "" + email;
    let retValues = [];

    // 1- Check if email is not empty
    if (value === "") retValues.push("This field is required.");

    // 2- Check for email regex
    const emailRGX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRGX.test(value))
        retValues.push("Please enter a valid email (ex. example@nutriai.com)");

    return retValues;
};

const password_validation = (password, validate = false) => {
    const value = ("" + password).trim();
    let retValues = [];

    // 1- Check if password is not empty
    if (value.length === 0) retValues.push("This field is required.");

    // 2- check for password length
    if (validate && (value.length < 8 || value.length > 32))
        retValues.push(
            "Password length must be in range of [8 - 32] character"
        );

    // 4- check for password regex
    const Small_letter = /^.*[a-z].*$/;
    if (validate && !Small_letter.test(value))
        retValues.push("Password should have at least one small letter [a-z]");
    const Capital_letter = /^.*[A-Z].*$/;
    if (validate && !Capital_letter.test(value))
        retValues.push(
            "Password should have at least one Capital letter [a-z]"
        );
    const Number = /^.*[0-9].*$/;
    if (validate && !Number.test(value))
        retValues.push(
            "Password should have at least one Capital letter [a-z]"
        );
    const Symbol = /^(.*\W.*)$/;
    if (validate && !Symbol.test(value))
        retValues.push(
            "Password should have at least one Symbol like (! @ # $ % ...etc)"
        );

    return retValues;
};

const password_confirmation_validation = (password, confirmation_password) => {
    const value1 = "" + password;
    const value2 = "" + confirmation_password;
    let retValues = [];

    // 1- Check if password confirmation is not empty
    if (value2.length === 0) retValues.push("This field is required.");

    // 2- check for password confirmation
    if (value1 !== value2)
        retValues.push(
            "New password and password confirmation must be the same"
        );

    return retValues;
};

const username_validation = (username) => {
    username = ("" + username).trim().toLowerCase();
    let retValues = [];

    if (username.length < 8 || username.length > 32)
        retValues.push("Username should be in the range of 8 to 32 Character");

    return retValues;
};

module.exports = {
    email_validation,
    password_validation,
    username_validation,
    password_confirmation_validation,
};
