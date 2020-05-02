const header = document.querySelector('.header');

document.querySelector('.header__show-menu-btn').addEventListener('click', () => {
  header.classList.toggle('header_mobile');
});
