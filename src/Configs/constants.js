export const activity_values = [
    {
        view: "Sedentary: little to no exercise or work a desk job",
        value: "SEDENTARY",
    },
    { view: "Light: exercise 1-3 times/week", value: "LIGHT" },
    { view: "Moderate: exercise 4-5 times/week", value: "MODERATE" },
    {
        view: "Very Active: intense exercise 6-7 times/week",
        value: "HEAVY",
    },
    {
        view: "Super Active: very intense exercise daily, or physical job",
        value: "ATHLETE",
    },
];

export const activity_calc_values = [
    {
        view: "Sedentary: little to no exercise or work a desk job",
        value: 1.2,
    },
    { view: "Light: exercise 1-3 times/week", value: 1.375 },
    { view: "Moderate: exercise 4-5 times/week", value: 1.55 },
    {
        view: "Very Active: intense exercise 6-7 times/week",
        value: 1.725,
    },
    {
        view: "Super Active: very intense exercise daily, or physical job",
        value: 1.9,
    },
];

export const goal_values = [
    {
        view: "Overall health improvement: reach the perfect body weight (Recommended)",
        value: "MAINTAIN",
    },
    { view: "Weight Loss: lose some weights", value: "WEIGHTLOSS" },
    {
        view: "Muscles Gain: start building your muscles",
        value: "MUSCLEGAIN",
    },
];

export const getIDX = (values, value, attribute) => {
    let idx = 0;
    values.forEach((val, index) => {
        if (val[attribute] == value) {
            idx = index;
        }
    });
    return idx;
};
