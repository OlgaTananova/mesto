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
//Выбираем попап просмотра фотографий
const viewImagePopup = document.querySelector('.popup_type_image-view');
// Выбираем кнопку закрытия попапа просмотра фотографий
const viewImagePopupClsBtn = viewImagePopup.querySelector('.popup__close-button_type_image-view');
// Выбираем окно для вставки фото в попапе просмотра фотографий
const viewImagePopupImg = viewImagePopup.querySelector('.popup__image');
//Выбираем подпись фото в попапе просмотра фотографий
const viewImagePopupImgCptn = viewImagePopup.querySelector('.popup__image-caption');
let cardName; //Переменная, куда записываем название карточки, введенное пользователем
let cardImageLink; // Переменная, куда записываем ссылку на картинку, введенную пользователем
// Массив карточек для загрузке на странице
let initialCards = [
  {name: 'Архыз', link:  'images/element_photo_arhyz.jpg',},
  {name: 'Челябинская область', link: 'images/element_photo_chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: 'images/element_photo_ivanovo.jpg'},
  {name: 'Камчатка', link: 'images/element_photo_kamchatka.jpg'},
  {name: 'Холмогорский район', link: 'images/element_photo_kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: 'images/element_photo_baikal_2.jpg'}];

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

/* Функция создания карточки, лайка, удаления  карточки, открытия попапа просмотра фото (по клику) */
function addCardElement (cardName, cardImageLink) {
  const cardElementTemplate = document.querySelector('#element-template').content;
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardCaption = cardElement.querySelector('.element__caption');
  const cardDeleteBtn = cardElement.querySelector('.element__trash-button');
  const cardLikeBtn = cardElement.querySelector('.element__like-button');
  cardCaption.textContent = cardName;
  cardImage.src = cardImageLink;
  cardImage.alt = `Фото:${cardName}`;
  cardElementContainer.prepend(cardElement);
  cardDeleteBtn.addEventListener('click', function () {
    cardElement.remove()
  });
  cardLikeBtn.addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active');
  });
  cardImage.addEventListener('click', function () {
    viewImagePopup.classList.add('popup_opened');
    viewImagePopupImg.src = cardImage.src;
    viewImagePopupImg.alt = cardImage.alt;
    viewImagePopupImgCptn.textContent = cardCaption.textContent;
  });
  viewImagePopupClsBtn.addEventListener('click', function () {
    viewImagePopup.classList.remove('popup_opened');
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
  cardDescriptionInput.value = "";
  cardImageLinkInput.value = "";
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
