export function convertToLocalForDisplay(date: Date) {
  // Get the local time offset in minutes
  const offsetMinutes = utcTime.getTimezoneOffset();
  
  // Calculate the local time by subtracting the offset to the UTC time
  const localTime = new Date(utcTime.getTime() - offsetMinutes * 60 * 1000);

  return localTime;
}
