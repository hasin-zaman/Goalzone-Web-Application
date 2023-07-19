const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 7);
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
  
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = months[date.getMonth()];
  
    const dateOfMonth = date.getDate();
    const year = date.getFullYear();
  
    return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}, ${dateOfMonth} ${month}, ${year}`;
  };
  
export default formatDate;
  