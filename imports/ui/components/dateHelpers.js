const DATE_TO_WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getFormattedDate = (date) => {
    return DATE_TO_WEEKDAY[date.getDay()]+', '+(date.getMonth()+1)+'/'+date.getDate();
}

export const getFormattedTime = (date) => {
    let hours = date.getHours();
    let info = 'am';
    if (hours > 11) {
        info = 'pm';
    }
    let mins = date.getMinutes(); 
    return hours+":"+mins+" "+info;
}