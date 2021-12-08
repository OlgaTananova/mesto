/*** Общий файл ***/

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import Api from '../scripts/components/Api.js';
import {
  addCardButton,
  cardTemplateSelector,
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
  updateUserAvatarPopupSelector,
  updateUserAvatarFormElement,
  updateUserAvatarButton,
  userAvatar,
  userName,
  userDescription,
  confirmDeletePopupSelector,
  cardElementContainerSelector,
} from '../scripts/utils/constants.js';
import './index.css';

const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '65021073-788a-4fae-b274-a844bf3e53d6',
    'Content-Type': 'application/json'
  }});

api.getUserInfo()
  .then(result =>{
  userAvatar.src = result.avatar;
  userName.textContent = result.name;
  userDescription.textContent = result.about;
});

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
    api.editProfile(formData); // Отправляем на сервер обновленные данные
    editProfilePopup.close();
  }
});
editProfilePopup.setEventListeners();

// Экземпляр попапа валидатора формы обновления аватара пользователя
const updateUserAvatarFormValidator = new FormValidator(object, updateUserAvatarFormElement);
updateUserAvatarFormValidator.enableValidator();

// Экземпляр попапа редактирования аватара пользователя
const updateUserAvatarPopup = new PopupWithForm({popupSelector: updateUserAvatarPopupSelector,
handleFormSubmit:(formData)=>{
  userAvatar.src = formData.link; // Подгружаем данные на страницу
  api.updateUserAvatar(formData.link); // Отправляем обновленные данные на сервер
  updateUserAvatarPopup.close();
}});
updateUserAvatarPopup.setEventListeners();

// Слушатель клика кнопки редактирования профиля пользователя
editProfileButton.addEventListener('click', () => {
  editProfileValidator.clearPreviousValidation(); // Очищаем поля от предыдущей валидации
  const defaultUserInfo = userInfo.getUserInfo();
  userNameInput.value = defaultUserInfo.name;
  userDescriptionInput.value = defaultUserInfo.description; // Загружаем в форму данные из профайла
  editProfileValidator.toggleSubmitButtonState(); // Проверяем состояние кнопки submit'a
  editProfilePopup.open();
});

// Слушатель клика кнопки редактирования аватара пользователя
updateUserAvatarButton.addEventListener('click', ()=>{
  updateUserAvatarFormValidator.clearPreviousValidation();
  updateUserAvatarFormValidator.toggleSubmitButtonState();
  updateUserAvatarPopup.open();
});

/** Функциональность карточек с фото **/
// Функция создания экземпляра карточки
const createNewCard = (item) => {
  const card = new Card(item.name,
    item.link,
    item.likes.length,
    item.owner._id,
    item._id,
    cardTemplateSelector,
    () => {
    viewCardImagePopup.open(item)
  },
    ()=>{
    deleteCardPopup.open(item._id, card);
  },
    ()=>{
    api.likeCard(item._id)
      .then(res=>{
        card.updateLikeQty(res.likes.length)
      })
    },
    ()=>{
    api.dislikeCard(item._id)
      .then(res=>{
        card.updateLikeQty(res.likes.length)
      })
    })
  card.createCard();
  api.getUserInfo()
    .then(data=>{
      card.removeDeleteBtn(data._id);
    })
  return card.createCard();
}

const cardList = new Section(cardElementContainerSelector);

api.getInitialCards().then(
  (data)=>{
    data.forEach(item =>{
      cardList.addItem(createNewCard(item));
    })
  }
);

// Экземпляр класса валидатора формы добавления карточки
const formAddCardValidator = new FormValidator(object, addCardFormElement);
formAddCardValidator.enableValidator();

// Экземпляр класса попапа добавления карточек
const addCardPopup = new PopupWithForm({
  popupSelector: addCardPopupSelector, handleFormSubmit: (formData) => {
    api.addNewCard(formData) // Отправляем карточку на сервер
      .then(res=>{
        const card = createNewCard(res);
        cardList.addItem(card);
      })
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

const deleteCardPopup = new PopupWithConfirmation(confirmDeletePopupSelector, (cardId, card)=>{
  api.deleteCard(cardId)
  document.getElementById(cardId).remove();
  deleteCardPopup.close();

});
deleteCardPopup.setEventListeners();



