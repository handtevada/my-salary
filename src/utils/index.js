const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const convertStringToInt = (x) => {
  return parseInt((x === '' ? '0' : x).toString().replace(/,/g, ''));
};

export { numberWithCommas, convertStringToInt };
