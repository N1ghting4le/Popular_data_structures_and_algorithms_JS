import { Queue } from "../queue/queue_array.js";

class BinaryTreeNode {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.value = value;
    }
  
    get height() {
        let leftHeight = this.left ? this.left.height + 1 : 0;
        let rightHeight = this.right ? this.right.height + 1 : 0;
        return Math.max(leftHeight, rightHeight);
    }

    setLeft(node) {
        if (this.left) {
            this.left.parent = null;
        }
        if (node) {
            this.left = node;
            this.left.parent = this;
        }
    }
    
    setRight(node) {
        if (this.right) {
          this.right.parent = null;
        }
        if (node) {
          this.right = node;
          this.right.parent = this;
        }
    }
}

function traverseDFRecursive(node, callback) {
    callback(node);
    
    if (node.left) {
        traverseDFRecursive(node.left, callback);
    }
    
    if (node.right) {
        traverseDFRecursive(node.right, callback);
    }
}
    
function traverseDF(root, callback) {
    traverseDFRecursive(root, callback);
}

function traverseBF(root, callback) {
    let nodeQueue = new Queue();
    nodeQueue.enqueue(root);
    
    while (!nodeQueue.isEmpty()) {
        let currentNode = nodeQueue.dequeue();
        
        callback(currentNode);
        
        if (currentNode.left) {
            nodeQueue.enqueue(currentNode.left);
        }
        
        if (currentNode.right) {
            nodeQueue.enqueue(currentNode.right);
        }
    }
}

class BinarySearchTreeNode extends BinaryTreeNode {
    constructor(value, comparator) {
        super(value);
        this.comparator = comparator;
    }
    
    insert(value) {
        if (this.comparator(value, this.value) < 0) {
            if (this.left) return this.left.insert(value);
            let newNode = new BinarySearchTreeNode(value, this.comparator);
            this.setLeft(newNode);
        
            return newNode;
        }
    
        if (this.comparator(value, this.value) > 0) {
            if (this.right) return this.right.insert(value);
            let newNode = new BinarySearchTreeNode(value, this.comparator);
            this.setRight(newNode);
        
            return newNode;
        }

        return this;
    }
    
    find(value) {
        if (this.comparator(this.value, value) === 0) return this;
        
        if (this.comparator(this.value, value) < 0 && this.left) {
            return this.left.find(value);
        }
        
        if (this.comparator(this.value, value) > 0 && this.right) {
            return this.right.find(value);
        }
        
        return null;
    }
    
    findMin() {
        if (!this.left) {
            return this;
        }
        
        return this.left.findMin();
    }
    
    removeChild(nodeToRemove) {
        if (this.left && this.left === nodeToRemove) {
            this.left = null;
            return true;
        }
        
        if (this.right && this.right === nodeToRemove) {
            this.right = null;
            return true;
        }
        
        return false;
    }
    
    replaceChild(nodeToReplace, replacementNode) {
        if (!nodeToReplace || !replacementNode) {
            return false;
        }
        
        if (this.left && this.left === nodeToReplace) {
            this.left = replacementNode;
            return true;
        }
        
        if (this.right && this.right === nodeToReplace) {
            this.right = replacementNode;
            return true;
        }
        
        return false;
    }
}
    
class BinarySearchTree {
    constructor(value, comparator) {
        this.root = new BinarySearchTreeNode(value, comparator);
        this.comparator = comparator;
    }
    
    insert(value) {
        if (!this.root.value) this.root.value = value;
        else this.root.insert(value);
    }
    
    find(value) {
        return this.root.find(value);
    }
    
    remove(value) {
        const nodeToRemove = this.find(value);
        
        if (!nodeToRemove) {
            throw new Error('Item not found');
        }
        
        const parent = nodeToRemove.parent;
        
        if (!nodeToRemove.left && !nodeToRemove.right) {
            if (parent) {
                parent.removeChild(nodeToRemove);
            } else {
                nodeToRemove.value = undefined;
            }
        }
        
        else if (nodeToRemove.left && nodeToRemove.right) {
            const nextBiggerNode = nodeToRemove.right.findMin();
        
            if (this.comparator(nextBiggerNode, nodeToRemove.right) === 0) {
                nodeToRemove.value = nodeToRemove.right.value;
                nodeToRemove.setRight(nodeToRemove.right.right);
            } else {
                this.remove(nextBiggerNode.value);
                nodeToRemove.value = nextBiggerNode.value;
            }
        }
        
        else {
            const childNode = nodeToRemove.left || nodeToRemove.right;
        
            if (parent) {
                parent.replaceChild(nodeToRemove, childNode);
            } else {
                this.root = childNode;
            }
        }
        
        nodeToRemove.parent = null;
        
        return true;
    }
}

// O(log(n))