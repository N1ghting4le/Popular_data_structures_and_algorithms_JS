import { comparator, swap } from "../../auxiliary_functions.js";

function quickSort(arr, start, end) {
    if (start === undefined) start = 0;
    if (end === undefined) end = arr.length - 1;
  
    if (start >= end) return;
  
    let pivot = partition(arr, start, end);
  
    quickSort(arr, start, pivot - 1);
    quickSort(arr, pivot + 1, end);
}
  
function partition(arr, start, end) {
    let pivotValue = arr[end];
    let pivotIndex = start;
  
    for (let i = start; i < end; i++) {
        if (comparator(arr[i], pivotValue) < 0) {
            swap(arr, i, pivotIndex);
            pivotIndex++;
        }
    }
  
    swap(arr, pivotIndex, end);
  
    return pivotIndex;
}

// O(n**2) in worst case, O(n * log(n)) - average

//quickSort call: [5, 2, 3, 1, 4]; start = 0; end = 4;

//partition call:

//start: [5, 2, 3, 1, 4]; start = 0; end = 4; pivotValue = 4; pivotIndex = 0

//in "for" loop:

//i = 0: [5, 2, 3, 1, 4]; pivotIndex = 0

//i = 1: [2, 5, 3, 1, 4]; pivotIndex = 1

//i = 2: [2, 3, 5, 1, 4]; pivotIndex = 2

//i = 3: [2, 3, 1, 5, 4]; pivotIndex = 3

//swap call: [2, 3, 1, 4, 5]

//return 3 

//pivot = 3

//first recursive quickSort call: [2, 3, 1, 4, 5]; start = 0; end = 2;

//partition call:

//start: [2, 3, 1, 4, 5]; start = 0; end = 2; pivotValue = 1; pivotIndex = 0

//in "for" loop:

//i = 0: [2, 3, 1, 4, 5]; pivotIndex = 0

//i = 1: [2, 3, 1, 4, 5]; pivotIndex = 0

//swap call: [1, 3, 2, 4, 5]

//return 0 

//pivot = 0

//fisrt recursive recursive quickSort call: [1, 3, 2, 4, 5]; start = 0; end = -1 => return nothing

//second recursive recursive quickSort call: [1, 3, 2, 4, 5]; start = 1; end = 2

//partition call:

//start: [1, 3, 2, 4, 5]; start = 1; end = 2; pivotValue = 2; pivotIndex = 1

//in "for" loop:

//i = 1: [1, 3, 2, 4, 5]; pivotIndex = 1

//swap call: [1, 2, 3, 4, 5]

//return 1

//pivot = 1

//fisrt recursive recursive recursive quickSort call: [1, 2, 3, 4, 5]; start = 1; end = 0 => return nothing

//second recursive recursive recursive quickSort call: [1, 2, 3, 4, 5]; start = 2; end = 2 => return nothing

//second recursive quicksort call: [1, 2, 3, 4, 5]; start = 4; end = 4 => return nothing