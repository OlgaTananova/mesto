/** Класс Card для создания карточек с фото **/

export default class Card {
  constructor(cardTitle,
              cardImageLink,
              cardLikes,
              ownerId,
              cardId,
              cardTemplateSelector,
              handleCardClick,
              handleDltBtnClick,
              handleLikeBtnClick,
              handleDislikeBtnClick) {
    this._cardTitle = cardTitle;
    this._cardImageLink = cardImageLink;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDltBtnClick = handleDltBtnClick;
    this._cardLikes = cardLikes;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._handleLikeBtnClick = handleLikeBtnClick;
    this._handleDislikeBtnClick = handleDislikeBtnClick;
  }

  createCard() {
    this._card = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    this._cardImage = this._card.querySelector('.element__image');
    this._cardCaption = this._card.querySelector('.element__caption');
    this._cardLikeBtn = this._card.querySelector('.element__like-button');
    this._cardDeleteBtn = this._card.querySelector('.element__trash-button');
    this._cardLikesQty = this._card.querySelector('.element__likes-qty');
    this._cardCaption.textContent = this._cardTitle;
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = `Фото:${this._cardTitle}`;
    this._cardLikesQty.textContent = this._cardLikes;
    this._card.id = this._cardId;
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener('click', () => {
      this._like()
    });
    this._cardDeleteBtn.addEventListener('click', () => {
      this._handleDltBtnClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  _like() {
    this._cardLikeBtn.classList.toggle('element__like-button_active');
    if (this._cardLikeBtn.classList.contains('element__like-button_active')) {
      this._handleLikeBtnClick(this._cardId);
    }
    if (!this._cardLikeBtn.classList.contains('element__like-button_active')) {
      this._handleDislikeBtnClick(this._cardId);
    }
  }

  removeDeleteBtn(userId) {
    if(userId !== this._ownerId) {
      this._cardDeleteBtn.remove()
    }
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  updateLikeQty(qty){
    this._cardLikesQty.textContent = qty;
  }
}

