/** Валидация форм **/

export class FormValidator {
  constructor({
                formSelector,
                inputSelector,
                submitButtonSelector,
                submitButtonInactiveClass,
                inactiveButtonClass,
                inputErrorClass,
                errorClass,
              } = obj, formElement) {
    this._formElement = formElement;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  _showInputError(inputField, errorMessage) {
    const errorField = this._formElement.querySelector(`.${inputField.id}-error`);
    inputField.classList.add(this._inputErrorClass);
    errorField.textContent = errorMessage;
    errorField.classList.add(this._errorClass);
  }

  _hideInputError(inputField) {
    const errorField = this._formElement.querySelector(`.${inputField.id}-error`);
    inputField.classList.remove(this._inputErrorClass);
    errorField.classList.remove(this._errorClass);
    errorField.textContent = '';
  }

  _isValid(inputField) {
    if (!inputField.validity.valid) {
      this._showInputError(inputField, inputField.validationMessage);
    } else {
      this._hideInputError(inputField);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputField) => {
      if (!inputField.validity.valid) {
        return true;
      }
      return false;
    });
  }

  _toggleSubmitButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    }
  }

  _setEventListenersToAllInputFields() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleSubmitButtonState(inputList, submitButton);
    inputList.forEach((inputField) => {
      inputField.addEventListener('input', () => {
        this._isValid(inputField);
        this._toggleSubmitButtonState(inputList, submitButton);
      });
    });
  }

  enableValidator() {
    this._setEventListenersToAllInputFields();
  }
}
