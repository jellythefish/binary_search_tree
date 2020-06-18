export default class Traversals {
    constructor(tree, treeCanvas, pseudocode) {
        this._tree = tree;
        this._treeCanvas = treeCanvas;
        this._pseudocode = pseudocode;
    
        this._inOrderButton = document.querySelector('.js-inorder-button'); 
        this._preOrderButton = document.querySelector('.js-preorder-button'); 
        this._postOrderButton = document.querySelector('.js-postorder-button'); 

        this._inOrderButton.addEventListener('click', this._inOrderTraversal.bind(this));
        this._preOrderButton.addEventListener('click', this._preOrderTraversal.bind(this));
        this._postOrderButton.addEventListener('click', this._postOrderTraversal.bind(this));
    }

    _inOrderTraversal() {
        this._treeCanvas.clearTraversedNodes();
        this._pseudocode.initializeInOrderTraversal();
        this._tree.inOrderTraversal();
        this._pseudocode.steps.push({ index: 8, lastStep: 1 });
        this._pseudocode.renderOperation(0, 'inorder');
    }

    _preOrderTraversal() {
        this._treeCanvas.clearTraversedNodes();
        this._pseudocode.initializePreOrderTraversal();
        this._tree.preOrderTraversal();
        this._pseudocode.steps.push({ index: 8, lastStep: 1 });
        this._pseudocode.renderOperation(0, 'preorder');
    }

    _postOrderTraversal() {
        this._treeCanvas.clearTraversedNodes();
        this._pseudocode.initializePostOrderTraversal();
        this._tree.postOrderTraversal();
        this._pseudocode.steps.push({ index: 8, lastStep: 1 });
        this._pseudocode.renderOperation(0, 'postorder');
    }
}