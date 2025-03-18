export const formatDateToIndonesian = (date: string) => {
  const options = { weekday: 'long' as const, year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
  return new Date(date).toLocaleDateString('id-ID', options);
}
export const formatDateToIndonesianWithTime = (date: string) => {
  const options = { weekday: 'long' as const, year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const, hour: 'numeric' as const, minute: 'numeric' as const };
  return new Date(date).toLocaleDateString('id-ID', options);
}