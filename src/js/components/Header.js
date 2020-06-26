/* eslint class-methods-use-this: 0 */
import BaseComponent from './BaseComponent';
import { MOBILE_MENU, HEADER } from '../constants/constants';
import { HEADER_LOGGED_OUT, HEADER_LOGGED_IN, HEADER_DARK } from '../constants/header-markup';

export default class Header extends BaseComponent {
  constructor({ headerColor, handlePopup }, cardClass) {
    super();
    this.headerColor = headerColor;
    this.handlePopup = handlePopup;
    this._cardClass = cardClass;
  }

  render({ isLoggedin, userName }) {

    if (this.headerColor === 'dark') {
      HEADER.classList.add('header_color_dark');
      HEADER.firstElementChild.insertAdjacentHTML('afterend', HEADER_DARK);
      HEADER.querySelector('.header__username').textContent = `${userName}`;
      HEADER.querySelector('#logout-button').onclick = () => {
        this.closeMobileMenu();
        window.location.href = '../';
        this.logout();
      };
    }
    if (isLoggedin === false) {
      HEADER.firstElementChild.insertAdjacentHTML('afterend', HEADER_LOGGED_OUT);
      HEADER.querySelector('#auth-button').addEventListener('click', _ => { this.handlePopup(); this.closeMobileMenu(); });
    } else if (isLoggedin === true && this.headerColor === 'main-regular') {
      HEADER.firstElementChild.insertAdjacentHTML('afterend', HEADER_LOGGED_IN);
      HEADER.querySelector('.header__username').textContent = `${userName}`;
      HEADER.querySelector('#logout-button').addEventListener('click', () => {
        this.closeMobileMenu();
        this.logout();
      });
    }
  }

  closeMobileMenu() {
    if (HEADER.classList.contains('header_mobile')) { HEADER.classList.remove('header_mobile'); }
  }

  logout() {
    HEADER.removeChild(HEADER.querySelector('#header-logged-in'));
    this.render({ isLoggedin: false });
    localStorage.removeItem('user');
    this._cardClass.renderCardIcons();
  }


  setEventListeners() {
    this._setHandlers([
      { element: MOBILE_MENU, event: 'click', callback: _ => HEADER.classList.toggle('header_mobile') },
    ]);
  }
}
