/** Элементы (кнопки и блоки) **/

// Выбираем блок профиля пользователя
const profile = document.querySelector('.profile');
// Выбираем элемент с именем пользователя
const profileName = profile.querySelector('.profile__name');
// Выбираем элемент с описанием пользователя
const profileDescription = profile.querySelector('.profile__description');
// Выбираем кнопку редактирования профиля
const editProfileButton = profile.querySelector('.profile__edit-button');
// Выбираем кнопку добавления карточки
const addCardButton = profile.querySelector('.profile__add-button');
// Выбираем блок со попапом редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit-profile-form');
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
//Выбираем попап просмотра фотографий
const viewImagePopup = document.querySelector('.popup_type_image-view');
// Выбираем кнопку закрытия попапа просмотра фотографий
const viewImagePopupClsBtn = viewImagePopup.querySelector('.popup__close-button_type_image-view');
// Выбираем окно для вставки фото в попапе просмотра фотографий
const viewImagePopupImg = viewImagePopup.querySelector('.popup__image');
//Выбираем подпись фото в попапе просмотра фотографий
const viewImagePopupImgCaption = viewImagePopup.querySelector('.popup__image-caption');
// Выбираем шаблон для клонирования карточки
const cardElementTemplate = document.querySelector('#element-template').content;
// Переменная для создаваемых карточек
let card;
// Массив карточек для загрузки на странице
const initialCards = [
  {name: 'Архыз', link:  'images/element_photo_arhyz.jpg',},
  {name: 'Челябинская область', link: 'images/element_photo_chelyabinsk-oblast.jpg'},
  {name: 'Горный Алтай', link: 'images/element_photo_gorny-altay.jpg'},
  {name: 'Камчатка', link: 'images/element_photo_kamchatka.jpg'},
  {name: 'Карачаево-Черкессия', link: 'images/element_photo_karachaevsk.jpg'},
  {name: 'Байкал', link: 'images/element_photo_baikal_2.jpg'}];

/** Функциональность редактирования профиля пользователя**/

/* Функция открытия попапа редактирования профиля и автоматической вставки
значений из профайла */
function renderEditProfilePopup() {
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция открытия для всех попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByClickOnOverlay);
  window.addEventListener('keydown', closePopupByPressOnEsc);
}
// Функция закрытия для всех попапов
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupByClickOnOverlay);
  window.removeEventListener('keydown', closePopupByPressOnEsc);
}

/* Функция сохранения и отправки данных редактирования профиля из формы
   (автоматически закрывает попап) */
function formSubmitHandler(event) {
  event.preventDefault(); // прервать стандартное поведение браузера
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

/** Функциональность редактирования карточек с фото **/

/* Функция создания карточки фото + (лайка, удаления  карточки, открытия попапа
   просмотра фото карточки (по клику) */
function createCardElement (cardName, cardImageLink) {
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardCaption = cardElement.querySelector('.element__caption');
  const cardDeleteBtn = cardElement.querySelector('.element__trash-button');
  const cardLikeBtn = cardElement.querySelector('.element__like-button');
  cardCaption.textContent = cardName;
  cardImage.src = cardImageLink;
  cardImage.alt = `Фото:${cardName}`;

  // Удаление карточки по клику на кпопку удаления
  cardDeleteBtn.addEventListener('click', () => cardElement.remove());

  // Лайк карточки по клику на кнопку лайка
  cardLikeBtn.addEventListener('click', (event) => {
    event.target.classList.toggle('element__like-button_active');
  });

  /* Открытие попапа просмотра фото, подгрузка изображения и подписи
     по клику на фото */
  function renderViewImagePopup() {
    openPopup(viewImagePopup);
    viewImagePopupImg.src = cardImage.src;
    viewImagePopupImg.alt = cardImage.alt;
    viewImagePopupImgCaption.textContent = cardCaption.textContent;
  }
  cardImage.addEventListener('click', renderViewImagePopup)

  // Закрытие попапа просмотра фото по клику на кнопку закрытия
  viewImagePopupClsBtn.addEventListener('click', () => closePopup(viewImagePopup));

  return cardElement; // Результат работы функции -  готовая карточка
}

// Функция добавления карточки на страницу
function addCardElement (card) {
  cardElementContainer.prepend(card);
}

/* Функция добавления карточки на страницу пользователем через форму
 (автоматически закрывает попап) */
function uploadCardHandler (event) {
  event.preventDefault(); // прервать стандартное поведение браузера
  card = createCardElement(cardDescriptionInput.value, cardImageLinkInput.value);
  addCardElement(card);
  // cardDescriptionInput.value = "";
  // cardImageLinkInput.value = "";
  addCardFormElement.reset();
  closePopup(addCardPopup);
}

/** Автоматическая загрузка карточек при открытии страницы **/

function renderCards (array) {
  array.forEach((item) => {
    card = createCardElement(item.name,item.link);
    addCardElement(card);
  });
}
renderCards(initialCards); //Вызываем эту функцию при загрузке страницы


/** Функции отслеживания поведения пользователя **/

//Функция закрытия попапа по клику на оверлей
function closePopupByClickOnOverlay(event) {
  if (event.target.classList.contains('popup') ||
    event.target.classList.contains('popup__close-button')
    || event.target.classList.contains('popup__container')) {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  }
}

// Функция закрытия попапа по нажатию на Esc
function closePopupByPressOnEsc(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

editProfileButton.addEventListener('click', renderEditProfilePopup);
editProfileFormElement.addEventListener('submit', formSubmitHandler);
addCardButton.addEventListener('click', () => openPopup(addCardPopup));
addCardFormElement.addEventListener('submit', uploadCardHandler);


