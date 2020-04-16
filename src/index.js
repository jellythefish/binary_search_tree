import "./pages/index.css";
import "./vendor/snap.svg-min.js"; 
import "./images/sun.svg";
import "./images/branch.svg"
import autoprefixer from "autoprefixer";
import * as Menu from './blocks/menu/menu.js';
import * as Switch from './blocks/content/upper-toolbar/switch/switch.js';
import * as BasicOperations from './blocks/content/middle-part/basic-operations/basic-operations.js';
import * as Theory from './blocks/content/middle-part/theory/theory.js';
import * as Pseudocode from './blocks/content/middle-part/pseudocode/pseudocode.js';
import * as Speed from './blocks/content/lower-toolbar/time-control/__speed/time-control__speed.js';
import * as Timeline from './blocks/content/lower-toolbar/time-control/__timeline/time-control__timeline.js';
import { Tree, TreeNode } from './scripts/Tree';


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

const tree = new Tree();

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
        tree.renderTree();
        canvas.removeEventListener('click', nodeHandler)
    }
}
function removeButtonHandler(event) {
    canvas.addEventListener('click', nodeHandler);
}
insertButton.addEventListener('click', insertButtonHandler);
findButton.addEventListener('click', findButtonHandler);
removeButton.addEventListener('click', removeButtonHandler);

// canvas.js 

const canvasWidth = 1440;
const canvasHeight = 660;
let widthLevel = 2;
const appleWidth = 50;
const appleHeight = 50;
const sunWidth = 70;
const sunHeight = 70;

let s = Snap("#canvas");

const insertNode = (x, y, key, type) => {
    let node, img, text;
    if (type === "apple") {
        img = s.paper.image("./images/apple.svg", 0, 0, appleWidth, appleHeight);
        node = s.paper.svg(x, y, appleWidth, appleHeight)
        text = s.paper.text("48%", "63%", key);
    } else {
        img = s.paper.image("./images/sun.svg", 0, 0, sunWidth, sunHeight);
        node = s.paper.svg(x, y, sunWidth, sunWidth);
        text = s.paper.text("50%", "52%", key);
    }
    node.attr({ id: key, class: "node"});
    text.attr({
        "class": "tree__node-key",
        "fill": "white",
        "dominant-baseline": "middle",
        "text-anchor": "middle"
    });
    node.append(img);
    node.append(text);
    widthLevel *= 2;
}

tree.insert(new TreeNode(4));
tree.insert(new TreeNode(3));
tree.insert(new TreeNode(5));

// const insertEdge = (childNode, parentNode, edgeWidth, edgeHeight, edgeAngle) => {
//     s.paper.image("./images/branch.svg", x, y, edgeWidth, edgeHeight);
// }

// insertNode(canvasWidth / widthLevel, 0, 777, "sun");
// insertNode(canvasWidth / widthLevel, 100, 161, "apple");
// insertEdge(canvasWidth / widthLevel, 200, 50, 200);

