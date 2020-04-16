const pseudocodeWindow = document.querySelector(".pseudocode");
const pseudocodeButton = document.querySelector(".pseudocode__button");
let initialXPseudocode, newXPseudocode, currentPseudocodeWindowRightX, pseudocodeButtonMoved = false;

pseudocodeButton.ondragstart = function() {
    return false;
};

function mousemovePseudocodeButtonHandler(event) {
    event.preventDefault();
    let difference = event.clientX - initialXPseudocode;
    newXPseudocode = currentPseudocodeWindowRightX - difference;
    if (newXPseudocode >= -386 && newXPseudocode <= 0) {
        pseudocodeWindow.style.right = newXPseudocode + 'px';
    } 
}

function mousedownPseudocodeButtonHandler(event) {
    event.preventDefault();
    pseudocodeButtonMoved = true;
    initialXPseudocode = event.clientX;
    let pseudocodeWindowStyle = getComputedStyle(pseudocodeWindow);
    currentPseudocodeWindowRightX = Number.parseInt(pseudocodeWindowStyle.getPropertyValue('right').slice(0, -2));
    window.addEventListener('mousemove', mousemovePseudocodeButtonHandler);
}

function mouseupPseudocodeButtonHandler(event) {
    if (pseudocodeButtonMoved) {
        processPseudocodeWindowPosition();
        window.removeEventListener('mousemove', mousemovePseudocodeButtonHandler);
        pseudocodeButtonMoved = false;
    }
}

function processPseudocodeWindowPosition() {
    if (newXPseudocode > -193) {
        pseudocodeWindow.style.right = '0px';
        pseudocodeButton.classList.add('pseudocode__button_close');
    } else {
        pseudocodeWindow.style.right = '-386px';
        pseudocodeButton.classList.remove('pseudocode__button_close');
    }
}

export { pseudocodeWindow, pseudocodeButton, initialXPseudocode, newXPseudocode, pseudocodeButtonMoved,
    mousemovePseudocodeButtonHandler, mousedownPseudocodeButtonHandler, mouseupPseudocodeButtonHandler,
    processPseudocodeWindowPosition
}