export default class TimeController {
    constructor() {
        this._pseudocode = null;
        this._treeCanvas = null;
        this._playButton = document.querySelector('.js-time-control-play');
        this._pauseButton = document.querySelector('.js-time-control-pause');
        this._nextStepButton = document.querySelector('.js-time-control-next-step');
        this._prevStepButton = document.querySelector('.js-time-control-prev-step');
        this._toStartButton = document.querySelector('.js-time-control-to-start');
        this._toEndButton = document.querySelector('.js-time-control-to-end');
        this._speedPointer = document.querySelector('.time-control__speed-pointer');
        this._timelinePointer = document.querySelector('.time-control__timeline-pointer');
        this._timelinePointer.ondragstart = function() { return false; };
        this._timelineCurrentElement = document.querySelector('.time-control__timeline-line');
        this._timelineElement = document.querySelector('.time-control__timeline');
        this._timelineTotalWidth = getComputedStyle(this._timelineElement).getPropertyValue('width').slice(0, -2);
        this._maxStepSpeed = 5;
        this._currentPointerPositionIndex = -1;
        this._timelineParts = [];
        this._partLength = null;
        this._timilineInitialized = false;

        this._mousemoveTimelineHandlerFunction = this._mousemoveTimelinePointerHandler;
        this._mousemoveTimelineHandlerFunctionObject = this._mousemoveTimelineHandlerFunction.bind(this);

        this._initialXTimelinePointer = null;
        this._newXTimelinePointer = null;
        this._currentTimelinePointerLeftX = null;
        this._timelinePointerMoved = false;

        // this._speedPointer.addEventListener('mousedown', this._mousedownSpeedPointerHandler.bind(this));
        // window.addEventListener('mouseup', this._mouseupSpeedPointerHandler.bind(this));
    }

    initializeTimeline(stepsLength) {
        if (!this._timilineInitialized) {
            this._timilineInitialized = true;
            this._timelinePointer.addEventListener('mousedown', this._mousedownTimelinePointerHandler.bind(this));
            window.addEventListener('mouseup', this._mouseupTimelinePointerHandler.bind(this));
            this._playButton.addEventListener('click', this.processControlButtton.bind(this));
            this._pauseButton.addEventListener('click', this.processControlButtton.bind(this));
            this._nextStepButton.addEventListener('click', this.processControlButtton.bind(this));
            this._prevStepButton.addEventListener('click', this.processControlButtton.bind(this));
            this._toStartButton.addEventListener('click', this.processControlButtton.bind(this));
            this._toEndButton.addEventListener('click', this.processControlButtton.bind(this));
        }
        this.renderPlayPause('pause');
        this._timelineParts = [];
        this._currentPointerPositionIndex = -1;
        this._renderTimelineParts(stepsLength);
    }

    processControlButtton(event) {
        if (event.target.classList.contains('js-time-control-to-start')) {
            this.renderPlayPause('play');
            if (this._currentPointerPositionIndex === 0) return;
            this._currentPointerPositionIndex = 0;
        } else if (event.target.classList.contains('js-time-control-prev-step')) {
            this.renderPlayPause('play');
            if (this._currentPointerPositionIndex === 0) return;
            --this._currentPointerPositionIndex;
        } else if (event.target.classList.contains('js-time-control-play')) {
            this._pseudocode.paused = false;
            this._pseudocode.renderOperation(this._currentPointerPositionIndex);
            return this.renderPlayPause('pause');
        } else if (event.target.classList.contains('js-time-control-pause')) {
            this._pseudocode.paused = true;
            return this.renderPlayPause('play');
        } else if (event.target.classList.contains('js-time-control-next-step')) {
            this.renderPlayPause('play');
            if (this._currentPointerPositionIndex === this._timelineParts.length - 1) return;
            ++this._currentPointerPositionIndex;
        } else if (event.target.classList.contains('js-time-control-to-end')) {
            this.renderPlayPause('play');
            if (this._currentPointerPositionIndex === this._timelineParts.length - 1) return;
            this._currentPointerPositionIndex = this._timelineParts.length - 1;
        }
        this._timelinePointer.style.left = this._timelineParts[this._currentPointerPositionIndex] + 'px';
        this._timelineCurrentElement.style.width = this._timelineParts[this._currentPointerPositionIndex] + 8 + 'px';

        this._pseudocode.highlightLine(this._currentPointerPositionIndex);
        this._treeCanvas.renderTreeState(this._currentPointerPositionIndex);
    }

    stepForward() {
        if (this._currentPointerPositionIndex === this._timelineParts.length - 1) return;
        ++this._currentPointerPositionIndex;
        this._timelinePointer.style.left = this._timelineParts[this._currentPointerPositionIndex] + 'px';
        this._timelineCurrentElement.style.width = this._timelineParts[this._currentPointerPositionIndex] + 8 + 'px';
    }

