/*
 * Distributes font sizes along groups of Median intervals
 */
export const applyFontSizes = topics => {
  // Fetches a sorted array with the values of the volume property
  const volume = topics.map(t => t.volume).sort((a, b) => a - b);

  // Calculates the Mean given the values in the volume array
  const mean = volume.reduce((a, b) => a + b) / volume.length;

  // Fetches the Middle values for the Median, but at thirds instead of halfs
  const middle = (math, array, i) => array[math( (array.length - 1) / 3) * i];

  // The Median at thirds is calculated with the Mean of the given Middles
  const thirdMedian = array => Array.from(Array(3),
    (v, i) => ( middle(Math.floor, array, i) + middle(Math.ceil, array, i) ) / 2);

  // Flatens the array of the Medians below Average and the Medians above Average
  const sixSteps = [...thirdMedian(volume.filter(v => v < mean)),
                    ...thirdMedian(volume.filter(v => v > mean))];

  // Sets the topic ranking by comparing the volume value with the sixSteps scale
  sixSteps.map((v, i, a) => topics
    .filter(t => i == 0 || t.volume > v || t.volume >= v && t.volume <= a[i + 1])
    .map(t => t.rank = i + 1));

  // With the rank, the array of font sizes gets embedded within the size property
  [1, 1.4, 2.2, 3.3, 5.4, 8]
  .map((v, i) => topics.filter(t => t.rank == i + 1).map(t => t.size = `${v}vw`));
}
