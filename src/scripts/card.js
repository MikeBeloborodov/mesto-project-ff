// selectors
const cardTemplate = document.querySelector("#card-template").content;

// functions
const addImageContent = (evt, image, caption) => {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent =
    evt.target.parentNode.querySelector(".card__title").textContent;
};

const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const deleteCard = (evt) => {
  const parent = evt.target.closest(".card");
  parent.remove();
};

const createCard = (card, deleteCardFn, likeCardFn, openFullImageFn) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.description;
  cardElement.querySelector(".card__title").textContent = card.name;

  return cardElement;
};

const renderCard = (item, container, place = "end") => {
  const cardElement = createCard(item, deleteCard, likeCard, addImageContent);
  if (place === "end") {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};

export { renderCard, deleteCard, likeCard, addImageContent };
