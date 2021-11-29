/** Класс PopupWithImage для попапа с картинкой **/

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(item) {
    this._viewImagePopupImg = this._popup.querySelector('.popup__image');
    this._viewImagePopupCaption = this._popup.querySelector('.popup__image-caption');
    this._viewImagePopupImg.src = item.link;
    this._viewImagePopupCaption.textContent = item.name;
    super.open();
  }
}

