// selectors
const cardTemplate = document.querySelector("#card-template").content;

// functions
const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const deleteCard = (evt) => {
  const parent = evt.target.closest(".card");
  parent.remove();
};

const createCard = (card, deleteCardFn, likeCardFn, openFullImageFn) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = card.link;
  cardImage.alt = card.description;
  cardTitle.textContent = card.name;

  // delete card
  cardDeleteButton.addEventListener("click", (evt) => {
    deleteCardFn(evt);
  });

  // like card
  cardLikeButton.addEventListener("click", (evt) => {
    likeCardFn(evt);
  });

  // image popup
  cardImage.addEventListener("click", () => {
    openFullImageFn(cardImage.src, cardImage.alt, cardTitle.textContent);
  });

  return cardElement;
};

const renderCard = (
  item,
  container,
  likeCard,
  deleteCard,
  openFullImageFn,
  place = "end",
) => {
  const cardElement = createCard(item, deleteCard, likeCard, openFullImageFn);
  if (place === "end") {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};

export { renderCard, likeCard, deleteCard };
