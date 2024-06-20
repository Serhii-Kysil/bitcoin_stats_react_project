export const toUnixTimestamp = (date) => {
  if (!date) return null;
  return Math.floor(new Date(date).getTime() / 1000);
};

export const fromUnixTimestamp = (timestamp) => {
  if (!timestamp) return null;
  return new Date(timestamp * 1000);
};

export const getPreviousDay = (date) => {
  const previousDay = new Date(date);
  previousDay.setDate(date.getDate() - 1);
  return previousDay;
};
