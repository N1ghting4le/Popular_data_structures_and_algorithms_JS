import { comparator } from "../../auxiliary_functions.js";

function binarySearch(arr, wanted) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let middle = Math.floor((end + start) / 2);

        if (comparator(arr[middle], wanted) === 0) return middle;

        if (comparator(arr[middle], wanted) < 0) start = middle + 1;
        else end = middle - 1;
    }

    return -1;
}

// O(log(n))