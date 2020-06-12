export default class TreeNode {
    constructor(key) {
        this.key = key;
        this.type = null;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
        this.element = null;
    }
}

// const tree = new Tree();
// tree.insert(new TreeNode(5));
// tree.insert(new TreeNode(6));
// tree.insert(new TreeNode(2));
// tree.insert(new TreeNode(3));
// tree.insert(new TreeNode(1));
// tree.insert(new TreeNode(0));
// tree.insert(new TreeNode(9));
// tree.insert(new TreeNode(7));
// tree.insert(new TreeNode(3.2));
// tree.insert(new TreeNode(2.8));
// tree.insert(new TreeNode(2.9));
// tree.insert(new TreeNode(2.7));
// tree.insert(new TreeNode(2.6));
// tree.insert(new TreeNode(2.65));
// tree.insert(new TreeNode(10));
// tree.remove(5);
// tree.preOrderTraversal(); // 6 2 1 0 3 2.8 2.7 2.6 2.65 2.9 3.2 9 7 10
// tree.remove(2);
// tree.remove(9);
// console.log("\n");
// tree.preOrderTraversal(); // 6 2.6 1 0 3 2.8 2.7 2.65 2.9 3.2 10 7