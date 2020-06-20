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
        try {
            this._tree.inOrderTraversal();
            this._pseudocode.steps.push({ index: 7, lastStep: 1 });
            this._pseudocode.renderOperation(0, 'inorder');
        } catch (e) {
            alert(e.message);
        }
    }

    _preOrderTraversal() {
        this._treeCanvas.clearTraversedNodes();
        this._pseudocode.initializePreOrderTraversal();
        try {
            this._tree.preOrderTraversal();
            this._pseudocode.steps.push({ index: 7, lastStep: 1 });
            this._pseudocode.renderOperation(0, 'preorder');
        } catch (e) {
            alert(e.message);
        } 
    }

    _postOrderTraversal() {
        this._treeCanvas.clearTraversedNodes();
        this._pseudocode.initializePostOrderTraversal();
        try {
            this._tree.postOrderTraversal();
            this._pseudocode.steps.push({ index: 7, lastStep: 1 });
            this._pseudocode.renderOperation(0, 'postorder');
        } catch (e) {
            alert(e.message);
        }
    }
}