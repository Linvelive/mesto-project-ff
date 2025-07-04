//Creates a new card element based on a template and provided data.
import { deleteCard } from '../api.js';
import { confirmPopup, cardToDelete, cardIdToDelete } from "../index.js";
import { openPopup } from "./modal.js";
export function createCard(data, onDelete, onLike, onImageClick, userId) {
  // Get the card template from the HTML
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Get references to important elements within the new card
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  // Set the image source, alt text, and card title
  cardImage.src = data.link;
  cardImage.alt = data.name; // Important for accessibility
  cardTitle.textContent = data.name;

  if (data.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Показываем кнопку удаления только если карточка принадлежит пользователю
  if (data.owner._id !== userId) {
    deleteButton.style.display = "none";
  }

  // Add event listener for the delete button
  deleteButton.addEventListener("click", () => {
    onDelete(cardElement); // Call the onDelete callback, passing the card element to be deleted
  });

  likeCount.textContent = data.likes.length;

  deleteButton.addEventListener("click", () => {
    onDelete(cardElement, data._id);
  });

  likeButton.addEventListener("click", () => {
    onLike(cardElement, data._id, likeButton, likeCount);
  });
  // Add event listener for clicking on the card image.
  // Instead of directly manipulating the modal, we call the provided onImageClick callback.
  // This makes the card component unaware of the specific modal implementation.
  cardImage.addEventListener("click", () => {
    // Pass the image data (link and name) to the callback.
    // This allows the callback (defined in index.js) to know what image to display.
    onImageClick(data.link, data.name);
  });

  // Return the newly created and configured card element
  return cardElement;
}

//Toggles the active state of the like button.
import { changeLikeCardStatus } from '../api';

export function handleLikeClick(cardElement, cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  changeLikeCardStatus(cardId, isLiked)
    .then((updatedCard) => {
      likeCount.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.error("Ошибка при изменении лайка:", err);
    });
}

export function handleDelete(cardElement, cardId) {
  // сохраняем DOM-элемент и id карточки, чтобы использовать при подтверждении
  cardToDelete.value = cardElement;
  cardIdToDelete.value = cardId;

  openPopup(confirmPopup);
} 
