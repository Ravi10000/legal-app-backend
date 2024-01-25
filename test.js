function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    for (let j = i - 1; j >= 0; j--) {
      console.log({ i, j });
      if (arr[j] > currentValue) {
        arr[j + 1] = currentValue;
        break;
      }
      arr[j + 1] = arr[j];
    }
  }
  return arr;
}

console.log({ sortedArray: insertionSort([50, 23, 12, 10, 45, 21, 5]) });
