export const paginationDotCount = (dataArray: any[], moduloNumber: number) => {
  let count: number;
  if (dataArray == undefined) {
    count = 0;
  } else if (dataArray.length % moduloNumber > 0) {
    count = Math.trunc(dataArray.length / moduloNumber) + 1;
  } else {
    count = dataArray.length / moduloNumber;
  }

  return count;
};
