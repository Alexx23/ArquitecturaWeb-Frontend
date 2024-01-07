function formatDate(date: Date): string {
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  return formattedDate;
}

export { formatDate };
