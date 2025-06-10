//Opens a given popup by adding the 'popup_is-opened' class.
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}


//Sets up event listeners for closing popups.

export function setClosePopupListeners() {
  // Select all popup elements
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    // Find the close button for this specific popup.
    // We assume it's the first button inside the popup's content.
    const closeButton = popup.querySelector(".popup__content button");

    if (closeButton) {
      // Add click listener to the close button
      closeButton.addEventListener("click", () => {
        closePopup(popup); // Close this popup
      });
    }

    // Add mousedown listener to the popup itself for overlay click
    popup.addEventListener("mousedown", (event) => {
      // If the click target is the popup itself (not its content)
      if (event.target === popup) {
        closePopup(popup); // Close the popup
      }
    });
  });

  // Add keydown listener to the document for 'Escape' key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      // Find the currently open popup
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        closePopup(openedPopup); // Close it if found
      }
    }
  });
}