/** Класс PopupWithImage для попапа с картинкой **/

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._viewImagePopupImg = this._popup.querySelector('.popup__image');
    this._viewImagePopupCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(item) {
    this._viewImagePopupImg.src = item.link;
    this._viewImagePopupCaption.textContent = item.name;
    this._viewImagePopupImg.alt = `Фото: ${item.name}`;
    super.open();
  }
}

