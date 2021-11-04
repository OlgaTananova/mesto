
// Функция открытия для всех попапов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByClickOnOverlay);
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
    const formElement = popup.querySelector('.popup__form');
    closePopup(popup);
    if (formElement) {
      clearPreviousValidation(formElement)
    }
  }
}
//Функция закрытия попапа по клику на оверлей
export function closePopupByClickOnOverlay(event) {
  const popup = event.target.closest('.popup');
  const formElement = popup.querySelector('.popup__form');
  if (event.target.classList.contains('popup') ||
    event.target.classList.contains('popup__close-button')
    || event.target.classList.contains('popup__container')) {
    const popup = event.target.closest('.popup');
    closePopup(popup);
    if (formElement) {
      clearPreviousValidation(formElement)
    }
  }
}
// Функция очистки полей формы от ошибок валидации при закрытии формы без submit
export function clearPreviousValidation(formElement) {
  const inputList = formElement.querySelectorAll('.popup__form-item');
  [...inputList].forEach((input) => {
    input.value = '';
    input.classList.remove('popup__form-item_invalid');
    input.nextElementSibling.textContent = '';
  });
}


