const canvasWidth = 1440;
const canvasHeight = 660;
let widthLevel = 2;
const appleWidth = 50;
const appleHeight = 50;

let s = Snap("#canvas");
// let app = Snap.load("./images/apple.svg");

const insertNode = (x, y) => {
    let apple = s.paper.image("./images/apple.svg", x, y, appleWidth, appleHeight);
    widthLevel *= 2;
}

insertNode(canvasWidth / widthLevel, 0);
insertNode(canvasWidth / widthLevel, 100);
insertNode(canvasWidth / widthLevel, 200);
insertNode(canvasWidth / widthLevel, 300);
