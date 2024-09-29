import moment from "moment";

export function formatDuration(start: any) {
  const end = new Date().toISOString();

  const duration = moment.duration(moment(end).diff(moment(start)));
  const years = duration.years();
  const months = duration.months();
  const days = duration.days();

  let formattedString = "";

  if (years > 0) {
    formattedString += `${years} year${years > 1 ? "s" : ""} `;
  }

  if (months > 0) {
    formattedString += `${months} month${months > 1 ? "s" : ""} `;
  }

  if (days > 0 && years === 0 && months === 0) {
    formattedString += `${days} day${days > 1 ? "s" : ""}`;
  }

  return formattedString.trim();
}
