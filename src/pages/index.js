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
  userAvatarSelector,
  userName,
  confirmDeletePopupSelector,
  cardElementContainerSelector,
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

// Экземпляр класса для управления данными пользователя
const userInfo = new UserInfo(userNameSelector, userDescriptionSelector, userAvatarSelector);

// Экземпляр попапа редактирования профиля пользователя
const editProfilePopup = new PopupWithForm({
  popupSelector: editProfilePopupSelector, handleFormSubmit: (formData) => {
    api.editProfile(formData) // Отправляем на сервер обновленные данные
      .then((res)=>{
        userInfo.setUserInfo(res); // Подгружаем данные на страницу
        editProfilePopup.close();
      })
      .catch(err=>{
        alert(err);
      })
      .finally( ()=> {
          editProfilePopup.renderLoading(false);
        }
      );
  }
});

// Экземпляр попапа редактирования аватара пользователя
const updateUserAvatarPopup = new PopupWithForm({popupSelector: updateUserAvatarPopupSelector,
  handleFormSubmit:(formData)=>{
    api.updateUserAvatar(formData.link)// Отправляем обновленные данные на сервер
      .then((res)=>{
        userInfo.setUserInfo(res);
        updateUserAvatarPopup.close();
      })
      .catch(err=>{
        alert(err);
      })
      .finally(()=>{
        updateUserAvatarPopup.renderLoading(false);
      });
  }});

// Экземпляр класса попапа просмотра фото карточки
const viewCardImagePopup = new PopupWithImage(viewImagePopupSelector);

// Экземпляр класса попапа подтверждения удаления карточки
const deleteCardPopup = new PopupWithConfirmation(confirmDeletePopupSelector, (cardId) => {
  api.deleteCard(cardId) // Отправляем запрос на сервер на удаление карточки
    .then(() => {
      document.getElementById(cardId).remove(); // После - удаляем ее из разметки страницы
      deleteCardPopup.close();
    })
    .catch(err=>{
      alert(err);
    })
    .finally(() => {
      deleteCardPopup.renderLoading(false);
    })
});

// Экземпляр класса валидатора формы редактирования профиля пользователя
const editProfileValidator = new FormValidator(object, editProfileFormElement);

// Экземпляр класса валидатора формы обновления аватара пользователя
const updateUserAvatarFormValidator = new FormValidator(object, updateUserAvatarFormElement);

// Экземпляр класса валидатора формы добавления карточки
const formAddCardValidator = new FormValidator(object, addCardFormElement);


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
            card.updateLikeQty(res.likes.length);// и обновляем счетчик лайков на странице
          })
          .catch(err=>{
            alert(err);
          });
      } else {
        api.dislikeCard(item._id) // Удаляем лайк, отправляем данные на сервер
          .then(res => {
            card.updateLikeQty(res.likes.length); // обновляем счетчик лайков
          })
          .catch(err=>{
            alert(err);
          });
      }
    });
  return card.createCard();
}

// Подгружаем данные о пользователе и карточки с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    const userData = res[0];
    const cardsData = res[1];
    userInfo.setUserInfo(userData); // Устанавливаем данные пользователя

    // Экземпляр класса для для добавления карточек на страницу
    const cardList = new Section(cardsData, (data)=>{
      cardList.addItem(createNewCard(data));
    }, cardElementContainerSelector);
    cardList.renderItems();

    // Экземпляр класса попапа добавления карточек
    const addCardPopup = new PopupWithForm({
      popupSelector: addCardPopupSelector, handleFormSubmit: (formData) => {
        api.addNewCard(formData) // Отправляем данные на сервер
          .then(res => {
            const card = createNewCard(res); // Создаем карточку
            cardList.addItem(card); // Добавляем карточку на страницу
            addCardPopup.close();
          })
          .catch(err=>{
            alert(err);
          })
          .finally(() => {
            addCardPopup.renderLoading(false);
          });
      },
    });

    // Устанавливаем слушатели на попапы
    editProfilePopup.setEventListeners();
    updateUserAvatarPopup.setEventListeners();
    addCardPopup.setEventListeners();
    viewCardImagePopup.setEventListeners();
    deleteCardPopup.setEventListeners();

    //Активируем валидацию форм
    editProfileValidator.enableValidator();
    updateUserAvatarFormValidator.enableValidator();
    formAddCardValidator.enableValidator();

    // Слушатель клика кнопки редактирования профиля пользователя
    editProfileButton.addEventListener('click', () => {
      const defaultUserInfo = userInfo.getUserInfo();
      userNameInput.value = defaultUserInfo.name;
      userDescriptionInput.value = defaultUserInfo.about;
      editProfileValidator.resetValidation();
      editProfilePopup.open();
    });

    // Слушатель клика кнопки редактирования аватара пользователя
    updateUserAvatarButton.addEventListener('click', ()=>{
      updateUserAvatarFormValidator.resetValidation();
      updateUserAvatarPopup.open();
    });

    // Слушатель клика кнопки добавления карточек
    addCardButton.addEventListener('click', () => {
      formAddCardValidator.resetValidation();
      addCardPopup.open();
    });
    })
  .catch(err=>{
    alert(err);
  });







