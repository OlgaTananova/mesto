/*** Main file ***/

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
  object,
  editProfilePopupSelector,
  userNameSelector,
  userDescriptionSelector,
  userNameInput,
  userDescriptionInput,
  editProfileButton,
  viewImagePopupSelector,
  updateUserAvatarPopupSelector,
  updateUserAvatarButton,
  userAvatarSelector,
  confirmDeletePopupSelector,
  cardElementContainerSelector,
} from '../scripts/utils/constants.js';
import './index.css';

// Api class instance to fetch data
const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '65021073-788a-4fae-b274-a844bf3e53d6',
    'Content-Type': 'application/json'
  }
});

// UserInfo instance class
const userInfo = new UserInfo(userNameSelector, userDescriptionSelector, userAvatarSelector);

// Edit User's Profile instance class
const editProfilePopup = new PopupWithForm({
  popupSelector: editProfilePopupSelector, handleFormSubmit: (formData) => {
    api.editProfile(formData)
      .then((res)=>{
        userInfo.setUserInfo(res);
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

// Class instance to edit user's avatar
const updateUserAvatarPopup = new PopupWithForm({popupSelector: updateUserAvatarPopupSelector,
  handleFormSubmit:(formData)=>{
    api.updateUserAvatar(formData.link)
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

// Image Popup class instance
const viewCardImagePopup = new PopupWithImage(viewImagePopupSelector);

// Confirmation Popup class instance to delete the card
const deleteCardPopup = new PopupWithConfirmation(confirmDeletePopupSelector, (cardId) => {
  api.deleteCard(cardId)
    .then(() => {
      document.getElementById(cardId).remove();
      deleteCardPopup.close();
    })
    .catch(err=>{
      alert(err);
    })
    .finally(() => {
      deleteCardPopup.renderLoading(false);
    })
});

// Create Card function
const createNewCard = (item) => {
  const card = new Card(item.name,
    item.link,
    item.likes,
    item.owner._id,
    item._id,
    cardTemplateSelector,
    userInfo.getId(),
    () => {
      viewCardImagePopup.open(item)
    }, () => {
      deleteCardPopup.open(item._id);
    }, (isLike) => {
      if (isLike) {
        api.likeCard(item._id)
          .then(res => {
            card.updateLikeQty(res.likes.length);
          })
          .catch(err=>{
            alert(err);
          });
      } else {
        api.dislikeCard(item._id)
          .then(res => {
            card.updateLikeQty(res.likes.length);
          })
          .catch(err=>{
            alert(err);
          });
      }
    });
  return card.createCard();
}

// Fetch data about  the user and his cards from the server
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    const userData = res[0];
    const cardsData = res[1];
    userInfo.setUserInfo(userData);

    // Add Cards class instance
    const cardList = new Section(cardsData, (data)=>{
      cardList.addItem(createNewCard(data));
    }, cardElementContainerSelector);
    cardList.renderItems();

    // Add Cards Popup class instance
    const addCardPopup = new PopupWithForm({
      popupSelector: addCardPopupSelector, handleFormSubmit: (formData) => {
        api.addNewCard(formData)
          .then(res => {
            const card = createNewCard(res);
            cardList.addItem(card);
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

    //setting event listeners on the popups
    editProfilePopup.setEventListeners();
    updateUserAvatarPopup.setEventListeners();
    addCardPopup.setEventListeners();
    viewCardImagePopup.setEventListeners();
    deleteCardPopup.setEventListeners();

    // Form validation

    const formValidators = {};
    const enableValidation = (config) => {
      const formList = Array.from(document.querySelectorAll(config.formSelector));
      formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        formValidators[formElement.id] = validator;
        validator.enableValidator();
      });
    }
    enableValidation(object);


    // Various buttons' event listeners
    editProfileButton.addEventListener('click', () => {
      const defaultUserInfo = userInfo.getUserInfo();
      userNameInput.value = defaultUserInfo.name;
      userDescriptionInput.value = defaultUserInfo.about;
      formValidators['edit-profile-form'].resetValidation();
      editProfilePopup.open();
    });

    updateUserAvatarButton.addEventListener('click', ()=>{
      formValidators['update-avatar-form'].resetValidation();
      updateUserAvatarPopup.open();
    });


    addCardButton.addEventListener('click', () => {
      formValidators['add-card-form'].resetValidation();
      addCardPopup.open();
    });
    })
  .catch(err=>{
    alert(err);
  });







