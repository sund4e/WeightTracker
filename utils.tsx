export const moveDate = (
  daysToMove: number,
  startDateString = new Date().toString()
) => {
  const startDate = new Date(startDateString);
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + daysToMove);
  return date.toDateString();
};

export const getDateFromDateString = (dateString?: string): Date => {
  const date = dateString ? new Date(dateString) : new Date();
  return new Date(date.toDateString());
};
