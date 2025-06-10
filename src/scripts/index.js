// Import styles and initial data
import "../styles/index.css";
import { initialCards } from "./components/cards.js";
import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

// Import functions from other modules
import { openPopup, closePopup, setClosePopupListeners } from "./components/modal.js";
import { createCard, handleDelete, handleLikeClick } from "./components/card.js";

// --- DOM Nodes ---

// Profile elements
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Card list container
const cardList = document.querySelector(".places__list");

// Popups and their elements
const editModal = document.querySelector(".popup_type_edit");
const addModal = document.querySelector(".popup_type_new-card");

// Form elements for edit profile popup
const editProfileForm = editModal.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);

// Form elements for add new card popup
const addCardForm = addModal.querySelector(".popup__form");
const placeNameInput = addCardForm.querySelector(
  ".popup__input_type_card-name"
);
const placeLinkInput = addCardForm.querySelector(".popup__input_type_url");

// --- Initial Setup ---

// Set profile image and header logo
profileImage.style.backgroundImage = `url(${avatar})`;
document.querySelector(".header__logo").src = logo;

// Set up general popup closing listeners (escape, overlay, close button)
setClosePopupListeners();

// --- Event Handlers ---

/**
 * Handles the submission of the edit profile form.
 * Updates profile title and description with input values.
 * @param {Event} evt - The form submission event.
 */
function handleEditProfileSubmit(evt) {
  evt.preventDefault(); // Prevent default form submission behavior

  // Update profile text content with current input values
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editModal); // Close the edit profile popup
}

/**
 * Handles the submission of the add new card form.
 * Creates a new card and adds it to the beginning of the card list.
 * @param {Event} evt - The form submission event.
 */
function handleAddCardSubmit(evt) {
  evt.preventDefault(); // Prevent default form submission behavior

  // Create a new card data object from form inputs
  const newCardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  // Create the card element using the createCard function from card.js
  const newCard = createCard(newCardData, handleDelete, handleLikeClick);
  cardList.prepend(newCard); // Add the new card to the beginning of the list

  addCardForm.reset(); // Clear the form fields
  closePopup(addModal); // Close the add new card popup
}

// --- Event Listeners ---

// Open edit profile popup button click
editButton.addEventListener("click", () => {
  // Populate form fields with current profile info before opening
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editModal); // Open the edit profile popup
});

// Open add new card popup button click
addButton.addEventListener("click", () => {
  openPopup(addModal); // Open the add new card popup
});

// Listen for edit profile form submission
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// Listen for add new card form submission
addCardForm.addEventListener("submit", handleAddCardSubmit);

// --- Initial Card Rendering ---

// Loop through initialCards array and render each card on the page
initialCards.forEach((cardData) => {
  // Create card using the createCard function from card.js
  const card = createCard(cardData, handleDelete, handleLikeClick);
  cardList.appendChild(card); // Append the created card to the list
});