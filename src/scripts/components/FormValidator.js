/** Класс FormValidator для валидации форм **/

export default class FormValidator {
  constructor({
                inputSelector,
                submitButtonSelector,
                inactiveButtonClass,
                inputErrorClass,
                errorClass,
              }, formElement) {
    this._formElement = formElement;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
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

  toggleSubmitButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  _setEventListenersToAllInputFields() {
    this._inputList.forEach((inputField) => {
      inputField.addEventListener('input', () => {
        this._isValid(inputField);
        this.toggleSubmitButtonState(this._inputList, this._submitButton);
      });
    });
  }

  enableValidator() {
    this._setEventListenersToAllInputFields();
  }

  clearPreviousValidation() {
    this._inputList.forEach((inputField) => {
      inputField.value = '';
      inputField.classList.remove('popup__form-item_invalid');
      inputField.nextElementSibling.textContent = '';
    });
  }
}
