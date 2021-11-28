/**
 * @param value Recieves a date string format, default dd/mm/yyyy
 * @param pattern Recieves date string format as regex value
 * @returns Date
 */
export const stringToDate = (
  value: string,
  pattern = /(\d{2})\/(\d{2})\/(\d{4})/
) => {
  return new Date(value.replace(pattern, '$3-$2-$1'))
}
