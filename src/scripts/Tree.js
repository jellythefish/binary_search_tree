export default class Tree {
    constructor(root, treeCanvas) {
        this.root = root;
        this._treeCanvas = treeCanvas;
    }

    insert(node, currentNode = this.root) {
        if (!node) {
            throw new Error("Не указана вершина для вставки");
        }
        if (!this.root) {
            this.root = node;
            this.root.type = "root";
            this._treeCanvas.renderElement(this.root);
            return;
        }
        if (node.key < currentNode.key) {
            if (!currentNode.leftChild) {
                currentNode.leftChild = node;
                currentNode.leftChild.type = "node";
                currentNode.leftChild.parent = currentNode;
                this._treeCanvas.renderElement(currentNode, "left");
            } else {
                this.insert(node, currentNode.leftChild);
            }
        } else if (node.key === currentNode.key) {
            throw new Error("Данный элемент уже присутствует в дереве");
        } else {
            if (!currentNode.rightChild) {
                currentNode.rightChild = node;
                currentNode.rightChild.type = "node";
                currentNode.rightChild.parent = currentNode;
                this._treeCanvas.renderElement(currentNode, "right");
            } else {
                this.insert(node, currentNode.rightChild);
            }
        }
    }

    find(key, currentNode = this.root) { // returning node if node is found, otherwise null
        if (!key) {
            throw new Error("Не указана вершина для поиска");
        }
        if (!this.root) {
            throw new Error("В дереве нет ни одной вершины");
        }
        if (key === currentNode.key) {
            return currentNode;
        } else if (key < currentNode.key && currentNode.leftChild) {
            return this.find(key, currentNode.leftChild);
        } else if (key > currentNode.key && currentNode.rightChild) {
            return this.find(key, currentNode.rightChild);
        } else {
            return null;
        }
    }

    remove(key, currentNode = this.root) {
        if (!key) {
            throw new Error("Не указана вершина для удаления");
        }  
        if (!this.root) {
            throw new Error("В дереве нет ни одной вершины");
        }
        if (key === currentNode.key) {
            if (!currentNode.leftChild && !currentNode.rightChild) {
                if (currentNode === this.root) {
                    return this.root = null;
                }
                currentNode === currentNode.parent.rightChild ? // equal to deleting temporary NodeTree object
                currentNode.parent.rightChild = null : currentNode.parent.leftChild = null
            } else if (!currentNode.leftChild) {
                if (currentNode === this.root) {
                    this.root = currentNode.rightChild;
                    this.root.type = 'root';
                    this.root.parent = null;
                    return;
                }
                currentNode === currentNode.parent.rightChild ? // rewriting parent child is equal to deleting old child
                currentNode.parent.rightChild = currentNode.rightChild : currentNode.parent.leftChild = currentNode.rightChild;
                currentNode.rightChild.parent = currentNode.parent;
            } else if (!currentNode.rightChild) {
                if (currentNode === this.root) {
                    this.root = currentNode.leftChild;
                    this.root.type = 'root';
                    this.root.parent = null;
                    return;
                }
                currentNode === currentNode.parent.leftChild ?
                currentNode.parent.leftChild = currentNode.leftChild : currentNode.parent.rightChild = currentNode.leftChild;
                currentNode.leftChild.parent = currentNode.parent;
            } else { // both children exist
                if (!currentNode.rightChild.leftChild) {
                    currentNode.key = currentNode.rightChild.key;
                    currentNode.rightChild = currentNode.rightChild.rightChild;
                    if (currentNode.rightChild) currentNode.rightChild.parent = currentNode; // to update right node parent
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

    inOrderTraversal(node = this.root) { // left-parent-right
        if (!node) {
            return;
        }
        this.inOrderTraversal(node.leftChild);
        console.log(node.key);
        this.inOrderTraversal(node.rightChild);
    } 

    preOrderTraversal(node = this.root) { // parent-left-right
        if (!node) {
            return;
        }
        console.log(node.key);
        this.preOrderTraversal(node.leftChild);
        this.preOrderTraversal(node.rightChild);
    } 

    postOrderTraversal(node = this.root) { // left-right-parent
        if (!node) {
            return;
        }
        this.postOrderTraversal(node.leftChild);
        this.postOrderTraversal(node.rightChild);
        console.log(node.key);
    }
}