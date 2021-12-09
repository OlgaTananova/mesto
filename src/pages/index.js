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
} from '../scripts/utils/constants.js';
import './index.css';

//Экземпляр класса Api для сетевых запросов
const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '65021073-788a-4fae-b274-a844bf3e53d6',
    'Content-Type': 'application/json'
  }});

/** Функциональность редактирования профиля пользователя **/

// Функция изменения состояния кнопки submit при загрузке данных на сервер
function renderLoading(button,isLoading){
  if (isLoading) {
    button.value = button.textContent;
    button.textContent = 'Сохранить...'
  } else {
    button.textContent = button.value;
  }
}

// Подгружаем данные о пользователе с сервера
api.getUserInfo()
  .then(result =>{
  userAvatar.src = result.avatar;
  userName.textContent = result.name;
  userDescription.textContent = result.about;
});

// Экземпляр класса для управления данными пользователя
const userInfo = new UserInfo(userNameSelector, userDescriptionSelector);

// Экземпляр класса валидатора для формы профиля пользователя
const editProfileValidator = new FormValidator(object, editProfileFormElement);
editProfileValidator.enableValidator();

// Экземпляр попапа редактирования профиля пользователя
const editProfilePopup = new PopupWithForm({
  popupSelector: editProfilePopupSelector, handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData); // Подгружаем данные на страницу
    renderLoading(editProfileSubmitBtn, true);
    api.editProfile(formData) // Отправляем на сервер обновленные данные
      .finally( ()=> {
          renderLoading(editProfileSubmitBtn, false)
        }
      )
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
  renderLoading(updateAvatarSubmitBtn, true);
  api.updateUserAvatar(formData.link) // Отправляем обновленные данные на сервер
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
    item.likes.length,
    item.owner._id,
    item._id,
    cardTemplateSelector,
    () => {
    viewCardImagePopup.open(item) // Открываем попап с картинкой
  },
    ()=>{
    deleteCardPopup.open(item._id); // Открываем попап подтверждения удаления карточки
  }, (isLike)=> { // Обрабатываем клик лайка карточки
      if (isLike) {
        api.likeCard(item._id) // Лайкаем карточку, отправляем данные на сервер
          .then(res => {
            card.updateLikeQty(res.likes.length); // и обновляем счетчик лайков на странице
          })
      } else {
        api.dislikeCard(item._id) // Удаляем лайк, отправляем данные на сервер
          .then(res => {
            card.updateLikeQty(res.likes.length) // обновляем счетчик лайков
          })
      }
    });
  api.getUserInfo() // Подгружаем данные о пользователе с сервера
    .then(data => { // Если у карточки есть id пользователя в списке лайков, то активируем кнопку лайка
      item.likes.forEach(item=>{
        if (item.id === data.id){
          card.like();
        }
      })
      card.removeDeleteBtn(data._id); // Если пользователь - не автор карточки, то убираем кнопку удаления
    });
  return card.createCard();
}

// Экземпляр класса для отрисовки карточек на странице
const cardList = new Section(cardElementContainerSelector);

// Подгружаем карточки с сервера
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
    renderLoading(addCardSubmitBtn, true);
    api.addNewCard(formData) // Отправляем карточку на сервер
      .then(res=>{
        const card = createNewCard(res);
        cardList.addItem(card);
      })
      .finally(()=>{
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
const deleteCardPopup = new PopupWithConfirmation(confirmDeletePopupSelector, (cardId)=>{
  api.deleteCard(cardId) // Отправляем запрос на сервер на удаление карточки
    .then(res =>{
      document.getElementById(cardId).remove(); // После - удаляем ее из разметки страницы
  });
  deleteCardPopup.close();
});
deleteCardPopup.setEventListeners();



