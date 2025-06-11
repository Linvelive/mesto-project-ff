
//Creates a new card element based on a template and provided data.
 
export function createCard(data, onDelete, onLike, onImageClick) {
  // Get the card template from the HTML
  const cardTemplate = document.querySelector("#card-template").content;
  // Clone the card element from the template to create a new one
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Get references to important elements within the new card
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  // Set the image source, alt text, and card title
  cardImage.src = data.link;
  cardImage.alt = data.name; // Important for accessibility
  cardTitle.textContent = data.name;

  // Add event listener for the delete button
  deleteButton.addEventListener("click", () => {
    onDelete(cardElement); // Call the onDelete callback, passing the card element to be deleted
  });

  // Add event listener for the like button
  likeButton.addEventListener("click", () => {
    onLike(likeButton); // Call the onLike callback, passing the like button itself
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

export function handleLikeClick(button) {
  button.classList.toggle("card__like-button_is-active");
}


export function handleDelete(cardElement) {
  cardElement.remove();
}