const rectangle = document.querySelector('.switch__rectangle');
const circle = document.querySelector('.switch__circle');
const title = document.querySelector('.avl__title');
const avlOperationsStatus = document.querySelector('.basic-operations__avl-status');
const initialCircleLeftX = Number.parseInt(getComputedStyle(circle).getPropertyValue('left').slice(0, -2));
let initialX, newX, currentCircleLeftX, circleMoved = false;

circle.ondragstart = function() { // to avoid default drag'n'drop
    return false;
};

function mousemoveCircleHandler(event) {
    event.preventDefault(); // prevents from highligting other text elements and images while mousemove
    let difference = event.clientX - initialX;
    newX = currentCircleLeftX + difference;
    if (newX >= 0 && newX <= 59) {
        circle.style.left = newX + 'px';
    }
}

function mousedownCircleHandler(event) {
    event.preventDefault();
    circleMoved = true;
    initialX = event.clientX;
    const circleStyle = getComputedStyle(circle);
    currentCircleLeftX = Number.parseInt(circleStyle.getPropertyValue('left').slice(0, -2));
    window.addEventListener('mousemove', mousemoveCircleHandler);
}

function mouseupCircleHandler(event) {
    if (circleMoved) {
        processSwitchPosition();
        window.removeEventListener('mousemove', mousemoveCircleHandler);
        circleMoved = false;
    }
}

function processSwitchPosition() {
    if (newX > 30) {
        circle.style.left = initialCircleLeftX + 'px';
        rectangle.classList.remove('switch__rectangle_off');
        title.classList.remove('avl__title_off');
        avlOperationsStatus.textContent = "(AVL)";
    } else {
        circle.style.left = 0;
        rectangle.classList.add('switch__rectangle_off');
        title.classList.add('avl__title_off');
        avlOperationsStatus.textContent = "";
    }
}

export { rectangle, circle, title, avlOperationsStatus, initialCircleLeftX, initialX, newX, currentCircleLeftX,
    circleMoved, mousemoveCircleHandler, mousedownCircleHandler, mouseupCircleHandler, processSwitchPosition,   
}