import { comparator, swap } from "../../auxiliary_functions.js";

function bubbleSort(arr) {
    for (let j = arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (comparator(arr[i], arr[i + 1]) > 0) {
                swap(arr, i, i + 1);
            }
        }
    }
}

// O(n**2)