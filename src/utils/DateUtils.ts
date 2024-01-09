function formatDate(date: Date): string {
  const hoursMinutes = formatHour(date);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${hoursMinutes}`;
  return formattedDate;
}

function formatHour(date: Date): string {
  let hours = date.getHours();
  let hoursStr = hours.toString();
  let minutes = date.getMinutes();
  let minutesStr = minutes.toString();
  if (hours < 10) hoursStr = "0" + hoursStr;
  if (minutes < 10) minutesStr = "0" + minutesStr;
  const formattedDate = `${hoursStr}:${minutesStr}`;
  return formattedDate;
}

function formatCardExpirationDate(date: Date): string {
  const formattedDate = `${date.getMonth() + 1}/${date
    .getFullYear()
    .toString()
    .substr(-2)}`;
  return formattedDate;
}

export { formatDate, formatHour, formatCardExpirationDate };
