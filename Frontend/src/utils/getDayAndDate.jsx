const getDayAndDate = (dateString) => {
    const date = new Date(dateString);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const day = days[date.getDay()];
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
  
    const dateOfMonth = date.getDate();
    const year = date.getFullYear().toString();
  
    return `${day}, ${dateOfMonth} ${month} ${year[2]}${year[3]}`;
  };
  
export default getDayAndDate;
  