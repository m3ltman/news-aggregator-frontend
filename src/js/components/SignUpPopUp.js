import PopUp from './Popup';
import disableSubmitBtn from '../utils/disable-submit-btn';

export default class SignUpPopUp extends PopUp {
  constructor(popup, formClass, entrancePopUp, mainApi, successPopUp) {
    super(popup, formClass);
    this.entrancePopUp = entrancePopUp;
    this.mainApi = mainApi;
    this.successPopUp = successPopUp;
    this.setServerError = this.setServerError.bind(this);
    this.setSuccessPopUp = this.setSuccessPopUp.bind(this);
    this.close = this.close.bind(this);
  }

  setSuccessPopUp() {
    this.close();
    this.open(this.successPopUp);
  }

  submit(e) {
    e.preventDefault();
    this.mainApi.signup(this.form.elements.email.value, this.form.elements.password.value, this.form.elements.name.value, this.setServerError, this.setSuccessPopUp);
  }

  setEventListeners() {
    this._setHandlers([
      { element: document, event: 'keydown', callback: e => this._handleKeyDown(e) },
      { element: document, event: 'mousedown', callback: e => this._handleMouseDown(e) },
      { element: this.closeBtn, event: 'click', callback: _ => this.close() },
      { element: this.switchBtn, event: 'click', callback: _ => { this.close(); this.open(this.entrancePopUp); } },
      { element: this.submitBtn, event: 'click', callback: (e) => this.submit(e) },
      { element: this.form, event: 'input', callback: (e) => { this.formClass.validateForm(e); this.resetSubmitBtn(); } },
    ]);
  }
}
