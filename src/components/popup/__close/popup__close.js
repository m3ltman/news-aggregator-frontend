const page = document.querySelector('.page');
const mobileMenu = document.querySelector('.header__show-menu-btn');

page.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__close')) {
    event.target.closest('.popup').classList.remove('popup_is-opened');
  }
  mobileMenu.classList.remove('header__show-menu-btn_hidden');
});
