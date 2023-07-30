class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedList {
    constructor(comparator) {
        this.head = null;
        this.tail = null;

        this.comparator = comparator || function (i, j) {
            if (i < j) return -1;
            if (i > j) return 1;
            return 0;
        };
    }

    prepend(value) {
        let newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        if (!this.tail) this.tail = newNode;
    }

    append(value) {
        let newNode = new LinkedListNode(value);
        if (this.tail) this.tail.next = newNode;
        this.tail = newNode;
        if (!this.head) this.head = newNode;
    }

    delete(value) {
        if (!this.head) return;

        while (this.head && this.comparator(this.head.value, value) === 0) {
            this.head = this.head.next;
        }

        let current = this.head;

        if (current !== null) {
            while (current.next) {
                if (this.comparator(current.next.value, value) === 0) {
                    current.next = current.next.next;
                } else {
                    current = current.next;
                }
            }
        }

        if (this.comparator(this.tail.value, value) === 0) {
            this.tail = current;
        }
    }

    deleteHead() {
        if (!this.head) return null;
        let deletedHead = this.head;
    
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
    
        return deletedHead;
    }
    
    deleteTail() {
        const deletedTail = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return deletedTail;
        }
    
        let current = this.head;
        while (current.next) {
            if (!current.next.next) {
                current.next = null;
            } else {
                current = current.next;
            }
        }
    
        this.tail = current;
    
        return deletedTail;
    }

    forEach(callback) {
        let current = this.head;
        while (current) {
            callback(current.value);
            current = current.next;
        }
    }

    reverseForEach(callback) {
        function tick(node) {
            if (node) {
                tick(node.next);
                callback(node.value);
            }
        }
    
        tick(this.head);
    }

    find(value) {
        if (!this.head) return null;
    
        let current = this.head;
    
        while (current) {
            if (this.comparator(current.value, value) === 0) {
                return current;
            }
            current = current.next;
        }

        return null;
    }
}

// find, delete, forEach, reverseForEach: O(n)
// append, prepend, deleteTail, deleteHead: O(1)