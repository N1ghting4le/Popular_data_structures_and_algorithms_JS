import { LinkedList } from "../linked list/linked_list.js";

const hashTableSize = 32;

class HashTable {
    constructor() {
        this.buckets = Array(hashTableSize).fill(null);
    }

    hash(key) {
        let hash = Array.from(key).reduce((sum, key) => {
            return sum + key.charCodeAt(0);
        }, 0);

        return hash % hashTableSize;
    }

    set(key, value) {
        let index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = new LinkedList();
        }

        let list = this.buckets[index];

        let node = list.find((nodeValue) => nodeValue.key === key);

        if (node) {
            node.value.value = value;
        } else {
            list.append({ key, value });
        }
    }

    get(key) {
        let index = this.hash(key);
        let list = this.buckets[index];

        if (!list) return undefined;

        let node = list.find((nodeValue) => nodeValue.key === key);

        if (node) return node.value.value;

        return undefined;
    }

    delete(key) {
        let index = this.hash(key);
        let list = this.buckets[index];

        if (!list) return;

        let node = list.find((nodeValue) => nodeValue.key === key);
        
        if (!node) return;

        list.delete(node.value);
    }
}