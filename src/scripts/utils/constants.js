/** Элементы (кнопки и блоки) **/

// Элементы для редактирования профиля пользователя
export const profile = document.querySelector('.profile');
export const editProfilePopupSelector = '.popup_type_edit-profile-form';
export const editProfilePopup = document.querySelector(editProfilePopupSelector);
export const editProfileButton = profile.querySelector('.profile__edit-button');
export const editProfileFormElement = editProfilePopup
  .querySelector('.popup__form_type_edit-profile-form');
export const editProfileSubmitBtn = editProfileFormElement.querySelector('.popup__form-submit-button')
export const userNameSelector = '.profile__name';
export const userDescriptionSelector = '.profile__description';
export const userName = profile.querySelector(userNameSelector);
export const userDescription = profile.querySelector(userDescriptionSelector);
export const userNameInput = editProfileFormElement
  .querySelector('.popup__form-item_type_profile-name');
export const userDescriptionInput = editProfileFormElement
  .querySelector('.popup__form-item_type_profile-description');
export const updateUserAvatarPopupSelector = '.popup_type_update-avatar-form';
export const updateUserAvatarFormElement = document.querySelector('.popup__form_type_update-avatar-form');
export const updateUserAvatarButton = profile.querySelector('.profile__avatar-container');
export const userAvatar = profile.querySelector('.profile__avatar');
export const updateAvatarSubmitBtn = updateUserAvatarFormElement.querySelector('.popup__form-submit-button');


// Элементы для добавления карточек
export const addCardButton = profile.querySelector('.profile__add-button');
export const addCardPopupSelector = '.popup_type_add-card-form';
export const addCardPopup = document.querySelector(addCardPopupSelector);
export const addCardFormElement = addCardPopup
  .querySelector('.popup__form_type_add-card-form');
export const cardElementContainerSelector = '.elements';
export const cardTemplateSelector = '#element-template';
export const viewImagePopupSelector = '.popup_type_image-view';
export const confirmDeletePopupSelector = '.popup_type_confirm-delete-form';
export const addCardSubmitBtn = addCardFormElement.querySelector('.popup__form-submit-button');

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


