export default class TreeOperations {
    constructor(tree, treeCanvas, pseudocode, dependencies) {
        this._pseudocode = pseudocode;
        this._tree = tree;
        this._treeCanvas = treeCanvas;
        
        this.insertButton = document.querySelector('.basic-operations__operation-title_leaf');
        this.insertInput = document.querySelector(".basic-operations__input_leaf");
        this.findButton = document.querySelector('.basic-operations__operation-title_apple');
        this.findInput = document.querySelector(".basic-operations__input_apple");
        this.removeButton = document.querySelector('.basic-operations__operation-title_cross');
        this.clearButton = document.querySelector('.clear-button');
        this.middlePart = document.querySelector('.middle-part');
        this.canvas = document.getElementById("canvas");
        this.TreeNode = dependencies.treeNode;
        this.operationsBlocked = false;
            
        this.insertButton.addEventListener('click', this.insertButtonHandler.bind(this));
        this.findButton.addEventListener('click', this.findButtonHandler.bind(this));
        this.removeButton.addEventListener('click', this.removeButtonHandler.bind(this));
        this.clearButton.addEventListener('click', this.clearCanvasHandler.bind(this));
    
    
        this._nodeHandlerFunction = this.nodeHandler;
        this._nodeHandlerFunctionObject = this._nodeHandlerFunction.bind(this);
    }

    blockOperations() {
        this.operationsBlocked = true;
        this.insertButton.style.color = '#cccccc';
        this.findButton.style.color = '#cccccc';
        this.removeButton.style.color = '#cccccc';
        this.clearButton.style.background = '#cccccc';
        this.insertButton.style.cursor = 'auto';
        this.findButton.style.cursor = 'auto';
        this.removeButton.style.cursor = 'auto';
        this.clearButton.style.cursor = 'auto';
        this.clearButton.style.background = '#cccccc';
        this.insertButton.style['-webkit-text-stroke'] = '0px';
        this.findButton.style['-webkit-text-stroke'] = '0px';
        this.removeButton.style['-webkit-text-stroke'] = '0px';
    }

    unblockOperations() {
        this.operationsBlocked = false;
        this.insertButton.style.color = '#fff';
        this.findButton.style.color = '#fff';
        this.removeButton.style.color = '#fff';
        this.clearButton.style.background = 'rgba(218, 173, 108, .6)';
        this.insertButton.style.cursor = 'pointer';
        this.findButton.style.cursor = 'pointer';
        this.removeButton.style.cursor = 'pointer';
        this.clearButton.style.cursor = 'pointer';
        this.insertButton.style['-webkit-text-stroke'] = '1px #8ab04a'
        this.findButton.style['-webkit-text-stroke'] = '1px #e23d3d'
        this.removeButton.style['-webkit-text-stroke'] = '1px #5f422f'
    }

    insertButtonHandler(event) {
        if (this.operationsBlocked) return;
        const insertValue = Number.parseInt(this.insertInput.value);
        try {
            this._pseudocode.steps = [];
            this._pseudocode.initializeInsert();
            this._tree.insert(new this.TreeNode(insertValue));
        } catch (e) {
            alert(e.message);
        }
    }

    findButtonHandler(event) {
        if (this.operationsBlocked) return;
        const findValue = Number.parseInt(this.findInput.value);
        try {
            this._pseudocode.initializeFind();
            const node = this._tree.find(findValue);
            if (node) {
                alert("Вершина найдена");
            } else {
                alert("Вершина не найдена");
            }
        } catch (e) {
            alert(e.message);
        }
    }

    removeButtonHandler(event) {
        if (this.operationsBlocked) return;
        this.middlePart.classList.add('middle-part_delete-mode');
        this.removeButton.classList.add('basic-operations__operation-title_delete-mode');
        this.canvas.addEventListener('click', this._nodeHandlerFunctionObject);
    }

    clearCanvasHandler(event) {
        if (this.operationsBlocked) return;
        this._treeCanvas.clearCanvas();
        this._tree.root = null;
    }

    nodeHandler(event) {
        if (event.target.closest(".node")) {
            this._pseudocode.initializeRemove();
            this._tree.remove(Number.parseInt(event.target.closest(".node").getAttribute('id')));
            this.canvas.removeEventListener('click', this._nodeHandlerFunctionObject);
            this.middlePart.classList.remove('middle-part_delete-mode');
            this.removeButton.classList.remove('basic-operations__operation-title_delete-mode');
        } else if (!event.target.classList.contains('basic-operations__operation-title_cross')) {
            this.canvas.removeEventListener('click', this._nodeHandlerFunctionObject);
            this.middlePart.classList.remove('middle-part_delete-mode');
            this.removeButton.classList.remove('basic-operations__operation-title_delete-mode');
        }
    }
}