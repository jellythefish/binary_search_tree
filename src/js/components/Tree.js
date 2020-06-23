export default class Tree {
    constructor(root, treeCanvas, pseudocode) {
        this.root = root;
        this._treeCanvas = treeCanvas;
        this._pseudocode = pseudocode;
    }

    async insert(node, currentNode = this.root) {
        if (!node) {
            throw new Error("Не указана вершина для вставки");
        }
        if (!this.root) {
            this.root = node;
            this.root.type = "root";
            this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode });
            this._pseudocode.steps.push({ index: 9, lastStep: 1, currentNode, nodeToInsert: { node: this.root } });
            // this._pseudocode.renderOperation(0, 'insert');
            return;
        }
        this._pseudocode.steps.push({ index: 1, lastStep: 0, currentNode });
        if (node.key < currentNode.key) {
            this._pseudocode.steps.push({ index: 2, lastStep: 0, currentNode });
            if (!currentNode.leftChild) {
                currentNode.leftChild = node;
                currentNode.leftChild.type = "node";
                currentNode.leftChild.parent = currentNode;
                this._pseudocode.steps.push({ index: 3, lastStep: 0, currentNode });
                this._pseudocode.steps.push({ index: 9, lastStep: 1, currentNode, nodeToInsert: { node: currentNode, childSide: "left" } });
                // this._pseudocode.renderOperation(0, 'insert');
            } else {
                this._pseudocode.steps.push({ index: 4, lastStep: 0, currentNode });
                this.insert(node, currentNode.leftChild);
            }
        } else if (node.key === currentNode.key) {
            this._pseudocode.steps.push({ index: 5, lastStep: 0, currentNode });
            this._pseudocode.steps.push({ index: 9, lastStep: 1, currentNode });
            this._pseudocode.renderOperation(0, 'insert');
            throw new Error("Данный элемент уже присутствует в дереве");
        } else {
            this._pseudocode.steps.push({ index: 6, lastStep: 0, currentNode });
            if (!currentNode.rightChild) {
                currentNode.rightChild = node;
                currentNode.rightChild.type = "node";
                currentNode.rightChild.parent = currentNode;
                this._pseudocode.steps.push({ index: 7, lastStep: 0, currentNode });
                this._pseudocode.steps.push({ index: 9, lastStep: 1, currentNode, nodeToInsert: { node: currentNode, childSide: "right" } });
                // this._pseudocode.renderOperation(0, 'insert');
            } else {
                this._pseudocode.steps.push({ index: 8, lastStep: 0, currentNode });
                this.insert(node, currentNode.rightChild);
            }
        }
    }

    find(key, currentNode = this.root) { // returning node if node is found, otherwise null
        if (!key) {
            throw new Error("Не указана вершина для поиска.");
        }
        if (!this.root) {
            throw new Error("В дереве нет ни одной вершины.");
        }
        this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode });
        if (key === currentNode.key) {
            this._pseudocode.steps.push({ index: 1, lastStep: 0, currentNode });
            this._pseudocode.steps.push({ index: 8, lastStep: 1, currentNode });
            // this._pseudocode.renderOperation(0, 'find');
            return currentNode;
        } else if (key < currentNode.key) {
            this._pseudocode.steps.push({ index: 2, lastStep: 0, currentNode });
            if (currentNode.leftChild) {
                this._pseudocode.steps.push({ index: 4, lastStep: 0, currentNode });
                return this.find(key, currentNode.leftChild);
            }
            this._pseudocode.steps.push({ index: 3, lastStep: 0, currentNode });
            this._pseudocode.steps.push({ index: 8, lastStep: 1, currentNode });
            // this._pseudocode.renderOperation(0, 'find');
        } else if (key > currentNode.key) {
            this._pseudocode.steps.push({ index: 5, lastStep: 0, currentNode });
            if (currentNode.rightChild) {
                this._pseudocode.steps.push({ index: 7, lastStep: 0, currentNode });
                return this.find(key, currentNode.rightChild);
            }
            this._pseudocode.steps.push({ index: 6, lastStep: 0, currentNode });
            this._pseudocode.steps.push({ index: 8, lastStep: 1, currentNode });
            // this._pseudocode.renderOperation(0, 'find');
        } else {
            return null;
        }
    }

    async remove(key, currentNode = this.root) {
        if (!key) {
            throw new Error("Не указана вершина для удаления");
        }  
        if (!this.root) {
            throw new Error("В дереве нет ни одной вершины");
        }
        this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode });
        if (key === currentNode.key) {
            this._pseudocode.steps.push({ index: 1, lastStep: 0, currentNode });
            if (!currentNode.leftChild && !currentNode.rightChild) { // no children at all
                this._pseudocode.steps.push({ index: 2, lastStep: 0, currentNode });
                if (currentNode === this.root) {
                    this.root = null;
                    this._pseudocode.steps.push({ index: 17, lastStep: 1, currentNode, nodeToRemove: currentNode });
                    await this._pseudocode.renderOperation(0, 'remove');   
                    return;  
                }
                this._pseudocode.steps.push({ index: 17, lastStep: 1, currentNode, nodeToRemove: currentNode });
                currentNode === currentNode.parent.rightChild ? // equal to deleting temporary NodeTree object
                currentNode.parent.rightChild = null : currentNode.parent.leftChild = null
                await this._pseudocode.renderOperation(0, 'remove');
            } else if (!currentNode.leftChild) {
                this._pseudocode.steps.push({ index: 3, lastStep: 0, currentNode });
                if (currentNode === this.root) {
                    this.root = currentNode.rightChild;
                    this.root.type = 'root';
                    this.root.parent = null;
                    this._pseudocode.steps.push({ index: 17, lastStep: 1, currentNode, nodeToRemove: currentNode });
                    await this._pseudocode.renderOperation(0, 'remove');
                    return;
                }
                this._pseudocode.steps.push({ index: 17, lastStep: 1, currentNode, nodeToRemove: currentNode });
                currentNode === currentNode.parent.rightChild ? // rewriting parent child is equal to deleting old child
                currentNode.parent.rightChild = currentNode.rightChild : currentNode.parent.leftChild = currentNode.rightChild;
                currentNode.rightChild.parent = currentNode.parent;
                await this._pseudocode.renderOperation(0, 'remove');
            } else if (!currentNode.rightChild) {
                this._pseudocode.steps.push({ index: 4, lastStep: 0, currentNode });
                if (currentNode === this.root) {
                    this.root = currentNode.leftChild;
                    this.root.type = 'root';
                    this.root.parent = null;
                    this._pseudocode.steps.push({ index: 17, lastStep: 1, currentNode, nodeToRemove: currentNode });
                    await this._pseudocode.renderOperation(0, 'remove');
                    return;
                }
                this._pseudocode.steps.push({ index: 17, lastStep: 1, currentNode, nodeToRemove: currentNode });
                currentNode === currentNode.parent.leftChild ?
                currentNode.parent.leftChild = currentNode.leftChild : currentNode.parent.rightChild = currentNode.leftChild;
                currentNode.leftChild.parent = currentNode.parent;
                await this._pseudocode.renderOperation(0, 'remove');
            } else { // both children exist
                this._pseudocode.steps.push({ index: 5, lastStep: 0, currentNode });
                if (!currentNode.rightChild.leftChild) {
                    this._pseudocode.steps.push({ index: 6, lastStep: 0, currentNode });
                    this._pseudocode.steps.push({ index: 17, lastStep: 1, currentNode, nodeToRemove: { node: currentNode, mode: 'rightChild->parent' }});
                    // currentNode.key = currentNode.rightChild.key;
                    // currentNode.rightChild = currentNode.rightChild.rightChild;
                    // if (currentNode.rightChild) currentNode.rightChild.parent = currentNode; // to update right node parent
                    await this._pseudocode.renderOperation(0, 'remove');
                } else {
                    this._pseudocode.steps.push({ index: 7, lastStep: 0, currentNode: currentNode.rightChild.leftChild });
                    let tmpNode = currentNode.rightChild.leftChild;
                    this._pseudocode.steps.push({ index: 8, lastStep: 0, currentNode: tmpNode });
                    while (tmpNode.leftChild) {
                        tmpNode = tmpNode.leftChild;
                        this._pseudocode.steps.push({ index: 8, lastStep: 0, currentNode: tmpNode });
                    }
                    let newValue = tmpNode.key;
                    this._pseudocode.steps.push({ index: 9, lastStep: 0, nodeToChange: { node: currentNode, newKey: newValue } });
                    // this._treeCanvas.changeNodeKey(currentNode, newValue);
                    this._pseudocode.steps.push({ index: 10, lastStep: 0, currentNode: tmpNode });
                    await this.remove(tmpNode.key, tmpNode);
                    // currentNode.key = newValue;
                }
            }
        } else if (key < currentNode.key) {
            this._pseudocode.steps.push({ index: 11, lastStep: 0, currentNode });
            if (currentNode.leftChild) {
                this._pseudocode.steps.push({ index: 13, lastStep: 0, currentNode });
                await this.remove(key, currentNode.leftChild);
                return;
            }
            this._pseudocode.steps.push({ index: 12, lastStep: 0, currentNode });
            this._pseudocode.steps.push({ index: 17, lastStep: 1, currentNode });
            await this._pseudocode.renderOperation(0, 'remove');
        } else if (key > currentNode.key) {
            this._pseudocode.steps.push({ index: 14, lastStep: 0, currentNode });
            if (currentNode.rightChild) {
                this._pseudocode.steps.push({ index: 16, lastStep: 0, currentNode });
                await this.remove(key, currentNode.rightChild);
                return;
            }
            this._pseudocode.steps.push({ index: 15, lastStep: 0, currentNode });
            this._pseudocode.steps.push({ index: 17, lastStep: 1, currentNode });
            await this._pseudocode.renderOperation(0, 'remove');
        } else {
            throw new Error("В дереве нет данной вершины");
        }
    }

    inOrderTraversal(currentNode = this.root) { // left-parent-right
        if (!this.root) {
            throw new Error("В дереве нет ни одной вершины");
        }
        this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode});
        if (currentNode.leftChild) {
            this._pseudocode.steps.push({ index: 1, lastStep: 0, currentNode: currentNode.leftChild});
            this.inOrderTraversal(currentNode.leftChild);
        }
        this._pseudocode.steps.push({ index: 2, lastStep: 0, currentNode});
        this._pseudocode.steps.push({ index: 3, lastStep: 0, currentNode, nodeToTraverse: currentNode });
        // console.log(currentNode.key);
        this._pseudocode.steps.push({ index: 4, lastStep: 0, currentNode: currentNode});
        if (currentNode.rightChild) {
            this._pseudocode.steps.push({ index: 5, lastStep: 0, currentNode: currentNode.rightChild});
            this.inOrderTraversal(currentNode.rightChild);
        }
        this._pseudocode.steps.push({ index: 6, lastStep: 0, currentNode: currentNode.parent});
    } 

    preOrderTraversal(currentNode = this.root) { // parent-left-right
        if (!this.root) {
            throw new Error("В дереве нет ни одной вершины");
        }
        this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode, nodeToTraverse: currentNode});
        // console.log(currentNode.key);
        this._pseudocode.steps.push({ index: 1, lastStep: 0, currentNode});
        if (currentNode.leftChild){
            this._pseudocode.steps.push({ index: 2, lastStep: 0, currentNode: currentNode.leftChild });
            this.preOrderTraversal(currentNode.leftChild);
        }
        this._pseudocode.steps.push({ index: 3, lastStep: 0, currentNode});
        this._pseudocode.steps.push({ index: 4, lastStep: 0, currentNode});
        if (currentNode.rightChild) {
            this._pseudocode.steps.push({ index: 5, lastStep: 0, currentNode: currentNode.rightChild });
            this.preOrderTraversal(currentNode.rightChild);
        }   
        this._pseudocode.steps.push({ index: 6, lastStep: 0, currentNode: currentNode.parent });
    } 

    postOrderTraversal(currentNode = this.root) { // left-right-parent
        if (!this.root) {
            throw new Error("В дереве нет ни одной вершины");
        }
        this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode });
        if (currentNode.leftChild) {
            this._pseudocode.steps.push({ index: 1, lastStep: 0, currentNode: currentNode.leftChild });
            this.postOrderTraversal(currentNode.leftChild);
        }
        this._pseudocode.steps.push({ index: 2, lastStep: 0, currentNode });
        this._pseudocode.steps.push({ index: 3, lastStep: 0, currentNode });
        if (currentNode.rightChild) {
            this._pseudocode.steps.push({ index: 4, lastStep: 0, currentNode: currentNode.rightChild });
            this.postOrderTraversal(currentNode.rightChild);
        }
        this._pseudocode.steps.push({ index: 5, lastStep: 0, currentNode });
        this._pseudocode.steps.push({ index: 6, lastStep: 0, currentNode, nodeToTraverse: currentNode });
        // console.log(currentNode.key);
    }

    findMin(currentNode = this.root) {
        if (!this.root) {
            throw new Error("В дереве нет ни одной вершины");
        }
        this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode });
        if (currentNode.leftChild) {
            this._pseudocode.steps.push({ index: 1, lastStep: 0, currentNode: currentNode.leftChild });
            return this.findMin(currentNode.leftChild);
        }
        this._pseudocode.steps.push({ index: 2, lastStep: 0, currentNode });
        this._pseudocode.steps.push({ index: 3, lastStep: 1, currentNode });
        return currentNode;
    }

    findMax(currentNode = this.root) {
        if (!this.root) {
            throw new Error("В дереве нет ни одной вершины");
        }
        this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode });
        if (currentNode.rightChild) {
            this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode: currentNode.rightChild });
            return this.findMax(currentNode.rightChild);
        }
        this._pseudocode.steps.push({ index: 2, lastStep: 0, currentNode });
        this._pseudocode.steps.push({ index: 3, lastStep: 1, currentNode });
        return currentNode;
    }

    findPredecessor(currentNode) {
        if (!currentNode) {
            return;
        }
        this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode });
        if (currentNode.leftChild) {
            this._pseudocode.steps.push({ index: 1, lastStep: 0, currentNode: currentNode.leftChild });
            this._pseudocode.steps.push({ index: 2, lastStep: 0, currentNode: currentNode.leftChild });
            return findMaxFromCurrentNode(currentNode.leftChild, this._pseudocode);
        } else {
            let res = currentNode.parent;
            this._pseudocode.steps.push({ index: 6, lastStep: 0, currentNode: res });
            while (res && currentNode === res.leftChild) {
                this._pseudocode.steps.push({ index: 6, lastStep: 0, currentNode: res });
                currentNode = res;
                res = res.parent; 
            }
            this._pseudocode.steps.push({ index: 7, lastStep: 0, currentNode: res });
            this._pseudocode.steps.push({ index: 8, lastStep: 1, currentNode: res });
            return res;
        }

        function findMaxFromCurrentNode(currentNode, pseudocode) {
            pseudocode.steps.push({ index: 3, lastStep: 0, currentNode });
            if (currentNode.rightChild) {
                pseudocode.steps.push({ index: 4, lastStep: 0, currentNode: currentNode.rightChild });
                return findMaxFromCurrentNode(currentNode.rightChild, pseudocode);
            }
            pseudocode.steps.push({ index: 5, lastStep: 0, currentNode });
            pseudocode.steps.push({ index: 7, lastStep: 1, currentNode });
            return currentNode;
        }
    }

    findSuccessor(currentNode) {
        if (!currentNode) {
            return;
        }
        this._pseudocode.steps.push({ index: 0, lastStep: 0, currentNode });
        if (currentNode.rightChild) {
            this._pseudocode.steps.push({ index: 1, lastStep: 0, currentNode: currentNode.rightChild });
            this._pseudocode.steps.push({ index: 2, lastStep: 0, currentNode: currentNode.rightChild });
            return findMinFromCurrentNode(currentNode.rightChild, this._pseudocode);
        } else {
            let res = currentNode.parent;
            this._pseudocode.steps.push({ index: 6, lastStep: 0, currentNode: res });
            while (res && currentNode === res.rightChild) {
                this._pseudocode.steps.push({ index: 6, lastStep: 0, currentNode: res });
                currentNode = res;
                res = res.parent; 
            }
            this._pseudocode.steps.push({ index: 7, lastStep: 0, currentNode: res });
            this._pseudocode.steps.push({ index: 8, lastStep: 1, currentNode: res });
            return res;
        }
      

        function findMinFromCurrentNode(currentNode, pseudocode) {
            pseudocode.steps.push({ index: 3, lastStep: 0, currentNode });
            if (currentNode.leftChild) {
                pseudocode.steps.push({ index: 4, lastStep: 0, currentNode: currentNode.leftChild });
                return findMinFromCurrentNode(currentNode.leftChild, pseudocode);
            }
            pseudocode.steps.push({ index: 5, lastStep: 0, currentNode });
            pseudocode.steps.push({ index: 7, lastStep: 1, currentNode });
            return currentNode;
        }
    }
}
