/** Класс Card для создания карточек с фото **/

export default class Card {
  constructor(cardTitle, cardImageLink, cardTemplateSelector, handleCardClick) {
    this._cardTitle = cardTitle;
    this._cardImageLink = cardImageLink;
    this._cardTemplateSelector = cardTemplateSelector;
    this._card = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    this._cardImage = this._card.querySelector('.element__image');
    this._cardCaption = this._card.querySelector('.element__caption');
    this._cardLikeBtn = this._card.querySelector('.element__like-button');
    this._cardDeleteBtn = this._card.querySelector('.element__trash-button');
    this._handleCardClick = handleCardClick;
  }

  createCard() {
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
    this._cardImage.addEventListener('click', (event) => {
      this._handleCardClick(event);
    })
  }

  _like() {
    this._cardLikeBtn.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }
}

