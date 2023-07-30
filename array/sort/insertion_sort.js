import { comparator, swap } from "../../auxiliary_functions.js";

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = i;
        
        while (arr[current - 1] !== undefined && comparator(arr[current], arr[current - 1]) < 0) {
            swap(arr, current - 1, current);
            current--;
        }
    }
}

// O(n**2)