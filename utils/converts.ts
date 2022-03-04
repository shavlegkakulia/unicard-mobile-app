export const CurrencyConverter = (value: string | number = '0') => {
  return parseFloat(value?.toString())
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const getNumber = (value: string | number | undefined) => {
  let number = value?.toString();
  if (value === undefined) {
    return 0;
  }

  if (!number || number === '') {
    return 0;
  } else {
    if (number.indexOf('.') === -1) {
      return parseInt(number);
    } else {
      return parseFloat(number);
    }
  }
};

export const getString = (value: string | undefined | null) => {
  let string = '';
  if (value === undefined || value === null) {
    string = '';
  }

  if (typeof value === 'string') {
    try {
      string = value;
    } catch (_) {
      string = '';
    }
  }

  return string;
};

export const getArray = (value: Array<any> | undefined) => {
  let array: any = value;
  if (value === undefined) {
    array = [];
  }

  return array;
};
