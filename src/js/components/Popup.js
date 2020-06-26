/* eslint class-methods-use-this: 0 */
/* eslint no-restricted-syntax: 0 */

import BaseComponent from './BaseComponent';
import disableSubmitBtn from '../utils/disable-submit-btn';
import enableSubmitBtn from '../utils/enable-submit-btn';
import resetError from '../utils/reset-error';
import { MOBILE_MENU } from '../constants/constants';

export default class PopUp extends BaseComponent {
  constructor(popup, formClass) {
    super();
    this._popup = popup;
    this.formClass = formClass;
    this.form = this._popup.querySelector('.popup__form');
    this.serverError = this._popup.querySelector('.popup__api-error');
    this.switchBtn = this._popup.querySelector('.popup__switch-link');
    this.closeBtn = this._popup.querySelector('.popup__close');
    this.submitBtn = this._popup.querySelector('.button');
  }

  setServerError(err) {
    this.serverError.textContent = err;
    this.serverError.classList.add('popup__api-error_visible');
  }

  open(popup) {
    popup.classList.add('popup_is-opened');
    this.setEventListeners();
    MOBILE_MENU.setAttribute('style', 'display:none');
  }

  resetSubmitBtn() {
    let submitButtonActive = true;

    for (const input of this.form) {
      if (input.name.length === 0) {
        continue;
      }

      if (submitButtonActive) {
        submitButtonActive = input.checkValidity();
      }
    }

    if (!submitButtonActive) {
      disableSubmitBtn(this.form);
    } else {
      enableSubmitBtn(this.form);
    }
  }

  clearContent() {
    const inputs = this.form.querySelectorAll('input');
    inputs.forEach((input) => {
      resetError(input, 'input-container_invalid');
    });
    this.form.reset();
    if (this.serverError.classList.contains('popup__api-error_visible')) {
      this.serverError.classList.remove('popup__api-error_visible');
    }
    disableSubmitBtn(this.form);
  }

  close() {
    this.clearContent();
    this._popup.classList.remove('popup_is-opened');
    MOBILE_MENU.removeAttribute('style', 'display:none');
  }

  _handleKeyDown(e) {
    if (e.key === 'Escape') { this.close(); }
  }

  _handleMouseDown(e) {
    if (e.target.classList.contains('popup_is-opened')) { this.close(); }
  }
}
