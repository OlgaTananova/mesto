/** Функциональность редактирования карточек с фото **/

import {openPopup} from './utils.js';
import {viewImagePopup, viewImagePopupImg, viewImagePopupImgCaption} from
    './index.js'

export class Card {
  constructor(cardTitle, cardImageLink, cardTemplateSelector) {
    this._cardTitle = cardTitle;
    this._cardImageLink = cardImageLink;
    this._cardTemplateSelector = cardTemplateSelector;
    // Прим. для ревьюера: вынесла элементы ниже в конструктор, чтобы не
    // определять их в отдельных методах класса (по аналогии с классом FormValidator).
    this._card = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    this._cardImage = this._card.querySelector('.element__image');
    this._cardCaption = this._card.querySelector('.element__caption');
    this._cardLikeBtn = this._card.querySelector('.element__like-button');
    this._cardDeleteBtn = this._card.querySelector('.element__trash-button');
  }

  _createCard() {
    this._cardCaption.textContent = this._cardTitle;
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = `Фото:${this._cardTitle}`;
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener('click', () => {
      this._like(this._card)
    });
    this._cardDeleteBtn.addEventListener('click', () => {
      this._deleteCard(this._card)
    });
    this._cardImage.addEventListener('click', () => {
      this._openViewImagePopup(this._card);
    });
  }

  renderCard() {
    return this._createCard();
  }

  _like() {
    this._cardLikeBtn.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _openViewImagePopup() {
    viewImagePopupImg.src = this._cardImage.src;
    viewImagePopupImg.alt = this._cardImage.alt;
    viewImagePopupImgCaption.textContent = this._cardCaption.textContent;
    openPopup(viewImagePopup);
  }
}

