/*** Общий файл ***/

import {Card} from './Card.js'; // импорт модуля с классом карточек
import {FormValidator} from './FormValidator.js'; // импорт модуля с классом валидатора
import {closePopup, openPopup, viewImagePopup, closeViewImagePopupBtn}
  from './utils.js'; // импорт общих функций

/** Элементы (кнопки и блоки) **/

// Элементы для добавления карточек
// Блок с кнопками добавления карточек и редактирования профиля
const profile = document.querySelector('.profile');
// Кнопка добавления карточки
const addCardButton = profile.querySelector('.profile__add-button');
// Попап с формой карточки
const addCardPopup = document.querySelector('.popup_type_add-card-form');
// Форма добавления карточки
const addCardFormElement = addCardPopup
  .querySelector('.popup__form_type_add-card-form');
// Поле ввода названия карточки
const cardTitleInput = addCardFormElement
  .querySelector('.popup__form-item_type_card-description');
// Поле ввода ссылки на картинку карточки
const cardImageLinkInput = addCardFormElement
  .querySelector('.popup__form-item_type_image-link');
// Блок для вставки карточек
const cardElementContainer = document.querySelector('.elements');
// Селектор шаблона карточки
const cardTemplateSelector = '#element-template';

// Элементы для редактирования профиля пользователя
// Имя пользователя
const profileName = profile.querySelector('.profile__name');
// Описание пользователя
const profileDescription = profile.querySelector('.profile__description');
// Кнопка редактирования профиля
const editProfileButton = profile.querySelector('.profile__edit-button');
// Попап редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit-profile-form');
// Форма редактирования профиля
const editProfileFormElement = editProfilePopup.
querySelector('.popup__form_type_edit-profile-form');
// Поле ввода имени пользователя в форме
const nameInput = editProfileFormElement
  .querySelector('.popup__form-item_type_profile-name');
// Поле ввода описания пользователя
const jobInput = editProfileFormElement
  .querySelector('.popup__form-item_type_profile-description');

// Массив карточек для загрузки на странице
const initialCards = [
  {name: 'Архыз', link: 'images/element_photo_arhyz.jpg',},
  {name: 'Челябинская область', link: 'images/element_photo_chelyabinsk-oblast.jpg'},
  {name: 'Горный Алтай', link: 'images/element_photo_gorny-altay.jpg'},
  {name: 'Камчатка', link: 'images/element_photo_kamchatka.jpg'},
  {name: 'Карачаево-Черкессия', link: 'images/element_photo_karachaevsk.jpg'},
  {name: 'Байкал', link: 'images/element_photo_baikal_2.jpg'}];

// Объект с селекторами классами для валидации форм
const object = {formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-submit-button',
  inactiveButtonClass: 'popup__form-submit-button_inactive',
  inputErrorClass: 'popup__form-item_invalid',
  errorClass: 'popup__input-error_active',
  errorSelector: '.popup__input-error'};

/** Функциональность редактирования профиля пользователя **/

// Создаем экземпляр класса валидатора для формы
const editProfileValidator = new FormValidator(object, editProfileFormElement);
editProfileValidator.enableValidator();

/* Функция открытия попапа редактирования профиля и автоматической вставки
значений из профайла */
function renderEditProfilePopup() {
  // Очищаем поля от ошибок предыдущей валидации
  editProfileValidator.clearPreviousValidation();
  // Вставляем значения из профайла (Прим. на предыдущих ревью мне делали замечание,
  // что при каждой загрузке данной формы в поля должны подгружаться значения,
  // сохраненные в соответствующих полях файла разметки.
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
  // Проверяем состояние кнопки отправки формы (Прим. в данном случае
  // эта кнопка всегда будет активна при каждой загрузке формы, т.к.
  // загружаемые значения всегда валидны.
  editProfileValidator.toggleSubmitButtonState();
}

/* Функция сохранения и отправки данных редактирования профиля из формы
   (автоматически закрывает попап) */
function submitProfileForm (event) {
  event.preventDefault(); // прервать стандартное поведение браузера
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

/** Функциональность карточек с фото **/

// Создание валидатора формы добавления карточки
const formAddCardValidator = new FormValidator(object, addCardFormElement);
formAddCardValidator.enableValidator();

// Функция открытия попапа добавления фото по клику на кнопку добавления
function renderAddCardPopup() {
  // Очищаем поля от ошибок предыдущей валидации
  formAddCardValidator.clearPreviousValidation();
  openPopup(addCardPopup);
  // Проверяем состояние кнопки отправки формы
  formAddCardValidator.toggleSubmitButtonState();
}

/* Функция добавления карточки на страницу пользователем через форму
(автоматически закрывает попап) */
function uploadCardHandler(event) {
  event.preventDefault();
  const card = new Card(cardTitleInput.value, cardImageLinkInput.value, cardTemplateSelector)
  .renderCard();
  cardElementContainer.prepend(card);
  addCardFormElement.reset();
  closePopup(addCardPopup);
}

// Автоматическая загрузка карточек на страницу
function renderCards(array) {
  array.forEach((item) => {
    const card = new Card(item.name, item.link,cardTemplateSelector).renderCard();
    cardElementContainer.prepend(card);
  });
}

renderCards(initialCards); //Вызываем эту функцию при загрузке страницы

/** Функции отслеживания поведения пользователя **/

editProfileButton.addEventListener('click', renderEditProfilePopup);
editProfileFormElement.addEventListener('submit', submitProfileForm);
addCardButton.addEventListener('click', renderAddCardPopup);
addCardFormElement.addEventListener('submit', uploadCardHandler);
closeViewImagePopupBtn.addEventListener('click', ()=> {
  closePopup(viewImagePopup)}
);

