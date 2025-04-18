// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Вывести карточки на страницу

const cardList = document.querySelector(".places__list");

// функция создания карточки
function createCard(data, onDelete) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener("click", () => {
    deleteCallback(cardElement);
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
