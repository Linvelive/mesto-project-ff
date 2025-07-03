// Показать ошибку
function showInputError(formElement, inputElement, config, message) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(config.errorClass);
}

// Скрыть ошибку
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// Проверка одного поля
function checkInputValidity(formElement, inputElement, config) {
  const value = inputElement.value.trim();

  if (inputElement.validity.valueMissing) {
    showInputError(formElement, inputElement, config, "Вы пропустили это поле");
    return false;
  }

  if (inputElement.type === "url" && !inputElement.validity.valid) {
    showInputError(formElement, inputElement, config, "Введите адрес сайта.");
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

  if (inputElement.hasAttribute("pattern")) {
    const pattern = new RegExp(inputElement.getAttribute("pattern"));
    if (!pattern.test(value)) {
      const customMessage = inputElement.dataset.errorPattern || "Поле заполнено некорректно";
      showInputError(formElement, inputElement, config, customMessage);
      return false;
    }
  }

  hideInputError(formElement, inputElement, config);
  return true;
}

// Проверка всех полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Включение/отключение кнопки
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Навесить обработчики
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Включить валидацию всех форм
export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Очистить ошибки и деактивировать кнопку
export function clearValidation(formElement, config) {
  const errorElements = formElement.querySelectorAll(`.${config.errorClass}`);
  const inputElements = formElement.querySelectorAll(config.inputSelector);
  const button = formElement.querySelector(config.submitButtonSelector);

  inputElements.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  });

  errorElements.forEach((errorEl) => {
    errorEl.textContent = "";
    errorEl.classList.remove(config.errorClass);
  });

  if (button) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  }
}