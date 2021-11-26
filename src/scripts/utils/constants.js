/** Элементы (кнопки и блоки) **/

// Элементы для редактирования профиля пользователя
export const profile = document.querySelector('.profile');
export const editProfilePopupSelector = '.popup_type_edit-profile-form';
export const editProfilePopup = document.querySelector(editProfilePopupSelector);
export const editProfileButton = profile.querySelector('.profile__edit-button');
export const editProfileFormElement = editProfilePopup
  .querySelector('.popup__form_type_edit-profile-form');
export const userName = '.profile__name';
export const userDescription = '.profile__description'


// Элементы для добавления карточек
export const addCardButton = profile.querySelector('.profile__add-button');
export const addCardPopupSelector = '.popup_type_add-card-form';
export const addCardPopup = document.querySelector(addCardPopupSelector);
export const addCardFormElement = addCardPopup
  .querySelector('.popup__form_type_add-card-form');
export const cardElementContainer = '.elements';
export const cardTemplateSelector = '#element-template';
export const viewImagePopupSelector = '.popup_type_image-view';

import arkhyzPhoto from '../../images/element_photo_arhyz.jpg';
import chelPhoto from '../../images/element_photo_chelyabinsk-oblast.jpg';
import altai from '../../images/element_photo_gorny-altay.jpg';
import kamchatka from '../../images/element_photo_kamchatka.jpg'
import karachaevsk from '../../images/element_photo_karachaevsk.jpg';
import baikal from '../../images/element_photo_baikal_2.jpg';



// Массив карточек для загрузки на странице
export const initialCards = [{
  name: 'Архыз',
  link: arkhyzPhoto
}, {
  name: 'Челябинская область',
  link: chelPhoto
}, {
  name: 'Горный Алтай',
  link: altai
}, {
  name: 'Камчатка',
  link: kamchatka
}, {
  name: 'Карачаево-Черкессия',
  link: karachaevsk
}, {
  name: 'Байкал',
  link: baikal
}];

// Объект с селекторами классами для валидации форм
export const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-submit-button',
  inactiveButtonClass: 'popup__form-submit-button_inactive',
  inputErrorClass: 'popup__form-item_invalid',
  errorClass: 'popup__input-error_active',
  errorSelector: '.popup__input-error'
};


