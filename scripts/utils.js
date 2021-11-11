/** Файл с общими функциями для попапов **/

// Элементы попапа просмотра фото карточки
// Попап просмотра фото карточки
export const viewImagePopup = document.querySelector('.popup_type_image-view');
// Кнопка закрытия попапа просмотра фото
export const closeViewImagePopupBtn = viewImagePopup
  .querySelector('.popup__close-button_type_image-view');
// Фото в попапе просмотра фото
export const viewImagePopupImg = viewImagePopup.querySelector('.popup__image');
// Подпись фото в попапе просмотра фото
export const viewImagePopupImgCaption = viewImagePopup
  .querySelector('.popup__image-caption');

// Функция открытия для всех попапов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closePopupByClickOnOverlay);
  window.addEventListener('keydown', closePopupByPressOnEsc);
}

// Функция закрытия для всех попапов
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupByClickOnOverlay);
  window.removeEventListener('keydown', closePopupByPressOnEsc);
}

// Функция закрытия попапа по нажатию на Esc
export function closePopupByPressOnEsc(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//Функция закрытия попапа по клику на оверлей
export function closePopupByClickOnOverlay(event) {
  if (event.target.classList.contains('popup') ||
    event.target.classList.contains('popup__close-button')
    || event.target.classList.contains('popup__container')) {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  }
}