    getCurrentStepSpeed() {
        const speedPointerPosition = Number.parseInt((window.getComputedStyle(this._speedPointer, 'style').left));
        const speed = (1 - speedPointerPosition / 100) * this._maxStepSpeed;
        return speed;
    }

    renderPlayPause(state) {
        if (state === 'play') {
            this._playButton.classList.remove('time-control__button_hidden');
            this._pauseButton.classList.add('time-control__button_hidden');
        } else {
            this._playButton.classList.add('time-control__button_hidden');
            this._pauseButton.classList.remove('time-control__button_hidden');
        }
    }

    _renderTimelineParts(partsCounter) {
        this._partLength = (this._timelineTotalWidth - 16)/ (partsCounter - 1);
        for (let part = 0; part < partsCounter; ++part) {
            this._timelineParts.push(part * this._partLength);
        }
    }
    
    _mousemoveTimelinePointerHandler(event) {
        event.preventDefault();
        if (event.clientX - this._initialXTimelinePointer > this._partLength) {
            if (this._currentTimelinePointerLeftX + this._partLength > this._timelineTotalWidth - 16) {
                this._timelinePointer.style.left = this._timelineTotalWidth - 16 + 'px';
                this._timelineCurrentElement.style.width = this._timelineTotalWidth + 'px';
            } else {
                this._timelinePointer.style.left = this._currentTimelinePointerLeftX + this._partLength + 'px';
                this._timelineCurrentElement.style.width = this._currentTimelinePointerLeftX + this._partLength + 8 + 'px';
            }
            this._initialXTimelinePointer = event.clientX;
            this._currentTimelinePointerLeftX += this._partLength;
        } else if (this._initialXTimelinePointer - event.clientX > this._partLength) {
            if (this._currentTimelinePointerLeftX - this._partLength < 0) {
                this._timelinePointer.style.left = 0 + 'px';
                this._timelineCurrentElement.style.width = 0 + 'px';
            } else {
                this._timelinePointer.style.left = this._currentTimelinePointerLeftX - this._partLength + 'px';
                this._timelineCurrentElement.style.width = this._currentTimelinePointerLeftX - this._partLength + 8 + 'px';
            }
            this._initialXTimelinePointer = event.clientX;
            this._currentTimelinePointerLeftX -= this._partLength;
        }
    }

    _mousedownTimelinePointerHandler(event) {
        event.preventDefault();
        this._timelinePointerMoved = true;
        this._initialXTimelinePointer = event.clientX;
        let timelinePointerStyle = getComputedStyle(this._timelinePointer);
        this._currentTimelinePointerLeftX = Number.parseFloat(timelinePointerStyle.getPropertyValue('left').slice(0, -2));
        window.addEventListener('mousemove', this._mousemoveTimelineHandlerFunctionObject);
    }

    _mouseupTimelinePointerHandler(event) {
        if (this._timelinePointerMoved) {
            window.removeEventListener('mousemove', this._mousemoveTimelineHandlerFunctionObject);
            this._timelinePointerMoved = false;
        }
    }

    linkPseudocode(pseudocode) {
        this._pseudocode = pseudocode;
    }

    linkTreeCanvas(treeCanvas) {
        this._treeCanvas = treeCanvas;
    }


// SPEED POINTER 


// const speedPointer = document.querySelector('.time-control__speed-pointer');
// let initialXSpeedPointer, newXSpeedPointer, currentSpeedPointerLeftX, speedPointerMoved = false;

// speedPointer.ondragstart = function() {
//     return false;
// };

// function mousemoveSpeedPointerHandler(event) {
//     event.preventDefault();
//     let difference = event.clientX - initialXSpeedPointer;
//     newXSpeedPointer = currentSpeedPointerLeftX + difference;
//     if (newXSpeedPointer >= 2 && newXSpeedPointer <= 96) {
//         speedPointer.style.left = newXSpeedPointer + 'px';
//     }
// }

// function mousedownSpeedPointerHandler(event) {
//     event.preventDefault();
//     speedPointerMoved = true;
//     initialXSpeedPointer = event.clientX;
//     let speedPointerStyle = getComputedStyle(speedPointer);
//     currentSpeedPointerLeftX = Number.parseInt(speedPointerStyle.getPropertyValue('left').slice(0, -2));
//     window.addEventListener('mousemove', mousemoveSpeedPointerHandler);
// }

// function mouseupSpeedPointerHandler(event) {
//     if (speedPointerMoved) {
//         window.removeEventListener('mousemove', mousemoveSpeedPointerHandler);
//         speedPointerMoved = false;
//     }
// }
}
