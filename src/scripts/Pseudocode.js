export default class Pseudocode {
    constructor(container, treeCanvas, timeController) {
        this.container = container;
        this._treeCanvas = treeCanvas;
        this._timeController = timeController;
        this._lines = [];
        this.indentSize = 25;
        this.stepSpeed = null; // in seconds
        this.steps = [];
        this._index = 0;
        this.paused = false;
    }

    async renderOperation(index) {
        this._index = index;
        this._treeCanvas.steps = this.steps;
        this._treeCanvas.latestInsertedNode = null;
        this._treeCanvas.latestInsertedEdge = null;
        this.steps.forEach((step) => this._treeCanvas.unhighlightNode(step.currentNode));
        if (index === 0) this._timeController.initializeTimeline(this.steps.length);
        this.stepSpeed = this._timeController.getCurrentStepSpeed();
        for (let i = index; i < this.steps.length; ++i) {
            if (this.paused) return;
            const elem = this.steps[i];
            await this.makeStep(elem.lastStep, elem.currentNode, elem.nodeToInsert);
        }
    }

    makeStep(lastStep, nodeToHighlight, nodeToRender) {
        if (nodeToHighlight) this._treeCanvas.highlightNode(nodeToHighlight);
        this.highlightLine(this._index);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.paused) return;
                this._index++;
                if (nodeToHighlight) this._treeCanvas.unhighlightNode(nodeToHighlight);
                if (nodeToRender) this._treeCanvas.renderElement(nodeToRender.node, nodeToRender.childSide);
                this._timeController.stepForward();
                if (lastStep) this._timeController.renderPlayPause('play');
                resolve();
            }, this.stepSpeed * 1000 * (!lastStep));
        });
    }
    
    initializeInsert() {
        const linesElements = this.container.querySelectorAll('.pseudocode__line-container');
        linesElements.forEach((line) => line.remove());
        this.steps = [];
        this._lines = [];
        this._treeCanvas.currentOperation = 'insert';
        const lineConstants = [
            { text: 'Дерево пусто?', indentLevel: 0, highlightColor: '#cf8859' }, 
            { text: 'Да: вставляем корень.', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Нет: ключ вставляемой вершины меньше, равен или больше ключа в текущей вершине?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Если <: у текущей вершины есть левый ребенок?', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Нет: вставляем вершину в качестве левого ребенка текущей вершины.', indentLevel: 3, highlightColor: '#fcd462' }, 
            { text: 'Есть: текущей вершиной становится левый ребенок текущей вершины', indentLevel: 3, highlightColor: '#fcd462' }, 
            { text: 'Если ==: данная вершина уже находится в дереве.', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Если >: у текущей вершины есть правый ребенок?', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Нет: вставляем вершину в качестве правого ребенка текущей вершины.', indentLevel: 3, highlightColor: '#fcd462' }, 
            { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины.', indentLevel: 3, highlightColor: '#fcd462' }, 
            { text: 'Конец вставки.', indentLevel: 0, highlightColor: '#cf8859' }, 
        ]
        lineConstants.forEach((elem, index) => {
            const line = document.createElement('div'); 
            if (index === 0) line.style['border-top'] = '0.1px solid #c3a27b';
            line.style['border-bottom'] = '0.1px solid #c3a27b';
            line.classList.add('pseudocode__line-container');
            const text = document.createElement('p');
            text.classList.add('pseudocode__line');
            text.textContent = elem.text;
            text.style.margin = `0 0 0 ${elem.indentLevel * this.indentSize}px`;
            line.append(text);
            this.container.append(line);
            this._lines.push({ line, props: elem });
        })
    }

    initializeFind() {
        const linesElements = this.container.querySelectorAll('.pseudocode__line-container');
        linesElements.forEach((line) => line.remove());
        this.steps = [];
        this._lines = [];
        this._treeCanvas.currentOperation = 'find';
        const lineConstants = [
            { text: 'Ключ искомой вершины меньше, равен или больше ключа в текущей вершине?', indentLevel: 0, highlightColor: '#cf8859' }, 
            { text: 'Если ==: данная вершина есть в дереве.', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Если <: у текущей вершины есть левый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Нет: вершины нет в дереве.', indentLevel: 2, highlightColor: '#e7d0ad' }, 
            { text: 'Есть: текущей вершиной становится левый ребенок текущей вершины', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Если >: у текущей вершины есть правый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Нет: вершины нет в дереве.', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Поиск окончен.', indentLevel: 0, highlightColor: '#cf8859' }, 
        ]
        lineConstants.forEach((elem, index) => {
            const line = document.createElement('div'); 
            if (index === 0) line.style['border-top'] = '0.1px solid #c3a27b';
            line.style['border-bottom'] = '0.1px solid #c3a27b';
            line.classList.add('pseudocode__line-container');
            const text = document.createElement('p');
            text.classList.add('pseudocode__line');
            text.textContent = elem.text;
            text.style.margin = `0 0 0 ${elem.indentLevel * this.indentSize}px`;
            line.append(text);
            this.container.append(line);
            this._lines.push({ line, props: elem });
        })
    }



    // if (key === currentNode.key) {
    //     if (!currentNode.leftChild && !currentNode.rightChild) {
    //         if (currentNode === this.root) {
    //             return this.root = null;
    //         }
    //         currentNode === currentNode.parent.rightChild ? // equal to deleting temporary NodeTree object
    //         currentNode.parent.rightChild = null : currentNode.parent.leftChild = null
    //     } else if (!currentNode.leftChild) {
    //         if (currentNode === this.root) {
    //             this.root = currentNode.rightChild;
    //             this.root.type = 'root';
    //             this.root.parent = null;
    //             return;
    //         }
    //         currentNode === currentNode.parent.rightChild ? // rewriting parent child is equal to deleting old child
    //         currentNode.parent.rightChild = currentNode.rightChild : currentNode.parent.leftChild = currentNode.rightChild;
    //         currentNode.rightChild.parent = currentNode.parent;
    //     } else if (!currentNode.rightChild) {
    //         if (currentNode === this.root) {
    //             this.root = currentNode.leftChild;
    //             this.root.type = 'root';
    //             this.root.parent = null;
    //             return;
    //         }
    //         currentNode === currentNode.parent.leftChild ?
    //         currentNode.parent.leftChild = currentNode.leftChild : currentNode.parent.rightChild = currentNode.leftChild;
    //         currentNode.leftChild.parent = currentNode.parent;
    //     } else { // both children exist
    //         if (!currentNode.rightChild.leftChild) {
    //             currentNode.key = currentNode.rightChild.key;
    //             currentNode.rightChild = currentNode.rightChild.rightChild;
    //             if (currentNode.rightChild) currentNode.rightChild.parent = currentNode; // to update right node parent
    //         } else {
    //             let tmpNode = currentNode.rightChild.leftChild;
    //             while (tmpNode.leftChild) {
    //                 tmpNode = tmpNode.leftChild;
    //             }
    //             let newValue = tmpNode.key;
    //             this.remove(tmpNode.key);
    //             currentNode.key = newValue;
    //         }
    //     }
    // } else if (key < currentNode.key && currentNode.leftChild) {
    //     this.remove(key, currentNode.leftChild);
    // } else if (key > currentNode.key && currentNode.rightChild) {
    //     this.remove(key, currentNode.rightChild);
    // } else {
    //     throw new Error("В дереве нет данной вершины");
    // }


    initializeRemove() {
        const linesElements = this.container.querySelectorAll('.pseudocode__line-container');
        linesElements.forEach((line) => line.remove());
        this.steps = [];
        this._lines = [];
        this._treeCanvas.currentOperation = 'find';
        const lineConstants = [
            { text: 'Ключ искомой вершины меньше, равен или больше ключа в текущей вершине?', indentLevel: 0, highlightColor: '#cf8859' }, 
            { text: 'Если ==: данная вершина есть в дереве.', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Если <: у текущей вершины есть левый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Нет: вершины нет в дереве.', indentLevel: 2, highlightColor: '#e7d0ad' }, 
            { text: 'Есть: текущей вершиной становится левый ребенок текущей вершины', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Если >: у текущей вершины есть правый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Нет: вершины нет в дереве.', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Поиск окончен.', indentLevel: 0, highlightColor: '#cf8859' }, 
        ]
        lineConstants.forEach((elem, index) => {
            const line = document.createElement('div'); 
            if (index === 0) line.style['border-top'] = '0.1px solid #c3a27b';
            line.style['border-bottom'] = '0.1px solid #c3a27b';
            line.classList.add('pseudocode__line-container');
            const text = document.createElement('p');
            text.classList.add('pseudocode__line');
            text.textContent = elem.text;
            text.style.margin = `0 0 0 ${elem.indentLevel * this.indentSize}px`;
            line.append(text);
            this.container.append(line);
            this._lines.push({ line, props: elem });
        })
    }

    highlightLine(stepIndex) {
        this.clearLineHighlights()
        const lineNumber = this.steps[stepIndex].index;
        const line = this._lines[lineNumber];
        line.line.style.background = line.props.highlightColor;
        line.line.children[0].style['font-weight'] = '800';
    }

    clearLineHighlights() {
        this._lines.forEach((elem) => {
            elem.line.style.background = '';
            elem.line.children[0].style['font-weight'] = 'normal';
        })
    }
}