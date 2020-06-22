import * as PSEUDOCODE from '../constants/pseudocode';

export default class Pseudocode {
    constructor(container, treeCanvas, timeController) {
        this.container = container;
        this._treeCanvas = treeCanvas;
        this._timeController = timeController;
        this._tree = null;
        this._BasicOperations = null;
        this._pseudocodeOperationTitle = document.querySelector('.pseudocode__operation-title');
        this._buttonClose = document.querySelector('.pseudocode__button');
        this._lines = [];
        this.indentSize = 25;
        this.stepSpeed = null; // in seconds
        this.steps = [];
        this._index = 0;
        this.paused = false;
    }

    async renderOperation(index, type) {
        this._treeCanvas.clearTraversedNodes();
        this.paused = false;
        this._timeController.unblockControllers();
        // if (type === 'remove' || type === 'inorder' || type === 'preorder' || type === 'postorder') this._timeController.blockControllers();
        if (type === 'remove') this._timeController.blockControllers();
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
            await this.makeStep(elem.lastStep, elem.currentNode, elem.nodeToInsert, elem.nodeToRemove, 
                elem.nodeToChange, elem.nodeToTraverse, type);
        }
    }

    makeStep(lastStep, nodeToHighlight, nodeToRender, nodeToRemove, nodeToChange, nodeToTraverse, type) {
        if (nodeToHighlight) this._treeCanvas.highlightNode(nodeToHighlight);
        this.highlightLine(this._index);
        if (nodeToChange) {
            this._treeCanvas.highlightNode(nodeToChange.node);
            this._treeCanvas.changeNodeKey(nodeToChange.node, nodeToChange.newKey);
            nodeToChange.node.key = nodeToChange.newKey;
        }
        if (nodeToRemove && nodeToRemove.mode === 'rightChild->parent') {
            const currentNode = nodeToRemove.node;
            currentNode.key = currentNode.rightChild.key;
            currentNode.rightChild = currentNode.rightChild.rightChild;
            if (currentNode.rightChild) currentNode.rightChild.parent = currentNode; // to update right node parent
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.paused) return;
                this._index++;
                if (nodeToHighlight) this._treeCanvas.unhighlightNode(nodeToHighlight);
                if (nodeToChange)  this._treeCanvas.unhighlightNode(nodeToChange.node);
                if (nodeToRender) this._treeCanvas.renderElement(nodeToRender.node, nodeToRender.childSide);
                if (nodeToRemove) this._treeCanvas.renderTree(this._tree.root);
                if (nodeToTraverse) this._treeCanvas.renderTraversedNode(nodeToTraverse, type);
                this._timeController.stepForward(); 
                if (lastStep) {
                        this._BasicOperations.unblockOperations();
                    this._timeController.renderPlayPause('play');
                }
                resolve();
            }, this.stepSpeed * 1000 * (!lastStep));
        });
    }
    
    initializeInsert() {
        if (this._timeController.prevOperationRenderNotFinished) {
            this._treeCanvas.renderTreeState(this._treeCanvas.steps.length - 1);
        }
        this._clearPseudocodeContainer();
        this._treeCanvas.currentOperation = 'insert';
        const lineConstants = PSEUDOCODE.insert;
        this._pseudocodeOperationTitle.textContent = 'Вставка вершины';
        this.container.style.height = '400px';
        this.container.style.top = '308px';
        this._buttonClose.style.top = '73px';
        this._renderLines(lineConstants);
    }

    initializeFind() {
        this._clearPseudocodeContainer();
        this._treeCanvas.currentOperation = 'find';
        const lineConstants = PSEUDOCODE.find;
        this._pseudocodeOperationTitle.textContent = 'Поиск вершины'
        this.container.style.height = '330px';   
        this.container.style.top = '348px';
        this._buttonClose.style.top = '73px';
        this._renderLines(lineConstants);
    }

    initializeRemove() {
        this._clearPseudocodeContainer();
        this._treeCanvas.currentOperation = 'find';
        const lineConstants = PSEUDOCODE.remove;
        this._pseudocodeOperationTitle.textContent = 'Удаление вершины'
        this.container.style.height = '730px';
        this.container.style.top = '-20px'
        this._buttonClose.style.top = '373px';
        this._renderLines(lineConstants);
    }

    initializeInOrderTraversal() {
        this._clearPseudocodeContainer();
        this._treeCanvas.currentOperation = 'inorder';
        const lineConstants = PSEUDOCODE.inOrderTraversal;
        this._pseudocodeOperationTitle.textContent = 'In-order обход дерева'
        this.container.style.height = '260px';
        this.container.style.top = '400px'
        this._buttonClose.style.top = '53px';
        this._renderLines(lineConstants);
    }

    initializePreOrderTraversal() {
        this._clearPseudocodeContainer();
        this._treeCanvas.currentOperation = 'preorder';
        const lineConstants = PSEUDOCODE.preOrderTraversal;
        this._pseudocodeOperationTitle.textContent = 'Pre-order обход дерева'
        this.container.style.height = '260px';
        this.container.style.top = '400px'
        this._buttonClose.style.top = '53px';
        this._renderLines(lineConstants);
    }

    initializePostOrderTraversal() {
        this._clearPseudocodeContainer();
        this._treeCanvas.currentOperation = 'postorder';
        const lineConstants = PSEUDOCODE.postOrderTraversal;
        this._pseudocodeOperationTitle.textContent = 'Post-order обход дерева'
        this.container.style.height = '260px';
        this.container.style.top = '400px'
        this._buttonClose.style.top = '53px';
        this._renderLines(lineConstants);
    }

    initializeFindMin() {
        this._clearPseudocodeContainer();
        this._treeCanvas.currentOperation = 'findMin';
        const lineConstants = PSEUDOCODE.findMin;
        this._pseudocodeOperationTitle.textContent = 'Поиск минимума'
        this.container.style.height = '160px';
        this.container.style.top = '400px';
        this._buttonClose.style.top = '23px';
        this._renderLines(lineConstants);
    }

    initializeFindMax() {
        this._clearPseudocodeContainer();
        this._treeCanvas.currentOperation = 'findMax';
        const lineConstants = PSEUDOCODE.findMax;
        this._pseudocodeOperationTitle.textContent = 'Поиск максимума'
        this.container.style.height = '160px';
        this.container.style.top = '400px';
        this._buttonClose.style.top = '23px';
        this._renderLines(lineConstants);
    }

    initializeFindPredecessor() {
        this._clearPseudocodeContainer();
        this._treeCanvas.currentOperation = 'findPredecessor';
        const lineConstants = PSEUDOCODE.findPredecessor;
        this._pseudocodeOperationTitle.textContent = 'Поиск предшественника'
        this.container.style.height = '260px';
        this.container.style.top = '400px';
        this._buttonClose.style.top = '53px';
        this._renderLines(lineConstants);
    }

    initializeFindSuccessor() {
        this._clearPseudocodeContainer();
        this._treeCanvas.currentOperation = 'findSuccessor';
        const lineConstants = PSEUDOCODE.findSuccessor;
        this._pseudocodeOperationTitle.textContent = 'Поиск преемника';
        this.container.style.height = '260px';
        this.container.style.top = '400px';
        this._buttonClose.style.top = '53px';
        this._renderLines(lineConstants);
    }   

    _renderLines(lineConstants) {
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

    _clearPseudocodeContainer() {
        const linesElements = this.container.querySelectorAll('.pseudocode__line-container');
        linesElements.forEach((line) => line.remove());
        this.steps = [];
        this._lines = [];
    }


    highlightLine(stepIndex) {
        this.clearLineHighlights()
        const lineNumber = this.steps[stepIndex];
        if (lineNumber) {
            const line = this._lines[lineNumber.index];
            line.line.style.background = line.props.highlightColor;
            line.line.children[0].style['font-weight'] = '800';
        }
    }

    clearLineHighlights() {
        this._lines.forEach((elem) => {
            elem.line.style.background = '';
            elem.line.children[0].style['font-weight'] = 'normal';
        })
    }

    linkTree(tree) {
        this._tree = tree;
    }

    linkBasicOperations(BasicOperations) {
        this._BasicOperations = BasicOperations;
    }
}