// Выбираем блок профиля пользователя
let profile = document.querySelector('.profile');
// Выбираем элемент с именем пользователя
let profileName = profile.querySelector('.profile__name');
// Выбираем элемент с описанием пользователя
let profileDescription = profile.querySelector('.profile__description');
//  Выбираем кнопку редактирования профиля
let editButton = profile.querySelector('.profile__edit-button');
// Выбираем блок со попапом редактирования профиля
let popup = document.querySelector('.popup');
// Выбираем кнопку закрытия попапа редактирования профиля
let popupCloseButton = popup.querySelector('.popup__close-button');
// Выбираем форму редактирования профиля
let formElement = popup.querySelector('.popup__form');
// Выбираем поле с именем пользователя
let nameInput = formElement.querySelector('.popup__form-item_type_name');
// Выбираем поле с описанием пользователя
let jobInput = formElement.querySelector('.popup__form-item_type_description');

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

// Функции отслеживания поведения пользователя
editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
