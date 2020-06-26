export default class BaseComponent {
  constructor() {
    this._handlers = [];
  }

  _setHandlers(eventObjects = []) {
    eventObjects.forEach(eventObject => this._setEventListener(eventObject));
  }

  _setEventListener({ element, event, callback }) {
    element.addEventListener(event, callback);
    this._handlers.push({ element, event, callback });
  }

  removeEventListeners() {
    this._handlers.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
  }
}
