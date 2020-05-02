import './__close/popup__close';

const popUp = document.querySelector('.popup');
console.log(popUp);
const mobileMenu = document.querySelector('.header__show-menu-btn');
console.log(mobileMenu);

if (popUp.classList.contains('popup_is-opened')) {
  mobileMenu.classList.toggle('header__show-menu-btn_hidden');
}
