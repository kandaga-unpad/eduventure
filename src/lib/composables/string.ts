export const cutString = (str: string, delimiter: string = '-') => {
  const splitted = str.split(delimiter);
  return splitted[0];
}