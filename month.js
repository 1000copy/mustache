 function addMonths(startFrom,n){
    // console.log(startFrom)
    return new Date(startFrom.setMonth(startFrom.getMonth()+n));
}
var a = formatDate(addMonths(new Date("2020-1-3"),1))
var a = formatDate(addMonths(new Date("2020-1-31"),1))
var a = formatDate(addMonths(new Date("2020-1-28"),1))
var a = formatDate(addMonths(new Date("2020-1-29"),1))
var a = formatDate(addMonths(new Date("2020-1-30"),1))
console.log(a)
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}