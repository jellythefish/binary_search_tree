export default class TreeNode {
    constructor(key) {
        if (key === undefined) throw Error('Не указан ключ вершины')
        this.key = key;
        this.type = null;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
        this.element = null;
    }
}