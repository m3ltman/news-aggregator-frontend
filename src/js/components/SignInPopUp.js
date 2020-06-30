import PopUp from './Popup';
import { HEADER, HEADER_LOGGED_OUT } from '../constants/constants';

export default class SignInPopUp extends PopUp {
  constructor(popup, formClass, registrationPopUp, mainApi, headerClass, cardClass) {
    super(popup, formClass);
    this.registrationPopUp = registrationPopUp;
    this.mainApi = mainApi;
    this.setServerError = this.setServerError.bind(this);
    this.setSuccessSignIn = this.setSuccessSignIn.bind(this);
    this._headerClass = headerClass;
    this._cardClass = cardClass;
  }

  setSuccessSignIn(name) {
    this.close();
    HEADER.removeChild(HEADER.querySelector('nav'));
    this._headerClass.render({ isLoggedin: true, userName: name });
    this._cardClass.renderCardIcons();
  }

  submit(e) {
    e.preventDefault();
    this.mainApi.signin(this.form.elements.email.value, this.form.elements.password.value, this.setServerError, this.setSuccessSignIn);
  }

  setEventListeners() {
    this._setHandlers([
      { element: document, event: 'keydown', callback: e => this._handleKeyDown(e) },
      { element: document, event: 'mousedown', callback: e => this._handleMouseDown(e) },
      { element: this.closeBtn, event: 'click', callback: _ => this.close() },
      { element: this.switchBtn, event: 'click', callback: _ => { this.close(); this.open(this.registrationPopUp); } },
      { element: this.submitBtn, event: 'click', callback: (e) => { this.submit(e); } },
      { element: this.form, event: 'input', callback: (e) => { this.formClass.validateForm(e); this.resetSubmitBtn(); } },
    ]);
  }
}
