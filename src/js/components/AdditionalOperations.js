export default class AdditionalOperations {
    constructor(tree, treeCanvas, pseudocode) {
        this._tree = tree;
        this._treeCanvas = treeCanvas;
        this._pseudocode = pseudocode;
        this.operationsBlocked = false;
        this.middlePart = document.querySelector('.middle-part');
        this.canvas = document.getElementById("canvas");
    
        this._findMinButton = document.querySelector('.js-find-min-button'); 
        this._findMaxButton = document.querySelector('.js-find-max-button'); 
        this._findSuccessorButton = document.querySelector('.js-find-successor-button'); 
        this._findPredecessorButton = document.querySelector('.js-find-predecessor-button'); 

        this._findMinButton.addEventListener('click', this._findMin.bind(this));
        this._findMaxButton.addEventListener('click', this._findMax.bind(this));
        this._findPredecessorButton.addEventListener('click', this._findPredecessorButtonHandler.bind(this));
        this._findSuccessorButton.addEventListener('click', this._findSuccessorButtonHandler.bind(this));

        this._findPredecessorFunction = this._findPredecessor;
        this._findPredecessorFunctionObject = this._findPredecessorFunction.bind(this);
        this._findSuccessorFunction = this._findSuccessor;
        this._findSuccessorFunctionObject = this._findSuccessorFunction.bind(this);
    }

    _findMin() {
        if (this.operationsBlocked) return;
        this._treeCanvas.clearTraversedNodes();
        this._pseudocode.initializeFindMin();
        this._tree.findMin();
        this._pseudocode.renderOperation(0, 'findMin');
    }

    _findMax() {
        if (this.operationsBlocked) return;
        this._treeCanvas.clearTraversedNodes();
        this._pseudocode.initializeFindMax();
        this._tree.findMax();
        this._pseudocode.renderOperation(0, 'findMax');
    }

    _findPredecessorButtonHandler() {
        if (this.operationsBlocked) return;
        this.middlePart.classList.add('middle-part_find-node-mode');
        this._findPredecessorButton.classList.add('task__option_find-node-mode');
        this.canvas.addEventListener('click', this._findPredecessorFunctionObject);
    }

    _findSuccessorButtonHandler() {
        if (this.operationsBlocked) return;
        this.middlePart.classList.add('middle-part_find-node-mode');
        this._findSuccessorButton.classList.add('task__option_find-node-mode');
        this.canvas.addEventListener('click', this._findSuccessorFunctionObject);
    }

    _findPredecessor() {
        if (event.target.closest(".node")) {
            const nodeKey = Number.parseInt(event.target.closest(".node").id);
            const node = this._tree.find(nodeKey);
            this._treeCanvas.clearTraversedNodes();
            this._pseudocode.initializeFindPredecessor();
            this._tree.findPredecessor(node);
            this._pseudocode.renderOperation(0, 'findPredecessor');
            this.canvas.removeEventListener('click', this._findPredecessorFunctionObject);
            this.middlePart.classList.remove('middle-part_find-node-mode');
            this._findPredecessorButton.classList.remove('task__option_find-node-mode');
        } else if (!event.target.classList.contains('js-find-predecessor-button')) {
            this.canvas.removeEventListener('click', this._findPredecessorFunctionObject);
            this.middlePart.classList.remove('middle-part_find-node-mode');
            this._findPredecessorButton.classList.remove('task__option_find-node-mode');
        }
    }

    _findSuccessor() {
        if (event.target.closest(".node")) {
            const nodeKey = Number.parseInt(event.target.closest(".node").id);
            const node = this._tree.find(nodeKey);
            this._treeCanvas.clearTraversedNodes();
            this._pseudocode.initializeFindSuccessor();
            this._tree.findSuccessor(node);
            this._pseudocode.renderOperation(0, 'findSuccessor');
            this.canvas.removeEventListener('click', this._findSuccessorFunctionObject);
            this.middlePart.classList.remove('middle-part_find-node-mode');
            this._findSuccessorButton.classList.remove('task__option_find-node-mode');
        } else if (!event.target.classList.contains('js-find-successor-button')) {
            this.canvas.removeEventListener('click', this._findSuccessorFunctionObject);
            this.middlePart.classList.remove('middle-part_find-node-mode');
            this._findSuccessorButton.classList.remove('task__option_find-node-mode');
        }
    }
}