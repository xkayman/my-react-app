export const convertTemp = (tempC: number, unit: 'C' | 'F' | 'K') => {
  if (unit === 'F') return (tempC * 9/5) + 32;
  if (unit === 'K') return tempC + 273.15;
  return tempC;
};