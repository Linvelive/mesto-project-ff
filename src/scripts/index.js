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

// функция создания карточки
function createCard(data, onDelete) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

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

  return cardElement;
}

// функция удаления
function handleDelete(cardElement) {
  cardElement.remove();
}

// добавление карточек из initialCards
initialCards.forEach((cardData) => {
  const card = createCard(cardData, handleDelete);
  cardList.appendChild(card);
});

//элементы для попапа
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const image = document.querySelector(".card__image");

//закрытие крестиком
const closeButton = document.querySelector(".popup__close");

//функции
