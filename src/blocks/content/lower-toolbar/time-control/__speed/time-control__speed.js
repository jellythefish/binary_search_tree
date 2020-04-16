const speedPointer = document.querySelector('.time-control__speed-pointer');
let initialXSpeedPointer, newXSpeedPointer, currentSpeedPointerLeftX, speedPointerMoved = false;

speedPointer.ondragstart = function() {
    return false;
};

function mousemoveSpeedPointerHandler(event) {
    event.preventDefault();
    let difference = event.clientX - initialXSpeedPointer;
    newXSpeedPointer = currentSpeedPointerLeftX + difference;
    if (newXSpeedPointer >= 2 && newXSpeedPointer <= 96) {
        speedPointer.style.left = newXSpeedPointer + 'px';
    }
}

function mousedownSpeedPointerHandler(event) {
    event.preventDefault();
    speedPointerMoved = true;
    initialXSpeedPointer = event.clientX;
    let speedPointerStyle = getComputedStyle(speedPointer);
    currentSpeedPointerLeftX = Number.parseInt(speedPointerStyle.getPropertyValue('left').slice(0, -2));
    window.addEventListener('mousemove', mousemoveSpeedPointerHandler);
}

function mouseupSpeedPointerHandler(event) {
    if (speedPointerMoved) {
        window.removeEventListener('mousemove', mousemoveSpeedPointerHandler);
        speedPointerMoved = false;
    }
}

export { speedPointer, initialXSpeedPointer, newXSpeedPointer, speedPointerMoved, currentSpeedPointerLeftX,
    mousemoveSpeedPointerHandler, mousedownSpeedPointerHandler, mouseupSpeedPointerHandler, }