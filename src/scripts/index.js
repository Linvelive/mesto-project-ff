// --- Импорты ---
import "../styles/index.css";
import { initialCards } from "./components/cards.js";
import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

import { openPopup, closePopup } from "./components/modal.js";
import {
  createCard,
  handleDelete,
  handleLikeClick,
} from "./components/card.js";

import {
  enableValidation,
  clearValidation,
} from "./components/validation.js";

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

const editProfileForm = editModal.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_description");

const addCardForm = addModal.querySelector(".popup__form");
const placeNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const placeLinkInput = addCardForm.querySelector(".popup__input_type_url");

// --- Установка аватара и логотипа ---
profileImage.style.backgroundImage = `url(${avatar})`;
document.querySelector(".header__logo").src = logo;

// --- Обработчики формы редактирования профиля ---
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editModal);
}

// --- Обработчики формы добавления карточки ---
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  const newCard = createCard(
    newCardData,
    handleDelete,
    handleLikeClick,
    handleImageClick
  );

  cardList.prepend(newCard);
  addCardForm.reset();
  closePopup(addModal);
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

// --- Рендер стартовых карточек ---
initialCards.forEach((cardData) => {
  const card = createCard(
    cardData,
    handleDelete,
    handleLikeClick,
    handleImageClick
  );
  cardList.appendChild(card);
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