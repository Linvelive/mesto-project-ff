
//Handles closing the currently open popup when the 'Escape' key is pressed.

function handleEscape(event) {
  if (event.key === "Escape") {
    // Find the currently open popup. This is efficient enough as we expect only one open at a time.
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup); // Close it if found
    }
  }
}

//Handles closing a popup when the click occurs on the overlay (outside the content).

function handleOverlayClick(event) {
  // If the click target is the popup itself (the overlay), close it.
  // 'this' refers to the popup element because the listener is added directly to it.
  if (event.target === this) {
    closePopup(this);
  }
}

//Opens a given popup by adding the 'popup_is-opened' class.

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  // Add global Escape key listener (only when a popup is open)
  document.addEventListener("keydown", handleEscape);
  // Add overlay click listener to THIS specific popup instance
  popup.addEventListener("mousedown", handleOverlayClick);
}

//Closes a given popup by removing the 'popup_is-opened' class.

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  // Remove global Escape key listener (when no popups are open)
  document.removeEventListener("keydown", handleEscape);
  // Remove overlay click listener from THIS specific popup instance
  popup.removeEventListener("mousedown", handleOverlayClick);
}