const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
];

export const dateFormat = (date) => {
    const d = new Date(date);
    const hours = d.getHours() % 12 || 12;
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const period = d.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${period} | ${
        months[d.getMonth()]
    } ${d.getDate()}, ${d.getFullYear()}`;
};
