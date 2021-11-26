/** Класса Popup для открытия и закрытия попапов **/

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', (event) => {
      this._handleEscClose(event)
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', (event) => {
      this._handleEscClose(event)
    });
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._closeButton.addEventListener('click', () => {
      this.close(this._popup)
    });
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup__container')) {
        this.close(this._popup)
      }
    });
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close(this._popup);
    }

  }
}
