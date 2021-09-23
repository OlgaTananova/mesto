let editButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-item_type_name');
let jobInput = formElement.querySelector('.popup__form-item_type_description');

function openPopup () {
  popup.classList.add('popup_opened');
}
function closePopup () {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
