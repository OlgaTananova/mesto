/** Элементы (кнопки и блоки) **/
// Выбираем блок профиля пользователя
const profile = document.querySelector('.profile');
// Выбираем элемент с именем пользователя
const profileName = profile.querySelector('.profile__name');
// Выбираем элемент с описанием пользователя
const profileDescription = profile.querySelector('.profile__description');
//  Выбираем кнопку редактирования профиля
const editProfileButton = profile.querySelector('.profile__edit-button');
//Выбираем кнопку добавления карточки
const addCardButton = profile.querySelector('.profile__add-button');
// Выбираем блок со попапом редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit-profile-form');
// Выбираем кнопку закрытия попапа редактирования профиля
const popupEditProfileClsBtn = editProfilePopup.querySelector('.popup__close-button_type_edit-profile-form');
// Выбираем форму редактирования профиля
const editProfileFormElement = editProfilePopup.querySelector('.popup__form_type_edit-profile-form');
// Выбираем поле с именем пользователя
const nameInput = editProfileFormElement.querySelector('.popup__form-item_type_profile-name');
// Выбираем поле с описанием пользователя
const jobInput = editProfileFormElement.querySelector('.popup__form-item_type_profile-description');
// Выбираем блок вставки карточек
const cardElementContainer = document.querySelector('.elements');
// Выбираем попап добавления карточек
const addCardPopup = document.querySelector('.popup_type_add-card-form');
//Выбираем форму добавления карточки
const addCardFormElement = addCardPopup.querySelector('.popup__form_type_add-card-form');
// Выбираем поле ввода названия в попапе добавления карточек
const cardDescriptionInput = addCardFormElement.querySelector('.popup__form-item_type_card-description');
//Выбираем поле ввода для ввода ссылки на изображение карточки в попапе добавления карточек
const cardImageLinkInput = addCardFormElement.querySelector('.popup__form-item_type_image-link');
// Выбираем кнопку закрытия попапа добавления карточек
const addCardPopupClsBtn = addCardPopup.querySelector('.popup__close-button_type_add-card-form');
let cardName;
let cardImageLink;
// Массив карточек для загрузке на странице
const initialCards = [
  {name: 'Архыз', link:  '../images/element_photo_arhyz.jpg',},
  {name: 'Челябинская область', link: '../images/element_photo_chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: '../images/element_photo_ivanovo.jpg'},
  {name: 'Камчатка', link: '../images/element_photo_kamchatka.jpg'},
  {name: 'Холмогорский район', link: '../images/element_photo_kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: '../images/element_photo_baikal_2.jpg'}];

/* Функция открытия попапа редактирования профиля (автоматически вставляются
значения из профайла */
function openEditProfilePopup() {
  editProfilePopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

/*Функция открытия попапа добавления карточки с фото */
function toggleAddCardPopup() {
  addCardPopup.classList.toggle('popup_opened');
}

// Функция закрытия попапа редактирования профиля
function closeEditProfilePopup() {
  editProfilePopup.classList.remove('popup_opened');
}

/* Функция сохранения и отправки данных редактирования профиля из формы (автоматически
закрывает попап) */
function formSubmitHandler(event) {
  event.preventDefault(); // прервать стандартное поведение браузера
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeEditProfilePopup();
}

/* Функция создания карточки, лайка и удаления  */
function addCardElement (cardName, cardImageLink) {
  const cardElementTemplate = document.querySelector('#element-template').content;
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__caption').textContent = cardName;
  cardElement.querySelector('.element__image').src = cardImageLink;
  cardElement.querySelector('.element__image').alt = `Фото:${cardName}`;
  cardElementContainer.prepend(cardElement);
  cardElement.querySelector('.element__trash-button').addEventListener('click', function (){
    cardElement.remove();
  });
  cardElement.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active');
  });
}

/* Функция автоматической подгрузки карточек при открытии страницы */
function loadInitialCards (array) {
  array.forEach((item, index) => {
    cardName = array[index].name;
    cardImageLink = array[index].link;
    addCardElement(cardName,cardImageLink);
  });
}

/*Функция добавления карточки на страницу пользователем */
function uploadCardHandler (event) {
  event.preventDefault(); // прервать стандартное поведение браузера
  addCardElement(cardDescriptionInput.value, cardImageLinkInput.value);
  toggleAddCardPopup()
}

loadInitialCards(initialCards);

// Функции отслеживания поведения пользователя
editProfileButton.addEventListener('click', openEditProfilePopup);
popupEditProfileClsBtn.addEventListener('click', closeEditProfilePopup);
editProfileFormElement.addEventListener('submit', formSubmitHandler);
addCardButton.addEventListener('click',toggleAddCardPopup);
addCardPopupClsBtn.addEventListener('click', toggleAddCardPopup);
addCardFormElement.addEventListener('submit', uploadCardHandler);

