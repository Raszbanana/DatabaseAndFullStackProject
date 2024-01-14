export function convertDepartureDateForNeo4j(date: string): string {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
