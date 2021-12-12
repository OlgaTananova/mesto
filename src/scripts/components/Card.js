/** Класс Card для создания карточек с фото **/

export default class Card {
  constructor(cardTitle,
              cardImageLink,
              cardLikes,
              ownerId,
              cardId,
              cardTemplateSelector,
              currentUserId,
              handleCardClick,
              handleDltBtnClick,
              handleLikeBtnClick) {
    this._cardTitle = cardTitle;
    this._cardImageLink = cardImageLink;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDltBtnClick = handleDltBtnClick;
    this._cardLikes = cardLikes;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._handleLikeBtnClick = handleLikeBtnClick;
    this._currentUserId = currentUserId;
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
    this._cardLikesQty.textContent = this._cardLikes.length;
    this._card.id = this._cardId;
    if (this._currentUserId !== this._ownerId) { // Если id пользователя не совпадает с id
      this._cardDeleteBtn.classList.add('element__trash-button_inactive'); // владельца карточки
    }                                                                     // деактивируем иконку удаления
    if (this._cardLikes.some(item => { // Если в массиве лайков есть лайк от пользователя
      return (item._id === this._currentUserId); // то закрашиваем кнопку лайка
    })) {
      this._like();
    }
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener('click', () => {
      if (!this._cardLikeBtn.classList.contains('element__like-button_active')) {
        this._handleLikeBtnClick(true);
      } else {
        this._handleLikeBtnClick(false);
      }
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
  }

  updateLikeQty(qty) {
    this._cardLikesQty.textContent = qty;
    this._like();
  }
}

