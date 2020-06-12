import "./pages/index.css";
import "./vendor/snap.svg-min.js"; 
import "./images/sun.svg";
import "./images/branch-left.svg"
import "./images/branch-right.svg"
import autoprefixer from "autoprefixer";
import * as Menu from './blocks/menu/menu.js';
import * as Switch from './blocks/content/upper-toolbar/switch/switch.js';
import * as BasicOperations from './blocks/content/middle-part/basic-operations/basic-operations.js';
import * as Theory from './blocks/content/middle-part/theory/theory.js';
import * as Pseudocode from './blocks/content/middle-part/pseudocode/pseudocode.js';
import * as Speed from './blocks/content/lower-toolbar/time-control/__speed/time-control__speed.js';
import * as Timeline from './blocks/content/lower-toolbar/time-control/__timeline/time-control__timeline.js';
import Tree from './scripts/Tree';
import TreeNode from './scripts/TreeNode';
import TreeCanvas from "./scripts/TreeCanvas";


Menu.menuButton.addEventListener('click', Menu.menuButtonHandler);
Menu.createTreeButton.addEventListener('click', Menu.menuCreateTreeButtonHandler);

Switch.circle.addEventListener('mousedown', Switch.mousedownCircleHandler);
window.addEventListener('mouseup', Switch.mouseupCircleHandler);

BasicOperations.basicOpsButton.addEventListener('mousedown', BasicOperations.mousedownBasicOpsButtonHandler);
window.addEventListener('mouseup', BasicOperations.mouseupBasicOpsButtonHandler);

Theory.theoryButton.addEventListener('mousedown', Theory.mousedownTheoryButtonHandler);
window.addEventListener('mouseup', Theory.mouseupTheoryButtonHandler);

Pseudocode.pseudocodeButton.addEventListener('mousedown', Pseudocode.mousedownPseudocodeButtonHandler);
window.addEventListener('mouseup', Pseudocode.mouseupPseudocodeButtonHandler);

Speed.speedPointer.addEventListener('mousedown', Speed.mousedownSpeedPointerHandler);
window.addEventListener('mouseup', Speed.mouseupSpeedPointerHandler);

Timeline.timelinePointer.addEventListener('mousedown', Timeline.mousedownTimelinePointerHandler);
window.addEventListener('mouseup', Timeline.mouseupTimelinePointerHandler);



// tree initializing

const treeCanvas = new TreeCanvas(Snap("#canvas"));
const tree = new Tree(null, treeCanvas);

const insertButton = document.querySelector(".basic-operations__operation-title_leaf");
const findButton = document.querySelector(".basic-operations__operation-title_apple");
const removeButton = document.querySelector(".basic-operations__operation-title_cross");
const canvas = document.getElementById("canvas");

function insertButtonHandler(event) {
    const insertValue = Number.parseInt(document.querySelector(".basic-operations__input_leaf").value); // to validate input later
    try {
       tree.insert(new TreeNode(insertValue));
    } catch (e) {
        alert(e.message);
    }
}
function findButtonHandler(event) {
    const findValue = Number.parseInt(document.querySelector(".basic-operations__input_apple").value); // to validate input later
    try {
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
        canvas.removeEventListener('click', nodeHandler)
    }
}
function removeButtonHandler(event) {
    canvas.addEventListener('click', nodeHandler);
}
insertButton.addEventListener('click', insertButtonHandler);
findButton.addEventListener('click', findButtonHandler);
removeButton.addEventListener('click', removeButtonHandler);

tree.insert(new TreeNode(50));
tree.insert(new TreeNode(25));
tree.insert(new TreeNode(100));
tree.insert(new TreeNode(75));
tree.insert(new TreeNode(125));
tree.insert(new TreeNode(55));
tree.insert(new TreeNode(85));
tree.insert(new TreeNode(53));
tree.insert(new TreeNode(60));
tree.insert(new TreeNode(52));
tree.insert(new TreeNode(54));
