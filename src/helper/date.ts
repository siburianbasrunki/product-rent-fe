export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTimeRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return `${formatTime(start)} - ${formatTime(end)}`;
};