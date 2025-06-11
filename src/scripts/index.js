// index.js

// Import styles and initial data
import "../styles/index.css";
import { initialCards } from "./components/cards.js";
import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

// Import functions from other modules
// setClosePopupListeners is no longer imported as its logic is moved here.
import { openPopup, closePopup } from "./components/modal.js";
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
const imageModal = document.querySelector(".popup_type_image");
const popUpImage = imageModal.querySelector(".popup__image");
const popUpCaption = imageModal.querySelector(".popup__caption");

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

// --- Event Handlers ---

//Handles the logic for opening the image popup.

function handleImageClick(link, name) {
  popUpImage.src = link;
  popUpImage.alt = name;
  popUpCaption.textContent = name;
  openPopup(imageModal); // Use openPopup from modals.js
}

//Handles the submission of the edit profile form.

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editModal); // Use closePopup from modals.js
}

//Handles the submission of the add new card form.

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
  closePopup(addModal); // Use closePopup from modals.js
}

// --- Event Listeners ---

// Open edit profile popup button click
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editModal); // Use openPopup from modals.js
});

// Open add new card popup button click
addButton.addEventListener("click", () => {
  addCardForm.reset();
  openPopup(addModal); // Use openPopup from modals.js
});

// Listen for edit profile form submission
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// Listen for add new card form submission
addCardForm.addEventListener("submit", handleAddCardSubmit);


// --- Initialize Close Buttons for All Popups ---
// This loop is now in index.js, taking responsibility for setting up all close handlers.
const popups = document.querySelectorAll(".popup"); // Get all popup elements

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__content button"); // Find the close button for this specific popup

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closePopup(popup); // Call closePopup when the close button is clicked
    });
  }
  // The overlay and escape key listeners are now managed dynamically by openPopup/closePopup.
});


// --- Initial Card Rendering ---

initialCards.forEach((cardData) => {
  const card = createCard(
    cardData,
    handleDelete,
    handleLikeClick,
    handleImageClick
  );
  cardList.appendChild(card);
});