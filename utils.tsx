export const moveDate = (
  daysToMove: number,
  startDateString = new Date().toString()
) => {
  const startDate = new Date(startDateString);
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + daysToMove);
  return date.toDateString();
};
