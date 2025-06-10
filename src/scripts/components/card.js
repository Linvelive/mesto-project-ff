
// Import functions from modal.js to handle image popup
import { openPopup } from "./modal.js";


 //Creates a new card element based on a template and provided data.
 //Attaches event listeners for delete, like, and image preview.

export function createCard(data, onDelete, onLike) {
  // Get the card template from the HTML
  const cardTemplate = document.querySelector("#card-template").content;
  // Clone the card element from the template to create a new one
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Get references to important elements within the new card
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  // Get the image popup elements from the DOM.
  // We get these here because they are static elements that won't change.
  const imageModal = document.querySelector(".popup_type_image");
  const popUpImage = imageModal.querySelector(".popup__image");
  const popUpCaption = imageModal.querySelector(".popup__caption");

  // Set the image source, alt text, and card title
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Add event listener for the delete button
  deleteButton.addEventListener("click", () => {
    // Call the onDelete callback, passing the card element to be deleted
    onDelete(cardElement);
  });

  // Add event listener for the like button
  likeButton.addEventListener("click", () => {
    // Call the onLike callback, passing the like button itself
    onLike(likeButton);
  });

  // Add event listener for clicking on the card image (to open image popup)
  cardImage.addEventListener("click", () => {
    // Set the source and caption for the image popup
    popUpImage.src = data.link;
    popUpImage.alt = data.name; // Important for accessibility
    popUpCaption.textContent = data.name;
    openPopup(imageModal); // Open the image popup using the imported function
  });

  // Return the newly created and configured card element
  return cardElement;
}

/**
 * Toggles the active state of the like button.
 * @param {HTMLElement} button - The like button element.
 */
export function handleLikeClick(button) {
  button.classList.toggle("card__like-button_is-active");
}

/**
 * Removes a card element from the DOM.
 * @param {HTMLElement} cardElement - The card element to remove.
 */
export function handleDelete(cardElement) {
  cardElement.remove();
}