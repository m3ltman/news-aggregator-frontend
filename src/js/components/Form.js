/* eslint class-methods-use-this: 0 */

import BaseComponent from './BaseComponent';
import activateInputError from '../utils/activate-input-error';
import resetError from '../utils/reset-error';
import disableSubmitBtn from '../utils/disable-submit-btn';
import enableSubmitBtn from '../utils/enable-submit-btn';

export default class Form extends BaseComponent {
  constructor(searchBtn, searchBar) {
    super();
    this.searchBtn = searchBtn;
    this.searchBar = searchBar;
  }

  _validateInputElement(input) {
    const errorElement = document.querySelector(`#error-${input.id}`);

    if (!input.checkValidity()) {
      errorElement.textContent = input.validationMessage;
      activateInputError(input);
      return false;
    }
    return true;
  }

  validateForm(e) {
    resetError(e.target, 'input-container_invalid');
    this._validateInputElement(e.target);
  }

  validateSearch() {

    if (!this.searchBar.checkValidity()) {
      this.searchBar.placeholder = 'Нужно ввести ключевое слово';
      this.searchBar.classList.add('search__bar_invalid');
      disableSubmitBtn(document.querySelector('.search__box'));
      return false;
    }
    this.searchBar.placeholder = 'Введите тему новости';
    this.searchBar.classList.remove('search__bar_invalid');
    enableSubmitBtn(document.querySelector('.search__box'));
    return true;
  }


  setEventListeners() {
    this._setHandlers([
      { element: this.searchBtn, event: 'click', callback: _ => this.validateSearch() },
      { element: this.searchBar, event: 'input', callback: _ => this.validateSearch() },
    ]);
  }
}
