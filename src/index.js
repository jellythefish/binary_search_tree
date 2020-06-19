import "./pages/index.css";
import "./vendor/snap.svg-min.js"; 
import "./images/sun.svg";
import "./images/branch-left.svg"
import "./images/branch-right.svg"
import * as Switch from './blocks/content/upper-toolbar/switch/switch.js';
import * as Theory from './blocks/content/middle-part/theory/theory.js';
import * as PseudocodeElements from './blocks/content/middle-part/pseudocode/pseudocode.js';
import Tree from './scripts/Tree';
import TreeNode from './scripts/TreeNode';
import TreeCanvas from "./scripts/TreeCanvas";
import Pseudocode from './scripts/Pseudocode';
import TimeController from './scripts/TimeController';
import BasicOperations from "./scripts/BasicOperations";
import Menu from "./scripts/Menu";
import Traversals from "./scripts/Traversals";
import AdditionalOperations from "./scripts/AdditionalOperations";

Switch.circle.addEventListener('mousedown', Switch.mousedownCircleHandler);
window.addEventListener('mouseup', Switch.mouseupCircleHandler);

Theory.theoryButton.addEventListener('mousedown', Theory.mousedownTheoryButtonHandler);
window.addEventListener('mouseup', Theory.mouseupTheoryButtonHandler);

PseudocodeElements.pseudocodeButton.addEventListener('mousedown', PseudocodeElements.mousedownPseudocodeButtonHandler);
window.addEventListener('mouseup', PseudocodeElements.mouseupPseudocodeButtonHandler);

// tree initializing

const treeCanvas = new TreeCanvas(Snap("#canvas"));
const timeController = new TimeController(); // таймконтроллер привязан к псевдокоду так что это логично
const pseudocode = new Pseudocode(PseudocodeElements.pseudocodeWindow, treeCanvas, timeController);
const tree = new Tree(null, treeCanvas, pseudocode);
const menu = new Menu(tree, treeCanvas, { treeNode: TreeNode });
pseudocode.linkTree(tree);
timeController.linkPseudocode(pseudocode);
timeController.linkTreeCanvas(treeCanvas);
const basicOperations = new BasicOperations(tree, treeCanvas, pseudocode, { treeNode: TreeNode });
timeController.linkBasicOperations(basicOperations);
pseudocode.linkBasicOperations(basicOperations);
const traversals = new Traversals(tree, treeCanvas, pseudocode);
const additionalOperations = new AdditionalOperations(tree, treeCanvas, pseudocode);

// tree.insert(new TreeNode(50));
// tree.insert(new TreeNode(25));
// tree.insert(new TreeNode(100));
// tree.insert(new TreeNode(75));
// tree.insert(new TreeNode(125));
// tree.insert(new TreeNode(55));
// tree.insert(new TreeNode(85));
// tree.insert(new TreeNode(53));
// tree.insert(new TreeNode(60));
// tree.insert(new TreeNode(52));
// tree.insert(new TreeNode(54));
// treeCanvas.renderTree(tree.root);