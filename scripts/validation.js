

//Функция показа поля с ошибкой
function showInputError (form, inputField, errorMessage) {
  const errorField = form.querySelector(`.${inputField.id}-error`);
  inputField.classList.add('popup__form-item_invalid');
  errorField.textContent = errorMessage;
  errorField.classList.add('popup__input-error_active');
}

// Функция скрытия поля с ошибкой
function hideInputError (form, inputField) {
  const errorField = form.querySelector(`.${inputField.id}-error`);
  inputField.classList.remove('popup__form-item_invalid');
  errorField.classList.remove('popup__input-error_active');
  errorField.textContent = '';
}

//Функция проверки валидности поля ввода
function isValid (form, inputField) {
  if (!inputField.validity.valid) {
    showInputError(form, inputField, inputField.validationMessage);
  } else {
    hideInputError(form, inputField);
  }
}
// Функция добавления слушателей полей ввода формы
function addEventListenersToAllInputFields (form) {
  const inputList = Array.from(form.querySelectorAll('.popup__form-item'));
  const submitButton = form.querySelector('.popup__form-submit-button');
  toggleSubmitButtonState(inputList, submitButton);
  inputList.forEach((inputField) => {
    inputField.addEventListener('input', () => {
      isValid(form,inputField);
      toggleSubmitButtonState(inputList,submitButton);
    });
  });
}
// Функция проверки валидности всех полей кнопки
function hasInvalidInput (inputList) {
  return inputList.some((inputField) => {
    if (!inputField.validity.valid) {
      return true;
    }
    return false;
  });
}

// Функция активации кпопки отправки формы
function toggleSubmitButtonState (inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add('popup__form-submit-button_inactive');
  } else {submitButton.classList.remove('popup__form-submit-button_inactive')}
}

// Функция добавления слушателей всем формам
function enableValidationOnAllForms () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    addEventListenersToAllInputFields(form);
  });
}

enableValidationOnAllForms();
