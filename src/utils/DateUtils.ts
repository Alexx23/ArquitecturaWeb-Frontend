function formatDate(date: Date): string {
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  return formattedDate;
}

function formatHour(date: Date): string {
  const formattedDate = `${date.getHours()}:${date.getMinutes()}`;
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
