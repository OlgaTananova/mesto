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
export const confirmDeletePopupFormElement = document.querySelector(confirmDeletePopupSelector);
export const addCardSubmitBtn = addCardFormElement.querySelector('.popup__form-submit-button');
export const confirmDeleteSubmitBtn = confirmDeletePopupFormElement.querySelector('.popup__form-submit-button');

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


