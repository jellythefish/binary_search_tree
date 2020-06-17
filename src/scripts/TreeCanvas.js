export default class TreeCanvas {
    constructor(canvas) {
        this._canvas = canvas;
        this._canvasWidth = 1440;
        this._canvasHeight = 660;
        this._centerAlignmentOfNode = 12.5;
        this._verticalDistance = 100;
        this._rootY = 20;
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
        this.steps = [];
        this.currentOperation = null;
        this.latestInsertedEdge = null;
        this.latestInsertedNode = null;
    }

    clearCanvas() {
        this._canvas.clear();
    }

    changeNodeKey(node, value) {
        const nodeElement = node.element;
        const textValue = nodeElement.querySelector('.tree__node-key');
        if (textValue) textValue.textContent = value;
    }

    renderTree(currentNode) {
        if (!currentNode) {
            return this.clearCanvas();
        }
        if (currentNode.type === 'root') {
            this.clearCanvas();
            this.renderElement(currentNode);
        } else {
            currentNode === currentNode.parent.rightChild ? this.renderElement(currentNode.parent, "right") 
            : this.renderElement(currentNode.parent, "left");
        }
        if (currentNode.leftChild) this.renderTree(currentNode.leftChild);
        if (currentNode.rightChild) this.renderTree(currentNode.rightChild);
    }

    renderTreeState(stateIndex) {
        if (stateIndex !== this.steps.length - 1) this.removeLatestInsertOperation();
        this.steps.forEach((step) => this.unhighlightNode(step.currentNode));
        let nodeToHighlight, nodeToRender;
        for (let i = 0; i <= stateIndex; ++i) {
            const step = this.steps[i];
            nodeToHighlight = step.currentNode;
            nodeToRender = step.nodeToInsert;
            if (nodeToRender) return this.renderElement(nodeToRender.node, nodeToRender.childSide);
        }
        if (nodeToHighlight) this.highlightNode(nodeToHighlight);
    }

    removeLatestInsertOperation() {
        if (this.latestInsertedEdge) this.latestInsertedEdge.remove();
        if (this.latestInsertedNode) this.latestInsertedNode.remove();
        this.latestInsertedEdge = null;
        this.latestInsertedNode = null;
    }

    renderElement(parentNode, childSide) {
        if (!childSide) {
            parentNode.element = this.insertNode(((this._canvasWidth - this._sunWidth) / 2), this._rootY, parentNode.key, "sun");
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
            node = this._canvas.paper.svg(x + this._centerAlignmentOfNode, y, this._appleWidth, this._appleHeight);
            img = this._canvas.paper.image("./images/apple.svg", 0, 0, this._appleWidth, this._appleHeight);
            img.attr({ class: "tree__apple" });
            text = this._canvas.paper.text(this._nodeKeyPositionXApple, this._nodeKeyPositionYApple, key);
        } else {
            img = this._canvas.paper.image("./images/sun.svg", 0, 0, this._sunWidth, this._sunHeight);
            img.attr({ class: "tree__sun" });
            node = this._canvas.paper.svg(x, y, this._sunWidth, this._sunHeight);
            text = this._canvas.paper.text(this._nodeKeyPositionXSun, this._nodeKeyPositionYSun, key);
        }
        node.attr({ id: key, class: "node", style: "overflow: auto;" });
        text.attr({
            "class": "tree__node-key",
            "fill": "white",
            "dominant-baseline": "middle",
            "text-anchor": "middle"
        });
        node.append(img);
        node.append(text);

        this.latestInsertedNode = node.node;
        const element = document.getElementById(key);
        return element;
    }

    removeNodeAndIncidentEdge(node) {
        if (!node) return; 
        const nodeElement = document.getElementById(`${node.key}`);
        // let shade;
        if (nodeElement) nodeElement.remove();
        const edgeElement = document.getElementById(`e${node.key}`)
        if (edgeElement) edgeElement.remove();
    }

    insertEdge(x1, y1, x2, y2, edgeWidth, parentNode, key, type) { // x_1, y_1 is for parent, x_2, y_2 is for child
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;
        const length = Math.round(Math.sqrt((y1 - y2) ** 2 + (x1 - x2) ** 2));
        const angle = Number.parseInt(Math.atan((y2 - y1) / (x2 - x1)) * 180 / 3.14159) + this._edgeDegreeAlignmenet; 

        const edge = this._canvas.image(`./images/branch-${type}.svg`, centerX + edgeWidth / 2, 
        centerY - length / 2 + this._edgeVerticalAlignment, edgeWidth, length);
        edge.insertBefore(parentNode.element); // for edge not to overflow node

        let newAngle = angle;
        if (x2 > x1) newAngle = angle - 180; // flipping the edge if it connects right child
        edge.attr({ id: `e${key}`, class: "edge" });
        edge.transform(`r${newAngle}`);

        this.latestInsertedEdge = edge.node;
        this._animateEdgeInsert(edge.node, edgeWidth, length);
    }

    _animateEdgeInsert(edge, edgeWidth, length) {
        edge.setAttribute('width', 0);
        edge.setAttribute('height', 0);
        let width = 0;
        let height = 0; 
    
        let widthInterval = setInterval(widthFrame, 10);
        function widthFrame() {
            const nowWidth = Number.parseInt(edge.getAttribute('width'));
            if (nowWidth === edgeWidth) {
                clearInterval(widthInterval);
            } else {
                width++; 
                edge.setAttribute('width', width); 
            }
        }
        let heightInterval = setInterval(heightFrame, 10);
        function heightFrame() {
            const nowHeight = Number.parseInt(edge.getAttribute('height'));
            if (nowHeight === length) {
                clearInterval(heightInterval);
            } else {
                height++; 
                edge.setAttribute('height', height); 
            }
        }
    }

    highlightNode(node) {
        if (!node) return; 
        const svgElement = document.getElementById(`${node.key}`);
        const snapObject = Snap(svgElement);
        const size = svgElement.getAttribute('width');
        const defs = svgElement.getElementsByTagName('defs')[0];
        defs.innerHTML = `
            <filter id="f1" x="-30%" y="-30%" width="200%" height="200%"> 
                <feGaussianBlur in="SourceGraphic" stdDeviation="3">
                </feGaussianBlur> 
            </filter>
        `;
        let cx, cy, radius;
        if (size === '50') {
            cx = 25;
            cy = 30;
            radius = size / 2 + 5;
        } else {
            cx = size / 2;
            cy = size / 2;
            radius = size / 2;
        }
        const highlightCircle = this._canvas.circle(cx, cy, radius);
        highlightCircle.attr({ filter: 'url(#f1)', fill: "#68432D" });
        highlightCircle.prependTo(snapObject);
    }

    unhighlightNode(node) {
        if (!node) return; 
        const svgElement = node.element;
        let shade;
        if (svgElement) shade = svgElement.getElementsByTagName('circle')[0];
        if (shade) shade.remove()
    }
}