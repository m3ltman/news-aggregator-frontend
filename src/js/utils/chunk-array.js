export default function chunkArray(initArray, chunkedArray) {
  let index = 0;
  while (index < initArray.length) {
    chunkedArray.push(initArray.slice(index, 3 + index));
    index += 3;
  }
}
