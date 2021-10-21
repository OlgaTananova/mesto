/** Валидация форм **/

function enableValidation(obj) {

//Функция показа поля с ошибкой
  function showInputError(form, inputField, errorMessage) {
    const errorField = form.querySelector(`.${inputField.id}-error`);
    inputField.classList.add(obj.inputErrorClass);
    errorField.textContent = errorMessage;
    errorField.classList.add(obj.errorClass);
  }

// Функция скрытия поля с ошибкой
  function hideInputError(form, inputField) {
    const errorField = form.querySelector(`.${inputField.id}-error`);
    inputField.classList.remove(obj.inputErrorClass);
    errorField.classList.remove(obj.errorClass);
    errorField.textContent = '';
  }

//Функция проверки валидности поля ввода
  function isValid(form, inputField) {
    if (!inputField.validity.valid) {
      showInputError(form, inputField, inputField.validationMessage);
    } else {
      hideInputError(form, inputField);
    }
  }

// Функция добавления слушателей для полей ввода формы
  function addEventListenersToAllInputFields(form) {
    const inputList = Array.from(form.querySelectorAll(obj.inputSelector));
    const submitButton = form.querySelector(obj.submitButtonSelector);
    toggleSubmitButtonState(inputList, submitButton);
    inputList.forEach((inputField) => {
      inputField.addEventListener('input', () => {
        isValid(form, inputField);
        toggleSubmitButtonState(inputList, submitButton);
      });
    });
  }

// Функция проверки валидности всех полей формы
  function hasInvalidInput(inputList) {
    return inputList.some((inputField) => {
      if (!inputField.validity.valid) {
        return true;
      }
      return false;
    });
  }

// Функция активации кпопки отправки формы
  function toggleSubmitButtonState(inputList, submitButton) {
    if (hasInvalidInput(inputList)) {
      submitButton.classList.add(obj.inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    } else {
      submitButton.classList.remove(obj.inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    }
  }

  // Включаем валидацию для всех форм в документе
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((form) => {
    addEventListenersToAllInputFields(form);
  });
}

