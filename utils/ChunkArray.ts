export function ChunkArrays<T>(iterable: T[], perChunk: number): Array<T[]> {
  if (!Array.isArray(iterable)) {
    return [[]];
  }
  if (!perChunk || perChunk <= 0) {
    return [[...iterable]];
  }

  const inputArray = [...iterable];

  const result = inputArray.reduce((resultArray: T[][], item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return result;
}
