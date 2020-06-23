const theoryWindow = document.querySelector(".theory");
const theoryButton = document.querySelector(".theory__button");
const blockNext = document.querySelector('.theory__next');
const blockPrev = document.querySelector('.theory__prev');

const blocks = document.querySelectorAll('.theory__block');

let currentIndex = 0;
const totalBlocks = 4;

blockNext.addEventListener('click', nextHandler);
blockPrev.addEventListener('click', prevHandler);

function nextHandler(event) {
    if (currentIndex + 1> totalBlocks) return;
    blocks[currentIndex].classList.add('theory__block_hidden');
    blocks[currentIndex + 1].classList.remove('theory__block_hidden');
    ++currentIndex;
}

function prevHandler(event) {
    if (currentIndex - 1 < 0) return;
    blocks[currentIndex].classList.add('theory__block_hidden');
    blocks[currentIndex - 1].classList.remove('theory__block_hidden');
    --currentIndex;
}


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