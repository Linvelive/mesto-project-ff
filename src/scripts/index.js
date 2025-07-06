let currentUserId = null;
// --- Импорты ---
import "../styles/index.css";
import logo from "../images/logo.svg";
import {
  getUserInfo,
  getInitialCards,
  addCard,
  updateProfile,
  deleteCard,
  updateAvatar,
} from "./api.js";

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    // сначала отобрази профиль
    renderUser(userData);
    // потом карточки
    renderCards(cards, userData._id);
  })
  .catch(console.error);

import { openPopup, closePopup } from "./components/modal.js";
import {
  createCard,
  handleLikeClick,
} from "./components/card.js";

import { enableValidation, clearValidation } from "./components/validation.js";

// --- функция renderUser ---
function renderUser(user) {
  const nameElement = document.querySelector(".profile__title");
  const jobElement = document.querySelector(".profile__description");
  const avatarElement = document.querySelector(".profile__image");

  nameElement.textContent = user.name;
  jobElement.textContent = user.about;
  avatarElement.style.backgroundImage = `url('${user.avatar}')`;
}

// --- функция renderCards ---
function renderCards(cards, userId) {
  cards.forEach((cardData) => {
    const card = createCard(
      cardData,
      handleDelete,
      handleLikeClick,
      handleImageClick,
      userId // важно передать сюда userId, если твой createCard его использует
    );
    cardList.append(card);
  });
}

// --- Конфиг валидации ---
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// --- DOM-узлы ---
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const cardList = document.querySelector(".places__list");

const editModal = document.querySelector(".popup_type_edit");
const addModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");
const popUpImage = imageModal.querySelector(".popup__image");
const popUpCaption = imageModal.querySelector(".popup__caption");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarPopup.querySelector(".popup__input_type_avatar");
const avatarEditButton = document.querySelector(".profile__image"); // область с аватаром
const editProfileForm = editModal.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);

const addCardForm = addModal.querySelector(".popup__form");
const placeNameInput = addCardForm.querySelector(
  ".popup__input_type_card-name"
);
const placeLinkInput = addCardForm.querySelector(".popup__input_type_url");
export const confirmPopup = document.querySelector(".popup_type_confirm");
const confirmForm = confirmPopup.querySelector(".popup__form");

export const cardToDelete = { value: null };
export const cardIdToDelete = { value: null };

// --- Установка логотипа ---
document.querySelector(".header__logo").src = logo;

// --- Обработчики формы редактирования профиля ---
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const submitButton = editProfileForm.querySelector(".popup__button");
  renderLoading(true, submitButton);

  const name = nameInput.value;
  const about = jobInput.value;

  updateProfile(name, about)
    .then((userData) => {
      renderUser(userData);
      closePopup(editModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = addCardForm.querySelector(".popup__button");
  renderLoading(true, submitButton);

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  addCard(name, link)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData,
        handleDelete,
        handleLikeClick,
        handleImageClick,
        currentUserId
      );
      cardList.prepend(newCard);
      addCardForm.reset();
      closePopup(addModal);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

// --- Открытие попапов ---
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openPopup(editModal);
});

addButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openPopup(addModal);
});

// --- Сабмиты ---
editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// --- Закрытие попапов по кнопке ---
document.querySelectorAll(".popup").forEach((popup) => {
  const closeButton = popup.querySelector(".popup__content button");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closePopup(popup);
    });
  }
});

// --- Активация валидации ---
enableValidation(validationConfig);

// --- Обработка клика по картинке карточки ---
function handleImageClick(link, name) {
  popUpImage.src = link;
  popUpImage.alt = name;
  popUpCaption.textContent = name;
  openPopup(imageModal);
}

 function handleDelete(cardElement, cardId) {
  // сохраняем DOM-элемент и id карточки, чтобы использовать при подтверждении
  cardToDelete.value = cardElement;
  cardIdToDelete.value = cardId;

  openPopup(confirmPopup);
} 

confirmForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  deleteCard(cardIdToDelete.value)
    .then(() => {
      cardToDelete.value.remove(); // удалить из DOM
      closePopup(confirmPopup); // закрыть попап
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
});

avatarEditButton.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector(".popup__button");
  renderLoading(true, submitButton);

  const avatarUrl = avatarInput.value;

  updateAvatar(avatarUrl)
    .then((userData) => {
      document.querySelector(
        ".profile__image"
      ).style.backgroundImage = `url('${userData.avatar}')`;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

function renderLoading(isLoading, buttonElement, defaultText = "Сохранить") {
  buttonElement.textContent = isLoading ? "Сохранение..." : defaultText;
}
