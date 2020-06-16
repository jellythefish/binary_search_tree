import "./pages/index.css";
import "./vendor/snap.svg-min.js"; 
import "./images/sun.svg";
import "./images/branch-left.svg"
import "./images/branch-right.svg"
import * as Menu from './blocks/menu/menu.js';
import * as Switch from './blocks/content/upper-toolbar/switch/switch.js';
import * as BasicOperations from './blocks/content/middle-part/basic-operations/basic-operations.js';
import * as Theory from './blocks/content/middle-part/theory/theory.js';
import * as PseudocodeElements from './blocks/content/middle-part/pseudocode/pseudocode.js';
import * as Speed from './blocks/content/lower-toolbar/time-control/__speed/time-control__speed.js';
import Tree from './scripts/Tree';
import TreeNode from './scripts/TreeNode';
import TreeCanvas from "./scripts/TreeCanvas";
import Pseudocode from './scripts/Pseudocode';
import TimeController from './scripts/TimeController';

Menu.menuButton.addEventListener('click', Menu.menuButtonHandler);
Menu.createTreeButton.addEventListener('click', Menu.menuCreateTreeButtonHandler);

Switch.circle.addEventListener('mousedown', Switch.mousedownCircleHandler);
window.addEventListener('mouseup', Switch.mouseupCircleHandler);

BasicOperations.basicOpsButton.addEventListener('mousedown', BasicOperations.mousedownBasicOpsButtonHandler);
window.addEventListener('mouseup', BasicOperations.mouseupBasicOpsButtonHandler);

Theory.theoryButton.addEventListener('mousedown', Theory.mousedownTheoryButtonHandler);
window.addEventListener('mouseup', Theory.mouseupTheoryButtonHandler);

PseudocodeElements.pseudocodeButton.addEventListener('mousedown', PseudocodeElements.mousedownPseudocodeButtonHandler);
window.addEventListener('mouseup', PseudocodeElements.mouseupPseudocodeButtonHandler);

Speed.speedPointer.addEventListener('mousedown', Speed.mousedownSpeedPointerHandler);
window.addEventListener('mouseup', Speed.mouseupSpeedPointerHandler);

// tree initializing

const treeCanvas = new TreeCanvas(Snap("#canvas"));
const timeController = new TimeController(); // таймконтроллер привязан к псевдокоду так что это логично
const pseudocode = new Pseudocode(PseudocodeElements.pseudocodeWindow, treeCanvas, timeController);
const tree = new Tree(null, treeCanvas, pseudocode);
timeController.linkPseudocode(pseudocode);
timeController.linkTreeCanvas(treeCanvas);

const insertButton = document.querySelector(".basic-operations__operation-title_leaf");
const findButton = document.querySelector(".basic-operations__operation-title_apple");
const removeButton = document.querySelector(".basic-operations__operation-title_cross");
const clearButton = document.querySelector(".clear-button");
const middlePart = document.querySelector('.middle-part');
const canvas = document.getElementById("canvas");

function insertButtonHandler(event) {
    const insertValue = Number.parseInt(document.querySelector(".basic-operations__input_leaf").value);
    try {
        pseudocode.steps = [];
        pseudocode.initializeInsert();
        tree.insert(new TreeNode(insertValue));
    } catch (e) {
        alert(e.message);
    }
}
function findButtonHandler(event) {
    const findValue = Number.parseInt(document.querySelector(".basic-operations__input_apple").value); // to validate input later
    try {
        pseudocode.initializeFind();
        const node = tree.find(findValue);
        if (node) {
            alert("Вершина найдена");
        } else {
            alert("Вершина не найдена");
        }
    } catch (e) {
        alert(e.message);
    }
}
function nodeHandler(event) {
    if (event.target.closest(".node")) {
        tree.remove(Number.parseInt(event.target.closest(".node").getAttribute('id')));
        treeCanvas.renderTree(tree.root);
        window.removeEventListener('click', nodeHandler);
        middlePart.classList.remove('middle-part_delete-mode');
        removeButton.classList.remove('basic-operations__operation-title_delete-mode');
    } else if (!event.target.classList.contains('basic-operations__operation-title_cross')) {
        window.removeEventListener('click', nodeHandler);
        middlePart.classList.remove('middle-part_delete-mode');
        removeButton.classList.remove('basic-operations__operation-title_delete-mode');
    }
}
function removeButtonHandler(event) {
    middlePart.classList.add('middle-part_delete-mode');
    removeButton.classList.add('basic-operations__operation-title_delete-mode');
    window.addEventListener('click', nodeHandler);
}
function clearCanvasHandler(event) {
    treeCanvas.clearCanvas();
    tree.root = null;
}

insertButton.addEventListener('click', insertButtonHandler);
findButton.addEventListener('click', findButtonHandler);
removeButton.addEventListener('click', removeButtonHandler);
clearButton.addEventListener('click', clearCanvasHandler);

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
