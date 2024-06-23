export const toUnixTimestamp = (date) => {
  if (!date) return null;
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return Math.floor(newDate.getTime() / 1000);
};

export const fromUnixTimestamp = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(timestamp * 1000);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getPreviousDay = (date) => {
  const previousDay = new Date(date);
  previousDay.setDate(date.getDate() - 1);
  return previousDay;
};
