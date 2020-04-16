import "./pages/index.css";
import "./vendor/snap.svg-min.js"; 
import * as Menu from './blocks/menu/menu.js';
import * as Switch from './blocks/content/upper-toolbar/switch/switch.js';
import * as BasicOperations from './blocks/content/middle-part/basic-operations/basic-operations.js';
import * as Theory from './blocks/content/middle-part/theory/theory.js';
import * as Pseudocode from './blocks/content/middle-part/pseudocode/pseudocode.js';
import * as Speed from './blocks/content/lower-toolbar/time-control/__speed/time-control__speed.js';
import * as Timeline from './blocks/content/lower-toolbar/time-control/__timeline/time-control__timeline.js';

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


// canvas.js 

const canvasWidth = 1440;
const canvasHeight = 660;
let widthLevel = 2;
const appleWidth = 50;
const appleHeight = 50;

let s = Snap("#canvas");

const insertNode = (x, y) => {
    let sun = s.paper.image("./images/apple.svg", x, y, appleWidth, appleHeight);
    widthLevel *= 2;
}

insertNode(canvasWidth / widthLevel, 0);