class Tree {
    constructor(root) {
        this._root = root;
    }

    insert(node, currentNode = this._root) {
        if (!node) {
            throw new Error("Не указана вершина для вставки");
        }
        if (!this._root) {
            return this._root = node;
        }
        if (node.key < currentNode.key) {
            if (!currentNode.leftChild) {
                currentNode.leftChild = node;
                currentNode.leftChild.parent = currentNode;
            } else {
                this.insert(node, currentNode.leftChild);
            }
        } else if (node.key === currentNode.key) {
            throw new Error("Данный элемент уже присутствует в дереве");
        } else {
            if (!currentNode.rightChild) {
                currentNode.rightChild = node;
                currentNode.rightChild.parent = currentNode;
            } else {
                this.insert(node, currentNode.rightChild);
            }
        }
    }

    find(node, currentNode = this._root) { // returning node if node is found, otherwise null
        if (!node) {
            throw new Error("Не указана вершина для вставки");
        }
        if (!this._root) {
            return new Error("В дереве нет ни одной вершины");
        }
        if (node.key === currentNode.key) {
            return currentNode;
        } else if (node.key < currentNode.key && currentNode.leftChild) {
            return this.find(node, currentNode.leftChild);
        } else if (node.key > currentNode.key && currentNode.rightChild) {
            return this.find(node, currentNode.rightChild);
        } else {
            return null;
        }
    }

    remove(key, currentNode = this._root) {
        if (!key) {
            throw new Error("Не указана вершина для удаления");
        }  
        if (!this._root) {
            return new Error("В дереве нет ни одной вершины");
        }
        if (key === currentNode.key) {
            if (!currentNode.leftChild && !currentNode.rightChild) {
                currentNode === currentNode.parent.rightChild ? // equal to deleting temporary NodeTree object
                currentNode.parent.rightChild = null : currentNode.parent.leftChild = null
            } else if (!currentNode.leftChild) {
                currentNode === currentNode.parent.rightChild ? // rewriting parent child is equal to deleting old child
                currentNode.parent.rightChild = currentNode.rightChild : currentNode.parent.leftChild = currentNode.rightChild;
            } else if (!currentNode.rightChild) {
                currentNode === currentNode.parent.leftChild ?
                currentNode.parent.leftChild = currentNode.leftChild : currentNode.parent.rightChild = currentNode.leftChild;
            } else { // both children exist
                if (!currentNode.rightChild.leftChild) {
                    currentNode.key = currentNode.rightChild.key;
                    currentNode.rightChild = currentNode.rightChild.rightChild;
                } else {
                    let tmpNode = currentNode.rightChild.leftChild;
                    while (tmpNode.leftChild) {
                        tmpNode = tmpNode.leftChild;
                    }
                    let newValue = tmpNode.key;
                    this.remove(tmpNode.key);
                    currentNode.key = newValue;
                }
            }
        } else if (key < currentNode.key && currentNode.leftChild) {
            this.remove(key, currentNode.leftChild);
        } else if (key > currentNode.key && currentNode.rightChild) {
            this.remove(key, currentNode.rightChild);
        } else {
            throw new Error("В дереве нет данной вершины");
        }
    }

    inOrderTraversal(node = this._root) { // left-parent-right
        if (!node) {
            return;
        }
        this.inOrderTraversal(node.leftChild);
        console.log(node.key);
        this.inOrderTraversal(node.rightChild);
    } 

    preOrderTraversal(node = this._root) { // parent-left-right
        if (!node) {
            return;
        }
        console.log(node.key);
        this.preOrderTraversal(node.leftChild);
        this.preOrderTraversal(node.rightChild);
    } 

    postOrderTraversal(node = this._root) { // left-right-parent
        if (!node) {
            return;
        }
        this.postOrderTraversal(node.leftChild);
        this.postOrderTraversal(node.rightChild);
        console.log(node.key);
    }
}

class TreeNode {
    constructor(key) {
        this.key = key;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
    }
}

const tree = new Tree();
tree.insert(new TreeNode(5));
tree.insert(new TreeNode(6));
tree.insert(new TreeNode(2));
tree.insert(new TreeNode(3));
tree.insert(new TreeNode(1));
tree.insert(new TreeNode(0));
tree.insert(new TreeNode(9));
tree.insert(new TreeNode(7));
tree.insert(new TreeNode(3.2));
tree.insert(new TreeNode(2.8));
tree.insert(new TreeNode(2.9));
tree.insert(new TreeNode(2.7));
tree.insert(new TreeNode(2.6));
tree.insert(new TreeNode(2.65));
tree.insert(new TreeNode(10));
tree.remove(5);
tree.preOrderTraversal(); // 6 2 1 0 3 2.8 2.7 2.6 2.65 2.9 3.2 9 7 10
tree.remove(2);
tree.remove(9);
console.log("\n");
tree.preOrderTraversal(); // 6 2.6 1 0 3 2.8 2.7 2.65 2.9 3.2 10 7