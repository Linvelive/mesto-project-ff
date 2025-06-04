// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Вывести карточки на страницу
import "../styles/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./cards";
import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;
document.querySelector(".header__logo").src = logo;

const cardList = document.querySelector(".places__list");

//модалки
const editModal = document.querySelector(".popup_type_edit");
const addModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");
const popUpImage = imageModal.querySelector(".popup__image");
const popUpCaption = imageModal.querySelector(".popup__caption");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formElement = document.querySelector(".popup__form");
const jobInput = document.querySelector(".popup__input_type_description");
const nameInput = document.querySelector(".popup__input_type_name");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editPopup = document.querySelector(".popup_type_edit");

// функция создания карточки
function createCard(data, onDelete, onLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const formElement = document.querySelector(".popup__form");

  console.log(cardImage);

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  deleteButton.addEventListener("click", () => {
    onDelete(cardElement);
  });

  cardImage.addEventListener("click", () => {
    imageModal.classList.add("popup_is-opened");
    popUpImage.src = data.link;
    popUpCaption.textContent = data.name;
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
  onLike(likeButton);
  });

  return cardElement;
}

const addForm = addModal.querySelector(".popup__form");
const placeNameInput = addForm.querySelector(".popup__input_type_card-name");
const placeLinkInput = addForm.querySelector(".popup__input_type_url");

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  const newCard = createCard(newCardData, handleDelete, handleLikeClick);
  cardList.prepend(newCard); // Добавляем новую карточку в начало списка

  addForm.reset(); // Очистить форму
  closePopup(addModal); // Закрыть попап
}

addForm.addEventListener("submit", handleAddFormSubmit);

function handleLikeClick(button) {
  button.classList.toggle("card__like-button_is-active");
}

// функция удаления
function handleDelete(cardElement) {
  cardElement.remove();
}

// добавление карточек из initialCards
initialCards.forEach((cardData) => {
  const card = createCard(cardData, handleDelete, handleLikeClick);
  cardList.appendChild(card);
});

//попап редактировать
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  editModal.classList.add("popup_is-opened");
});

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(editPopup);
}

formElement.addEventListener("submit", handleFormSubmit);

//закрытие крестиком
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    popup.classList.remove("popup_is-opened");
  });
});

//закрытие esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_is-opened");
    }
  }
});

//закрытие по оверлею
const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target === popup) {
      popup.classList.remove("popup_is-opened");
    }
  });
});

//функция добавления карточки
addButton.addEventListener("click", () => {
  addModal.classList.add("popup_is-opened");
});
