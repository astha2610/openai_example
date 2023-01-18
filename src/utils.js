import dateFormat from "dateformat";

export const formatDate = (date) => {;
  date = date.toLowerCase().trim();
  const today = new Date();
  var tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  const dateObj = new Date(date);
  if (date === 'today') {
    return dateFormat(today, 'yyyymmdd');
  } else if (date === 'tomorrow') {
    return dateFormat(tomorrow, 'yyyymmdd');
  } else if (dateObj !== 'Invalid Date') {
    const isOldDate = dateDiff(today, dateObj);
    if (isOldDate < 0) {
      const todayYear = today.getFullYear();
      let newDate = dateObj.setFullYear(todayYear);
      if (dateDiff(today, newDate) < 0) {
        newDate = dateObj.setFullYear(todayYear + 1);
      }
      return dateFormat(newDate, 'yyyymmdd');
    }
  }
  return date;
}

export const dateDiff = (date1, date2) => {
  const firstDate = new Date(date1);
  firstDate.setHours(0, 0, 0, 0);
  const secondDate = new Date(date2);
  secondDate.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((secondDate.getTime() - firstDate.getTime()) / (24 * 60 * 60 * 1000));
  return diffDays;
}