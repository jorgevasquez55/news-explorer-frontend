// La clase FormValidator es responsable de validar el formulario.
export default class FormValidator {
  constructor({
    formElement,
    inputSelector,
    handleFormErrorState,
    handleFormButtonState,
  }) {
    this._inputSelector = inputSelector;
    this._formElement = formElement;
    this._handleFormErrorState = handleFormErrorState;
    this._handleFormButtonState = handleFormButtonState;
  }

  // Pasa los datos de la validación para cambiar el estado y mostrar el mensaje de error.
  _showInputError = (inputName, errorMessage) => {
    const inputValidityInfo = {
      name: inputName,
      errorMessage: errorMessage,
    };
    this._handleFormErrorState(inputValidityInfo);
  };

  // Pasa los datos de la validación para cambiar el estado y ocultar el mensaje de error.
  _hideInputError = (inputName) => {
    const inputValidityInfo = {
      name: inputName,
      errorMessage: "",
    };
    this._handleFormErrorState(inputValidityInfo);
  };

  // Pasa el resultado de la validación para cambiar el estado del botón.
  _toggleButtonState = (hasInvalidInput) => {
    this._handleFormButtonState(hasInvalidInput);
  };

  _isPasswordValid = (inputElement) => {
    const value = inputElement.value;
    const checkInput = [
      { regex: /[A-Z]/, message: "1 letra mayúscula" },
      { regex: /[a-z]/, message: "1 letra minúscula" },
      { regex: /[0-9]/, message: "1 número" },
      {
        regex: /[!@#$%^&*()\-_=+[\]{};:,.<>?]/,
        message: "1 carácter especial",
      },
      { regex: /.{8,}/, message: "mínimo 8 caracteres" },
    ];

    const errors = checkInput
      .filter(({ regex }) => !regex.test(value))
      .map(({ message }) => message);

    const message = `Debe contener ${errors.join(", ")}.`;
    return { isValid: errors.length === 0, message };
  };

  // Valida los inputs de los formularios y devuelve verdadero o falso.
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      const isSignup = inputElement.form.name === "signup";
      if (inputElement.value && inputElement.type === "password" && isSignup) {
        const validation = this._isPasswordValid(inputElement);
        return !validation.isValid;
      }
      return !inputElement.validity.valid;
    });
  };

  // Valida el input de la contraseña para mostrar u ocultar el mensaje de error.
  _validatePasswordInput = (inputElement) => {
    const validation = this._isPasswordValid(inputElement);
    if (!validation.isValid) {
      this._showInputError(inputElement.id, validation.message);
    } else {
      this._hideInputError(inputElement.id);
    }
  };

  _validateStandardInput = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement.id, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement.id);
    }
  };

  // Valida los inputs para mostrar u ocultar el mensaje de error.
  validateInput = (inputElement) => {
    const isSignup = inputElement.form.name === "signup";
    if (inputElement.value && inputElement.type === "password" && isSignup) {
      this._validatePasswordInput(inputElement);
    } else {
      this._validateStandardInput(inputElement);
    }
  };

  // Valida el formulario.
  validateForm = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const hasInvalidInput = this._hasInvalidInput(inputList);
    this._toggleButtonState(hasInvalidInput);
  };
}
