/*** Общий файл ***/

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {
  addCardButton,
  cardTemplateSelector,
  cardElementContainer,
  initialCards,
  addCardPopupSelector,
  addCardFormElement,
  object,
  editProfilePopupSelector,
  editProfileFormElement,
  userNameSelector,
  userDescriptionSelector,
  userNameInput,
  userDescriptionInput,
  editProfileButton,
  viewImagePopupSelector,
} from '../scripts/utils/constants.js';
import './index.css';

/** Функциональность редактирования профиля пользователя **/

// Экземпляр класса для управления данными пользователя
const userInfo = new UserInfo(userNameSelector, userDescriptionSelector);


// Экземпляр класса валидатора для формы профиля пользователя
const editProfileValidator = new FormValidator(object, editProfileFormElement);
editProfileValidator.enableValidator();

// Экземпляр попапа редактирования профиля пользователя
const editProfilePopup = new PopupWithForm({
  popupSelector: editProfilePopupSelector, handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    editProfilePopup.close();
  }
});
editProfilePopup.setEventListeners();

// Слушатель клика кнопки редактирования профиля пользователя
editProfileButton.addEventListener('click', () => {
  editProfileValidator.clearPreviousValidation(); // Очищаем поля от предыдущей валидации
  const defaultUserInfo = userInfo.getUserInfo();
  userNameInput.value = defaultUserInfo.name;
  userDescriptionInput.value = defaultUserInfo.description; // Загружаем в форму данные из профайла
  editProfileValidator.toggleSubmitButtonState(); // Проверяем состояние кнопки submit'a
  editProfilePopup.open();
});

/** Функциональность карточек с фото **/

// Функция создания экземпляра карточки
const newCard = (item) => {
  const card = new Card(item.name, item.link, cardTemplateSelector, () => {
    viewCardImagePopup.open(item)
  });
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
}

// Экземпляр класса Section для добавления карточек на страницу
const cardList = new Section({
  items: initialCards, renderer: (item) => {
    newCard(item); // Создаем экземпляр новой карточки
  }
}, cardElementContainer);
cardList.renderItems();

// Экземпляр класса валидатора формы добавления карточки
const formAddCardValidator = new FormValidator(object, addCardFormElement);
formAddCardValidator.enableValidator();

// Экземпляр класса попапа добавления карточек
const addCardPopup = new PopupWithForm({
  popupSelector: addCardPopupSelector, handleFormSubmit: (formData) => {
    newCard(formData); // Создаем экземпляр новой карточки
    addCardPopup.close();
  },
});
addCardPopup.setEventListeners();

// Слушатель клика кнопки добавления карточек (открывает попап)
addCardButton.addEventListener('click', () => {
  formAddCardValidator.clearPreviousValidation(); // Очищаем поля от предыдущей валидации
  formAddCardValidator.toggleSubmitButtonState(); // Проверяем состояние кнопки submit'а
  addCardPopup.open();
});

// Экземпляр класса попапа просмотра фото карточки
const viewCardImagePopup = new PopupWithImage(viewImagePopupSelector);
viewCardImagePopup.setEventListeners();





