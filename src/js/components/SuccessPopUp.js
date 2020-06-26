import PopUp from './Popup';

export default class SuccessPopUp extends PopUp {
  constructor(popup, entrancePopUp) {
    super(popup);
    this.entrancePopUp = entrancePopUp;
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
  }

  setEventListeners() {
    this._setHandlers([
      { element: document, event: 'keydown', callback: e => this._handleKeyDown(e) },
      { element: document, event: 'mousedown', callback: e => this._handleMouseDown(e) },
      { element: this.closeBtn, event: 'click', callback: _ => this.close() },
      { element: this.switchBtn, event: 'click', callback: _ => { this.close(); this.open(this.entrancePopUp); } },
    ]);
  }
}
