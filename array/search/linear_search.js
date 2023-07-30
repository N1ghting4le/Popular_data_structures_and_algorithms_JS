import { comparator } from "../../auxiliary_functions.js";

function linearSearch(arr, wanted) {
    let found = [];

    arr.forEach((el, i) => {
        if (comparator(el, wanted) === 0) found.push(i);
    });

    return found;
}

// O(n)