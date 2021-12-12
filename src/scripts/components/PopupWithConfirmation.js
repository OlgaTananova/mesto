/** Класс попапа для подтверждения действий пользователя PopupWithConfirmation **/

import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector)
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__form-submit-button');
  }
  open(cardId) {
    super.open();
    this._cardId = cardId;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.value = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранить...';
    } else {
      this._submitButton.textContent = this._submitButton.value;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._handleSubmitForm(this._cardId);
    });
  }
}
