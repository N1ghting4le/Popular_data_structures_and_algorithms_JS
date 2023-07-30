import { comparator } from "../../auxiliary_functions.js";

function mergeSort(arr) {
    if (arr.length === 1) return arr;

    const middle = Math.floor(arr.length / 2);

    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return mergeSortedArrays(mergeSort(left), mergeSort(right));
}

function mergeSortedArrays(arr1, arr2) {
    let index1 = 0;
    let index2 = 0;
    const newArr = [];

    while (index1 < arr1.length && index2 < arr2.length) {
        if (comparator(arr1[index1], arr2[index2]) <= 0) {
            newArr.push(arr1[index1]);
            index1++;
        } else {
            newArr.push(arr2[index2]);
            index2++;
        }
    }

    return [...newArr, ...arr1.slice(index1), ...arr2.slice(index2)];
}

// O(n * log(n))