// Show error
function showInputError(formElement, inputElement, config, message) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(config.errorClass);
}

// Hiding error
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// Checking validation
function checkInputValidity(formElement, inputElement, config) {
  const value = inputElement.value.trim();
  const pattern = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;

  if (inputElement.validity.valueMissing) {
    showInputError(formElement, inputElement, config, "Вы пропустили это поле");
    return false;
  }

  if (inputElement.type === "url" && !inputElement.validity.valid) {
  showInputError(
    formElement,
    inputElement,
    config,
    'Введите адрес сайта.'
  );
  return false;
}

  if (value.length < inputElement.minLength) {
    showInputError(
      formElement,
      inputElement,
      config,
      `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${value.length} символ.`
    );
    return false;
  }

 // Pattern 
if (inputElement.hasAttribute("pattern") && !pattern.test(value)) {
  showInputError(formElement, inputElement, config, 'Можно использовать только буквы, пробел и дефис');
  return false;
}

  hideInputError(formElement, inputElement, config);
  return true;
}

// Checking validity all inputs
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Button inactivation 
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Навешиваем обработчики на инпуты формы
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Запускаем валидацию для всех форм
export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Очистка ошибок при открытии модального окна
export function clearValidationErrors(formElement) {
  const errorElements = formElement.querySelectorAll(".popup__error");
  const inputElements = formElement.querySelectorAll(".popup__input");

  inputElements.forEach((input) =>
    input.classList.remove("popup__input_type_error")
  );
  errorElements.forEach((error) => {
    error.textContent = "";
    error.classList.remove("popup__error_visible");
  });

  const button = formElement.querySelector(".popup__button");
  button.disabled = false;
  button.classList.remove("popup__button_disabled");
}
