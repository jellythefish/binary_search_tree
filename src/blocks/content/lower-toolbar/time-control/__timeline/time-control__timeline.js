const timelinePointer = document.querySelector('.time-control__timeline-pointer');
const timelineBasicWidth = getComputedStyle(document.querySelector('.time-control__timeline')).getPropertyValue('width').slice(0, -2);
const timelineWidth = document.querySelector('.time-control__timeline-line');
let initialXTimelinePointer, newXTimelinePointer, currentTimelinePointerLeftX, timelinePointerMoved = false;

timelinePointer.ondragstart = function() {
    return false;
};

function mousemoveTimelinePointerHandler(event) {
    event.preventDefault();
    let difference = event.clientX - initialXTimelinePointer;
    newXTimelinePointer = currentTimelinePointerLeftX + difference;
    if (newXTimelinePointer >= 0 && newXTimelinePointer <= 742) {
        timelinePointer.style.left = newXTimelinePointer + 'px';
        timelineWidth.style.width = (newXTimelinePointer / timelineBasicWidth) * 100 + 2 + '%';
    } 
}

function mousedownTimelinePointerHandler(event) {
    event.preventDefault();
    timelinePointerMoved = true;
    initialXTimelinePointer = event.clientX;
    let timelinePointerStyle = getComputedStyle(timelinePointer);
    currentTimelinePointerLeftX = Number.parseInt(timelinePointerStyle.getPropertyValue('left').slice(0, -2));
    window.addEventListener('mousemove', mousemoveTimelinePointerHandler);
}

function mouseupTimelinePointerHandler(event) {
    if (timelinePointerMoved) {
        window.removeEventListener('mousemove', mousemoveTimelinePointerHandler);
        timelinePointerMoved = false;
    }
}

export { timelinePointer, timelineBasicWidth, timelineWidth, initialXTimelinePointer, newXTimelinePointer, timelinePointerMoved,
    currentTimelinePointerLeftX, mousemoveTimelinePointerHandler, mousedownTimelinePointerHandler, mouseupTimelinePointerHandler}