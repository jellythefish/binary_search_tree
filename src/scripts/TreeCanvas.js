export default class TreeCanvas {
    constructor(canvas) {
        this._canvas = canvas;
        this._canvasWidth = 1440;
        this._canvasHeight = 660;
        this._centerAlignmentOfNode = 12.5;
        this._verticalDistance = 100;
        this._sunWidth = 70;
        this._sunHeight = 70;
        this._appleWidth = 50;
        this._appleHeight = 50;
        this._edgeWidth = 35;
        this._nodeKeyPositionXApple = '48%';
        this._nodeKeyPositionYApple = '63%';
        this._nodeKeyPositionXSun = '50%';
        this._nodeKeyPositionYSun = '52%';
        this._edgeDegreeAlignmenet = 90;
        this._edgeVerticalAlignment = 25;
    }

    renderTree(currentNode) {
        if (!currentNode) {
            return this._canvas.clear();
        }
        if (currentNode.type === 'root') {
            this._canvas.clear();
            this.renderElement(currentNode);
        } else {
            currentNode === currentNode.parent.rightChild ? this.renderElement(currentNode.parent, "right") 
            : this.renderElement(currentNode.parent, "left");
        }
        if (currentNode.leftChild) this.renderTree(currentNode.leftChild);
        if (currentNode.rightChild) this.renderTree(currentNode.rightChild);
    }

    renderElement(parentNode, childSide) {
        if (!childSide) {
            parentNode.element = this.insertNode(((this._canvasWidth - this._sunWidth) / 2), 0, parentNode.key, "sun");
            return;
        }
        let parentY = Number.parseInt(parentNode.element.getAttribute('y'));
        let parentX = Number.parseInt(parentNode.element.getAttribute('x'));
        if (parentNode.type !== 'root') parentX -= this._centerAlignmentOfNode;
        const childY = parentY + this._verticalDistance;
        if (childSide === "right") {
            const childX = parentX + this._canvasWidth / (2 ** ((childY / this._verticalDistance) + 1));
            this.insertEdge(parentX + this._centerAlignmentOfNode, parentY, childX, childY, this._edgeWidth, 
                parentNode, parentNode.rightChild.key, childSide);
            parentNode.rightChild.element = this.insertNode(childX, childY, parentNode.rightChild.key, "apple");
        } else {
            const childX = parentX - this._canvasWidth / (2 ** ((childY / this._verticalDistance) + 1));
            this.insertEdge(parentX - this._centerAlignmentOfNode,  parentY, childX, childY, this._edgeWidth, 
                parentNode, parentNode.leftChild.key, childSide);
            parentNode.leftChild.element = this.insertNode(childX, childY, parentNode.leftChild.key, "apple");
        }
    }

    insertNode(x, y, key, type) {
        let node, img, text;
        if (type === "apple") {
            img = this._canvas.paper.image("./images/apple.svg", 0, 0, this._appleWidth, this._appleHeight);
            node = this._canvas.paper.svg(x + this._centerAlignmentOfNode, y, this._appleWidth, this._appleHeight);
            text = this._canvas.paper.text(this._nodeKeyPositionXApple, this._nodeKeyPositionYApple, key);
        } else {
            img = this._canvas.paper.image("./images/sun.svg", 0, 0, this._sunWidth, this._sunHeight);
            node = this._canvas.paper.svg(x, y, this._sunWidth, this._sunHeight);
            text = this._canvas.paper.text(this._nodeKeyPositionXSun, this._nodeKeyPositionYSun, key);
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

    insertEdge(x1, y1, x2, y2, edgeWidth, parentNode, key, type) { // x_1, y_1 is for parent, x_2, y_2 is for child
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;
        const length = Math.sqrt((y1 - y2) ** 2 + (x1 - x2) ** 2);
        const angle = Number.parseInt(Math.atan((y2 - y1) / (x2 - x1)) * 180 / 3.14159) - this._edgeDegreeAlignmenet; 

        const edge = this._canvas.image(`/images/branch-${type}.svg`, centerX + edgeWidth / 2, 
        centerY - length / 2 + this._edgeVerticalAlignment, edgeWidth, length);
        edge.insertBefore(parentNode.element); // for edge not to overflow node

        let newAngle = angle;
        if (x2 > x1) newAngle = angle - 180; // flipping the edge if it connects right child
        edge.attr({ id: `e${key}`, class: "edge" });
        edge.transform(`r${newAngle}`);
    }
}