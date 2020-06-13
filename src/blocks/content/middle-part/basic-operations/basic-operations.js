const basicOpsWindow = document.querySelector(".basic-operations");
const basicOpsButton = document.querySelector(".basic-operations__button");
let initialXBasOp, newXBasOp, currentBasicOpsWindowLeftX, basicOpsButtonMoved = false;

basicOpsButton.ondragstart = function() {
    return false;
};

function mousemoveBasicOpsButtonHandler(event) {
    event.preventDefault(); 
    let difference = event.clientX - initialXBasOp;
    newXBasOp = currentBasicOpsWindowLeftX + difference;
    if (newXBasOp >= -290 && newXBasOp <= 0) {
        basicOpsWindow.style.left = newXBasOp + 'px';
    }
}

function mousedownBasicOpsButtonHandler(event) {
    event.preventDefault();
    basicOpsButtonMoved = true;
    initialXBasOp = event.clientX;
    let basicOpsWindowStyle = getComputedStyle(basicOpsWindow);
    currentBasicOpsWindowLeftX = Number.parseInt(basicOpsWindowStyle.getPropertyValue('left').slice(0, -2));
    window.addEventListener('mousemove', mousemoveBasicOpsButtonHandler);
}

function mouseupBasicOpsButtonHandler(event) {
    if (basicOpsButtonMoved) {
        processWindowPosition();
        window.removeEventListener('mousemove', mousemoveBasicOpsButtonHandler);
        basicOpsButtonMoved = false;
    }
}

function processWindowPosition() {
    if (newXBasOp > -145) {
        basicOpsWindow.style.left = '0px';
        basicOpsButton.classList.remove('basic-operations__button_open');
    } else {
        basicOpsWindow.style.left = '-290px';
        basicOpsButton.classList.add('basic-operations__button_open');
    }
}

export { basicOpsWindow, basicOpsButton, initialXBasOp, newXBasOp, basicOpsButtonMoved, mousemoveBasicOpsButtonHandler,
    mousedownBasicOpsButtonHandler, mouseupBasicOpsButtonHandler, processWindowPosition}