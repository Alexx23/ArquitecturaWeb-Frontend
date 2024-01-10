export const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "noviembre",
  "diciembre",
];

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

function formatHumanDay(date: Date): string {
  const formattedDate = `${diasSemana[date.getDay()]}, ${date.getDate()} de ${
    meses[date.getMonth()]
  }`;
  return formattedDate;
}

function truncDay(date: Date): string {
  return date.toISOString().split("T")[0];
}

export {
  formatDate,
  formatHour,
  formatCardExpirationDate,
  formatHumanDay,
  truncDay,
};
