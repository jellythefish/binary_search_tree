const menuButton = document.querySelector('.header__menu-button');
const createTreeButton = document.querySelectorAll('.menu__button_option')[0];
const menu = document.querySelector('.menu')
const suboptions = document.querySelector('.menu__suboptions')

function menuButtonHandler(event) {
    menu.classList.toggle('menu_is-opened');
}

function menuCreateTreeButtonHandler(event) {
    suboptions.classList.toggle('menu__suboptions_is-opened');
}

export { menuButton, createTreeButton, menu, suboptions, menuButtonHandler, menuCreateTreeButtonHandler }
