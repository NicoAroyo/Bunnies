import { days, months, monthsShort } from "./constants.js";

export const formatDateTime = (date) => {
  if (!date) return "";
  const m = new Date(date);
  const dateString =
    m.getUTCDate() + " " + months[m.getUTCMonth()] + " " + m.getUTCFullYear();
  return dateString;
};
