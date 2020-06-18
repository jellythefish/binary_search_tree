// test 1 (testing preorder inorder postorder)
const n1 = new TreeNode(5);
const n2 = new TreeNode(6);
const n3 = new TreeNode(2);
const n4 = new TreeNode(1);
const n5 = new TreeNode(3);
const n6 = new TreeNode(9);
const tree = new Tree(n1);
tree.insert(n2);
tree.insert(n3);
tree.insert(n4);
tree.insert(n5);
tree.insert(n6);
tree.inOrderTraversal(); // 1 2 3 5 6 9
tree.preOrderTraversal(); // 5 2 1 3 6 9
tree.postOrderTraversal(); // 1 3 2 5 9 6

//test 2 (testing preorder inorder postorder with initial empty tree and inserts)

const n1 = new TreeNode(5);
const n2 = new TreeNode(6);
const n3 = new TreeNode(2);
const n4 = new TreeNode(1);
const n5 = new TreeNode(3);
const n6 = new TreeNode(9);
const tree = new Tree();
tree.insert(n1);
tree.insert(n2);
tree.insert(n3);
tree.insert(n4);
tree.insert(n5);
tree.insert(n6);
tree.inOrderTraversal(); // 1 2 3 5 6 9
console.log("\n")
tree.preOrderTraversal(); // 5 2 1 3 6 9
console.log("\n")
tree.postOrderTraversal(); // 1 3 2 5 9 6

//test 2.1 (testing traversals with empty Trees)

const tree = new Tree();
tree.inOrderTraversal;
tree.postOrderTraversal();
tree.preOrderTraversal();

//test 3 (checking the inserting element to be in the tree 1)

const n1 = new TreeNode(5);
const n2 = new TreeNode(6);

const tree = new Tree();
tree.insert(n1);
tree.insert(n2);
tree.insert(n2); // Error("Данный элемент уже присутствует в дереве");

//test 4 (checking the inserting element to be in the tree 2)
const n1 = new TreeNode(5);
const n2 = new TreeNode(6);

const tree = new Tree();
tree.insert(n1);
tree.insert(n2);
const n3 = new TreeNode(5);
tree.insert(n3); // Error("Данный элемент уже присутствует в дереве");

// test 5 (testing finding)

const n1 = new TreeNode(5);
const n2 = new TreeNode(6);
const n3 = new TreeNode(2);
const n4 = new TreeNode(1);
const n5 = new TreeNode(3);
const n6 = new TreeNode(9);
const tree = new Tree();
tree.insert(n1);
tree.insert(n2);
tree.insert(n3);
tree.insert(n4);
tree.insert(n5);
tree.insert(n6);
console.log(tree.find(new TreeNode(4))); // null
console.log(tree.find(new TreeNode(5))); // node
console.log(tree.find(new TreeNode(1))); // node
console.log(tree.find(new TreeNode(0))); // null
console.log(tree.find(new TreeNode(9))); // node
console.log(tree.find(new TreeNode(10))); // null

// test 6 (testing deleting)                                                                                                    
const tree = new Tree();
tree.insert(new TreeNode(5));
tree.insert(new TreeNode(6));
tree.insert(new TreeNode(2));
tree.insert(new TreeNode(3));
tree.insert(new TreeNode(9));
tree.insert(new TreeNode(7));
tree.remove(9);
tree.remove(2);
tree.inOrderTraversal(); // 3 5 6 7

// test 7 (testind deleting with both parents)
const tree = new Tree();
tree.insert(new TreeNode(5));
tree.insert(new TreeNode(6));
tree.insert(new TreeNode(2));
tree.insert(new TreeNode(3));
tree.insert(new TreeNode(1));
tree.insert(new TreeNode(0));
tree.insert(new TreeNode(9));
tree.insert(new TreeNode(7));
tree.insert(new TreeNode(3.2));
tree.insert(new TreeNode(2.8));
tree.insert(new TreeNode(2.9));
tree.insert(new TreeNode(2.7));
tree.insert(new TreeNode(2.6));
tree.insert(new TreeNode(2.65));
tree.insert(new TreeNode(10));
tree.remove(5);
tree.preOrderTraversal(); // 6 2 1 0 3 2.8 2.7 2.6 2.65 2.9 3.2 9 7 10
tree.remove(2);
tree.remove(9);
console.log("\n");
tree.preOrderTraversal(); // 6 2.6 1 0 3 2.8 2.7 2.65 2.9 3.2 10 7