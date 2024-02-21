const formatDateAsString = (date) => {
    const d = new Date(date);
    let month = d.getMonth();
    let year = d.getFullYear();
    let day = d.getDay();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-')
}

module.exports = formatDateAsString;