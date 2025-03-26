export const formatNumberWithCommas = (value: string) => {
  if (!value) return '';
  const [integerPart, decimalPart] = value.split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};
