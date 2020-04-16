export class Tree {
    constructor(root) {
        this._root = root;
        this._treeCanvas = Snap("#canvas");
    }

    insert(node, currentNode = this._root) {
        if (!node) {
            throw new Error("Не указана вершина для вставки");
        }
        if (!this._root) {
            this._root = node;
            this._renderElement(this._root);
            return;
        }
        if (node.key < currentNode.key) {
            if (!currentNode.leftChild) {
                currentNode.leftChild = node;
                currentNode.leftChild.parent = currentNode;
                this._renderElement(currentNode, "left");
            } else {
                this.insert(node, currentNode.leftChild);
            }
        } else if (node.key === currentNode.key) {
            throw new Error("Данный элемент уже присутствует в дереве");
        } else {
            if (!currentNode.rightChild) {
                currentNode.rightChild = node;
                currentNode.rightChild.parent = currentNode;
                this._renderElement(currentNode, "right");
            } else {
                this.insert(node, currentNode.rightChild);
            }
        }
    }

    find(key, currentNode = this._root) { // returning node if node is found, otherwise null
        if (!key) {
            throw new Error("Не указана вершина для поиска");
        }
        if (!this._root) {
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

    remove(key, currentNode = this._root) {
        if (!key) {
            throw new Error("Не указана вершина для удаления");
        }  
        if (!this._root) {
            throw new Error("В дереве нет ни одной вершины");
        }
        if (key === currentNode.key) {
            if (!currentNode.leftChild && !currentNode.rightChild) {
                if (currentNode === this._root) {
                    return this._root = null;
                }
                currentNode === currentNode.parent.rightChild ? // equal to deleting temporary NodeTree object
                currentNode.parent.rightChild = null : currentNode.parent.leftChild = null
            } else if (!currentNode.leftChild) {
                if (currentNode === this._root) {
                    this._root = currentNode.rightChild;
                    this._root.parent = null;
                    return;
                }
                currentNode === currentNode.parent.rightChild ? // rewriting parent child is equal to deleting old child
                currentNode.parent.rightChild = currentNode.rightChild : currentNode.parent.leftChild = currentNode.rightChild;
                currentNode.rightChild.parent = currentNode.parent;
            } else if (!currentNode.rightChild) {
                if (currentNode === this._root) {
                    this._root = currentNode.leftChild;
                    this._root.parent = null;
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

    renderTree(node = this._root) {
        if (node === this._root) {
            this._treeCanvas.clear();
        }
        if (!node) {
            return;
        }
        if (!node.parent) {
            this._renderElement(node);
        } else {
            node === node.parent.rightChild ? this._renderElement(node.parent, "right") : this._renderElement(node.parent, "left");
        }
        this.renderTree(node.leftChild);
        this.renderTree(node.rightChild);
    }

    _renderElement(parentNode, childSide) {
        if (!childSide) {
            parentNode.element = this._insertNode(1440 / 2, 0, parentNode.key, "sun");
            return;
        }
        const parentY = Number.parseInt(parentNode.element.getAttribute('y'));
        const parentX = Number.parseInt(parentNode.element.getAttribute('x'));
        const childY = parentY + 100;
        let childX;
        if (childSide === "right") { // TODO !!!! СДЕЛАТЬ ЧИСЛА ФЛОТАМИ
            childX = parentX + 720 / (2 ** (childY / 100));
            this._insertEdge(parentX, parentY, childX, childY, 35, parentNode.rightChild.key);
            parentNode.rightChild.element = this._insertNode(childX, childY, parentNode.rightChild.key, "apple");

        } else {
            childX = parentX - 720 / (2 ** (childY / 100));
            this._insertEdge(parentX, parentY, childX, childY, 35, parentNode.leftChild.key);
            parentNode.leftChild.element = this._insertNode(childX, childY, parentNode.leftChild.key, "apple");
        }
    }

    _insertNode(x, y, key, type) {
        const appleWidth = 50;
        const appleHeight = 50;
        const sunWidth = 70;
        const sunHeight = 70;
        let node, img, text;
        if (type === "apple") {
            img = this._treeCanvas.paper.image("./images/apple.svg", 0, 0, appleWidth, appleHeight);
            node = this._treeCanvas.paper.svg(x, y, appleWidth, appleHeight);
            text = this._treeCanvas.paper.text("48%", "63%", key);
        } else {
            img = this._treeCanvas.paper.image("./images/sun.svg", 0, 0, sunWidth, sunHeight);
            node = this._treeCanvas.paper.svg(x, y, sunWidth, sunWidth);
            text = this._treeCanvas.paper.text("50%", "52%", key);
        }
        node.attr({ id: key, class: "node"});
        text.attr({
            "class": "tree__node-key",
            "fill": "white",
            "dominant-baseline": "middle",
            "text-anchor": "middle"
        });
        node.append(img);
        node.append(text);
        const element = document.getElementById(key);
        return element;
    }

    _insertEdge(x1, y1, x2, y2, edgeWidth, key) { // x_1,y_1is for parent, x_2,y_2 is for child
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;
        const length = Math.sqrt((y1 - y2) ** 2 + (x1 - x2) ** 2);
        const angle = -90 + Number.parseInt(Math.atan((y2 - y1) / (x2 - x1)) * 180 / 3.14159); 
        // const branch = Snap.load('./images/branch.svg', (img) => {
        //     node.append(img);
        //     let g = 
        // })
        const edge = this._treeCanvas.image("./images/branch.svg", centerX + edgeWidth / 2 - 10, centerY - length / 2 + 30, edgeWidth, length);
        



        // const edge = this._treeCanvas.image("./images/branch.svg", x1 + 35, y1 + 35, edgeWidth, length);
        let newAngle = angle;
        // const edgeElement = document.getElementById(`e${key}`);
        if (x2 > x1) {
            newAngle = angle - 180;
            // edgeElement.style.transform = "scaleX(-1)";
        }   
        edge.attr({ id: `e${key}`, class: "edge" });
        edge.transform(`r${newAngle}`);


        // edgeElement.style.transform = `rotate(${-newAngle}deg)`;

        // node.attr({ "transform": `rotate(${newAngle}rad)`});
        // let g = this._treeCanvas.group(edge);
        // let bbox = g.getBBox();
        // g.animate({ transform: `r${newAngle},`+ bbox.cx + ',' + bbox.cy }, 0);

    }
}

export class TreeNode {
    constructor(key) {
        this.key = key;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
        this.element = null;
    }
}

// const tree = new Tree();
// tree.insert(new TreeNode(5));
// tree.insert(new TreeNode(6));
// tree.insert(new TreeNode(2));
// tree.insert(new TreeNode(3));
// tree.insert(new TreeNode(1));
// tree.insert(new TreeNode(0));
// tree.insert(new TreeNode(9));
// tree.insert(new TreeNode(7));
// tree.insert(new TreeNode(3.2));
// tree.insert(new TreeNode(2.8));
// tree.insert(new TreeNode(2.9));
// tree.insert(new TreeNode(2.7));
// tree.insert(new TreeNode(2.6));
// tree.insert(new TreeNode(2.65));
// tree.insert(new TreeNode(10));
// tree.remove(5);
// tree.preOrderTraversal(); // 6 2 1 0 3 2.8 2.7 2.6 2.65 2.9 3.2 9 7 10
// tree.remove(2);
// tree.remove(9);
// console.log("\n");
// tree.preOrderTraversal(); // 6 2.6 1 0 3 2.8 2.7 2.65 2.9 3.2 10 7