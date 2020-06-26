export default function sortByFrequency(array) {
  const frequency = {};

  array.forEach(function(value) { frequency[value] = 0; });

  const uniques = array.filter(function(value) {
    return ++frequency[value] == 1;
  });

  return uniques.sort(function(a, b) {
    return frequency[b] - frequency[a];
  });
}
