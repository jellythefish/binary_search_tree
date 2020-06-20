export default class Menu {
    constructor(tree, treeCanvas, dependecies) {
        this._tree = tree;
        this._treeCanvas = treeCanvas;
        this._TreeNode = dependecies.treeNode;
        this._menuButton = document.querySelector('.header__menu-button');
        this._createTreeButton = document.querySelector('.js-create-tree');
        this._createRandomTreeButton = document.querySelector('.js-random-tree');
        this._createWorstTreeButton = document.querySelector('.js-worst-tree');
        this._createMiddleTreeButton = document.querySelector('.js-middle-tree');
        this._createBestTreeButton = document.querySelector('.js-best-tree');
        this._saveConfigButton = document.querySelector('.js-save-config');
        this._loadConfigButton = document.querySelector('.js-load-config');
        this._menu = document.querySelector('.menu')
        this._suboptions = document.querySelector('.menu__suboptions')

        this._randomTreeNodeNumber = 6;
            
        this._menuButton.addEventListener('click', this._menuButtonHandler.bind(this));
        this._createTreeButton.addEventListener('click', this._menuCreateTreeButtonHandler.bind(this));
        this._createRandomTreeButton.addEventListener('click', this._createRandomTree.bind(this));
        this._createWorstTreeButton.addEventListener('click', this._createWorstCaseTree.bind(this));
        this._createMiddleTreeButton.addEventListener('click', this._createMiddleCaseTree.bind(this));
        this._createBestTreeButton.addEventListener('click', this._createBestCaseTree.bind(this));
        this._saveConfigButton.addEventListener('click', this._saveConfig.bind(this));
        this._loadConfigButton.addEventListener('click', this._loadConfig.bind(this));
    }

    _createRandomTree() {
        this._tree.root = null;
        for (let i = 0; i != this._randomTreeNodeNumber; ++i) {
            const key = this._randomInteger(0, 100);
            this._tree.insert(new this._TreeNode(key));
            this._treeCanvas.renderTree(this._tree.root);
        }
    }

    _createWorstCaseTree() {
        this._tree.root = null;
        const seed = this._randomInteger(0, 1);
        for (let i = 0; i < this._randomTreeNodeNumber; ++i) {
            const key = seed ? this._randomInteger(i * 10, (i + 1) * 10) : 
                this._randomInteger((this._randomTreeNodeNumber - i - 1) * 10, (this._randomTreeNodeNumber - i) * 10);
            this._tree.insert(new this._TreeNode(key));
        }
        this._treeCanvas.renderTree(this._tree.root);
    }

    _createMiddleCaseTree() {
        this._tree.root = null;
        const startingPoint = this._randomInteger(200, 1000);
        let delta;
        let nodeNumber = this._randomInteger(2, 6);
        this._tree.insert(new this._TreeNode(startingPoint));
        for (let i = 0; i < nodeNumber; ++i) {
            delta = this._randomInteger(0, startingPoint / 2);
            const randomKeyGreater = this._randomInteger(startingPoint, startingPoint + delta);
            this._tree.insert(new this._TreeNode(randomKeyGreater));
        }
        nodeNumber = this._randomInteger(2, 6);
        for (let i = 0; i < nodeNumber; ++i) {
            delta = this._randomInteger(0, startingPoint / 2);
            const randomKeyLess = this._randomInteger(startingPoint - delta, startingPoint);
            this._tree.insert(new this._TreeNode(randomKeyLess));
        }
        this._treeCanvas.renderTree(this._tree.root);
    }

    _createBestCaseTree() {
        this._tree.root = null;
        const startingPoint = this._randomInteger(200, 1000);;
        const delta = this._randomInteger(0, startingPoint / 2);
        const levels = this._randomInteger(1, 5);
        this._tree.insert(new this._TreeNode(startingPoint));
        this.renderBestLevel(1, startingPoint, levels, delta);
        this._treeCanvas.renderTree(this._tree.root);
    }

    renderBestLevel(level, currentKey, maxLevel, delta) {
        if (level > maxLevel) {
            return;
        };
        const leftKey = Math.floor(currentKey + delta);
        const rightKey = Math.floor(currentKey - delta);
        this._tree.insert(new this._TreeNode(leftKey));
        this._tree.insert(new this._TreeNode(rightKey));
        delta /= 2;
        ++level
        this.renderBestLevel(level, leftKey, maxLevel, delta);
        this.renderBestLevel(level, rightKey, maxLevel, delta);
    }

    _saveConfig() {

    }

    _loadConfig() {

    }

    _menuButtonHandler(event) {
        this._menu.classList.toggle('menu_is-opened');
    }

    _menuCreateTreeButtonHandler(event) {
        this._suboptions.classList.toggle('menu__suboptions_is-opened');
    }

    _randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
      }
}