/** Класса Popup для открытия и закрытия попапов **/

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup__container')) {
        this.close();
      }
    });
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }
}

