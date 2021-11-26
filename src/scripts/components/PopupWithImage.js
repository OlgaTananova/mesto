/** Класс PopupWithImage для попапа с картинкой **/

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardImage, cardTitle) {
    super.open();
    this._viewImagePopupImg = this._popup.querySelector('.popup__image');
    this._viewImagePopupCaption = this._popup.querySelector('.popup__image-caption');
    this._viewImagePopupImg.src = cardImage;
    this._viewImagePopupCaption.textContent = cardTitle;
  }
}

