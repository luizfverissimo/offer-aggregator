function priceWithDot(price) {
  const priceString = String(price);
  const position = priceString.length - 2;
  const output =
    priceString.substring(0, position) +
    '.' +
    priceString.substring(position);
  return Number(output).toFixed(2);
}

export { priceWithDot }