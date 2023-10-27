import {
  closeModal,
  closeModalOnEscape,
  closeModalOnOverlay,
  openModal,
} from "./modal";

// selectors
const cardTemplate = document.querySelector("#card-template").content;
const imagePopup = document.querySelector(".popup_type_image");
const image = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");
const closeButton = imagePopup.querySelector("#image-popup-close");

// functions
const openFullImage = (evt) => {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent =
    evt.target.parentNode.querySelector(".card__title").textContent;

  // close button
  closeButton.addEventListener("click", () => {
    closeModal(imagePopup);
  });
  // close overlay
  imagePopup.addEventListener("click", (evt) => {
    closeModalOnOverlay(imagePopup);
  });

  openModal(imagePopup);
  document.addEventListener("keydown", closeModalOnEscape);
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

  // delete
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      deleteCardFn(evt);
    });

  // like
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      likeCardFn(evt);
    });

  // popup
  cardElement.querySelector(".card__image").addEventListener("click", (evt) => {
    openFullImageFn(evt);
  });

  return cardElement;
};

const appendCard = (item, container, place = "end") => {
  const cardElement = createCard(item, deleteCard, likeCard, openFullImage);
  if (place === "end") {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};

export { appendCard };
