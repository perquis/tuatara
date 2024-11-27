export const formatPriceAsCurrency = (price: number) =>
  Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(price);
