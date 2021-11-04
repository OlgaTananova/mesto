/** Функциональность редактирования карточек с фото **/
import {closePopup, openPopup,} from './utils.js';

export class Card {
  constructor(cardTitle, cardImageLink, cardTemplateSelector) {
    this._cardTitle = cardTitle;
    this._cardImageLink = cardImageLink;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _createCard() {
    this._card = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    const cardImage = this._card.querySelector('.element__image');
    const cardCaption = this._card.querySelector('.element__caption');
    cardCaption.textContent = this._cardTitle;
    cardImage.src = this._cardImageLink;
    cardImage.alt = `Фото:${this._cardTitle}`;
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    const cardLikeBtn = this._card.querySelector('.element__like-button');
    const cardDeleteBtn = this._card.querySelector('.element__trash-button');
    const cardImage = this._card.querySelector('.element__image');
    const viewImagePopup = document.querySelector('.popup_type_image-view');
    const closeViewImagePopupBtn = viewImagePopup
      .querySelector('.popup__close-button_type_image-view');
    cardLikeBtn.addEventListener('click', (event) => {
      this._like(event)
    });
    cardDeleteBtn.addEventListener('click', (event) => {
      this._deleteCard(event)
    });
    cardImage.addEventListener('click', (event) => {
      this._openViewImagePopup(event)
    });
    closeViewImagePopupBtn.addEventListener('click', this._closeViewImagePopup);
  }

  renderCard() {
    return this._createCard();
  }

  _like(event) {
    event.target.classList.toggle('element__like-button_active');
  }

  _deleteCard(event) {
    event.target.closest('.element').remove();
  }

  _openViewImagePopup(event) {
    const viewImagePopup = document.querySelector('.popup_type_image-view');
    const viewImagePopupImg = viewImagePopup.querySelector('.popup__image');
    const viewImagePopupImgCaption = viewImagePopup
      .querySelector('.popup__image-caption');
    viewImagePopupImg.src = event.target.src;
    viewImagePopupImg.alt = event.target.alt;
    viewImagePopupImgCaption.textContent = event.target.parentNode
      .querySelector('.element__caption').textContent;
    openPopup(viewImagePopup);
  }

  _closeViewImagePopup() {
    const viewImagePopup = document.querySelector('.popup_type_image-view');
    closePopup(viewImagePopup);
  }
}

