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
  editProfileSubmitBtn,
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
  updateAvatarSubmitBtn,
  addCardSubmitBtn,
  confirmDeleteSubmitBtn
} from '../scripts/utils/constants.js';
import './index.css';

//Экземпляр класса Api для сетевых запросов
const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '65021073-788a-4fae-b274-a844bf3e53d6',
    'Content-Type': 'application/json'
  }
});

/** Функциональность редактирования профиля пользователя **/

// Функция изменения состояния кнопки submit при загрузке данных на сервер
function renderLoading(button, isLoading) {
  if (isLoading) {
    button.value = button.textContent;
    button.textContent = 'Сохранить...'
  } else {
    button.textContent = button.value;
  }
}

// Экземпляр класса для для добавления карточек на страницу
const cardList = new Section(cardElementContainerSelector);

// Подгружаем данные о пользователе и карточки с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    userAvatar.src = res[0].avatar;
    userName.textContent = res[0].name;
    userName.id = res[0]._id; // Сохраняем id пользователя
    userDescription.textContent = res[0].about;
    res[1].forEach((item) => {
      cardList.addItem(createNewCard(item));
    });
  });

// Экземпляр класса для управления данными пользователя
const userInfo = new UserInfo(userNameSelector, userDescriptionSelector);

// Экземпляр класса валидатора для формы профиля пользователя
const editProfileValidator = new FormValidator(object, editProfileFormElement);
editProfileValidator.enableValidator();

// Экземпляр попапа редактирования профиля пользователя
const editProfilePopup = new PopupWithForm({
  popupSelector: editProfilePopupSelector, handleFormSubmit: (formData) => {
    renderLoading(editProfileSubmitBtn, true);
    api.editProfile(formData) // Отправляем на сервер обновленные данные
      .then(()=>{
        userInfo.setUserInfo(formData); // Подгружаем данные на страницу
      })
      .finally( ()=> {
          renderLoading(editProfileSubmitBtn, false)
        }
      )
    editProfilePopup.close();
  }
});
editProfilePopup.setEventListeners();

// Экземпляр класса валидатора формы обновления аватара пользователя
const updateUserAvatarFormValidator = new FormValidator(object, updateUserAvatarFormElement);
updateUserAvatarFormValidator.enableValidator();

// Экземпляр попапа редактирования аватара пользователя
const updateUserAvatarPopup = new PopupWithForm({popupSelector: updateUserAvatarPopupSelector,
handleFormSubmit:(formData)=>{
  renderLoading(updateAvatarSubmitBtn, true);
  api.updateUserAvatar(formData.link)// Отправляем обновленные данные на сервер
    .then((res)=>{
      userAvatar.src = res.avatar; // Загружаем картинку на страницу
    })
    .finally(()=>{
      renderLoading(updateAvatarSubmitBtn, false);
    })
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
    item.likes,
    item.owner._id,
    item._id,
    cardTemplateSelector,
    userName.id,
    () => {
    viewCardImagePopup.open(item) // Открываем попап с картинкой
  }, () => {
    deleteCardPopup.open(item._id); // Открываем попап подтверждения удаления карточки
  }, (isLike) => { // Обрабатываем клик лайка карточки
    if (isLike) {
      api.likeCard(item._id) // Лайкаем карточку, отправляем данные на сервер
        .then(res => {
          card.updateLikeQty(res.likes.length); // и обновляем счетчик лайков на странице
        });
    } else {
      api.dislikeCard(item._id) // Удаляем лайк, отправляем данные на сервер
        .then(res => {
          card.updateLikeQty(res.likes.length); // обновляем счетчик лайков
        });
    }
  });
  return card.createCard();
}

// Экземпляр класса валидатора формы добавления карточки
const formAddCardValidator = new FormValidator(object, addCardFormElement);
formAddCardValidator.enableValidator();

// Экземпляр класса попапа добавления карточек
const addCardPopup = new PopupWithForm({
  popupSelector: addCardPopupSelector, handleFormSubmit: (formData) => {
    renderLoading(addCardSubmitBtn, true);
    api.addNewCard(formData) // Отправляем данные на сервер
      .then(res => {
        const card = createNewCard(res); // Создаем карточку
        cardList.addItem(card); // Добавляем карточку на страницу
      })
      .finally(() => {
        renderLoading(addCardSubmitBtn, false);
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

// Экземпляр класса попапа подтверждения удаления карточки
const deleteCardPopup = new PopupWithConfirmation(confirmDeletePopupSelector, (cardId) => {
  renderLoading(confirmDeleteSubmitBtn, true);
  api.deleteCard(cardId) // Отправляем запрос на сервер на удаление карточки
    .then(() => {
      document.getElementById(cardId).remove(); // После - удаляем ее из разметки страницы
    })
    .finally(() => {
      renderLoading(confirmDeleteSubmitBtn, false);
    })
  deleteCardPopup.close();
});
deleteCardPopup.setEventListeners();



