/** Элементы (кнопки и блоки) **/
// Выбираем блок профиля пользователя
const profile = document.querySelector('.profile');
// Выбираем элемент с именем пользователя
const profileName = profile.querySelector('.profile__name');
// Выбираем элемент с описанием пользователя
const profileDescription = profile.querySelector('.profile__description');
//  Выбираем кнопку редактирования профиля
const editButton = profile.querySelector('.profile__edit-button');
// Выбираем блок со попапом редактирования профиля
const popup = document.querySelector('.popup');
// Выбираем кнопку закрытия попапа редактирования профиля
const popupCloseButton = popup.querySelector('.popup__close-button');
// Выбираем форму редактирования профиля
const formElement = popup.querySelector('.popup__form');
// Выбираем поле с именем пользователя
const nameInput = formElement.querySelector('.popup__form-item_type_name');
// Выбираем поле с описанием пользователя
const jobInput = formElement.querySelector('.popup__form-item_type_description');
// Выбираем блок вставки карточек
const cardElementContainer = document.querySelector('.elements');
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
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция закрытия попапа редактирования профиля
function closePopup() {
  popup.classList.remove('popup_opened');
}

/* Функция сохранения и отправки данных редактирования профиля из формы (автоматически
закрывает попап) */
function formSubmitHandler(evt) {
  evt.preventDefault(); // прервать стандартное поведение браузера
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup()
}

/* Функция автоматической подгрузки карточек при открытии страницы */
function loadInitialCards (array) {
  array.forEach((item, index) => {
    let cardName = array[index].name;
    let cardImageLink = array[index].link;
    addCardElement(cardName,cardImageLink);
  });
}
loadInitialCards(initialCards);

/* Функция создания карточки */
function addCardElement (cardName, cardImageLink) {
  const cardElementTemplate = document.querySelector('#element-template').content;
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__caption').textContent = cardName;
  cardElement.querySelector('.element__image').src = cardImageLink;
  cardElementContainer.append(cardElement);
}

// Функции отслеживания поведения пользователя
editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
