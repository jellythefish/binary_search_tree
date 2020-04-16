const theoryWindow = document.querySelector(".theory");
const theoryButton = document.querySelector(".theory__button");
let initialXTheory, newXTheory, currentTheoryWindowRightX, theoryButtonMoved = false;

theoryButton.ondragstart = function() {
    return false;
};

function mousemoveTheoryButtonHandler(event) {
    event.preventDefault();
    let difference = event.clientX - initialXTheory;
    newXTheory = currentTheoryWindowRightX - difference;
    if (newXTheory >= -397 && newXTheory <= 0) {
        theoryWindow.style.right = newXTheory + 'px';
    }
}

function mousedownTheoryButtonHandler(event) {
    event.preventDefault();
    theoryButtonMoved = true;
    initialXTheory = event.clientX;
    let theoryWindowStyle = getComputedStyle(theoryWindow);
    currentTheoryWindowRightX = Number.parseInt(theoryWindowStyle.getPropertyValue('right').slice(0, -2));
    window.addEventListener('mousemove', mousemoveTheoryButtonHandler);
}

function mouseupTheoryButtonHandler(event) {
    if (theoryButtonMoved) {
        processTheoryWindowPosition();
        window.removeEventListener('mousemove', mousemoveTheoryButtonHandler);
        theoryButtonMoved = false;
    }
}

function processTheoryWindowPosition() {
    if (newXTheory > -198) {
        theoryWindow.style.right = '0px';
        theoryButton.classList.add('theory__button_close');
    } else {
        theoryWindow.style.right = '-397px';
        theoryButton.classList.remove('theory__button_close');
    }
}

export { theoryWindow, theoryButton, initialXTheory, newXTheory, theoryButtonMoved, currentTheoryWindowRightX, mousemoveTheoryButtonHandler, 
    mousedownTheoryButtonHandler, mouseupTheoryButtonHandler, processTheoryWindowPosition}