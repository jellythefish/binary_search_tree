import "./pages/index.css";
import "./vendor/snap.svg-min.js"; 
import "./images/sun.svg";
import "./images/branch-left.svg"
import "./images/branch-right.svg"
import * as Switch from './blocks/content/upper-toolbar/switch/switch.js';
import * as Theory from './blocks/content/middle-part/theory/theory.js';
import * as PseudocodeElements from './blocks/content/middle-part/pseudocode/pseudocode.js';
import Tree from './js/components/Tree';
import TreeNode from './js/components/TreeNode';
import TreeCanvas from "./js/components/TreeCanvas";
import Pseudocode from './js/components/Pseudocode';
import TimeController from './js/components/TimeController';
import BasicOperations from "./js/components/BasicOperations";
import Menu from "./js/components/Menu";
import Traversals from "./js/components/Traversals";
import AdditionalOperations from "./js/components/AdditionalOperations";

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

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.header__link');
popupOpenButton.addEventListener('click', popupHandler);
const closePopupButton = document.querySelector('.popup__close');
closePopupButton.addEventListener('click', popupHandler);
function popupHandler(event) {
    popup.classList.toggle('popup_is-opened');
}
