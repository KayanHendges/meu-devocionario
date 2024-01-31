import { DateTime } from "luxon";

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && DateTime.fromISO(value).isValid;
}

export const handleDates = (body: any) => {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = DateTime.fromISO(value).toJSDate();
    else if (typeof value === "object") handleDates(value);
  }
};

export const normalizeDate = (date: any): DateTime => {
  if (typeof date === "number") return DateTime.fromMillis(date);
  else if (typeof date === "string") return DateTime.fromISO(date);
  else return DateTime.fromJSDate(date);
};
