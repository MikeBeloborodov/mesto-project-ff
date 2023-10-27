import "./index.css";
import "./vendor/fonts/Inter-Regular.woff2";
import "./vendor/fonts/Inter-Medium.woff2";
import "./vendor/fonts/Inter-Black.woff2";
import "./images/avatar.jpg";
import "./images/add-icon.svg";
import "./images/edit-icon.svg";
import "./images/close.svg";
import "./images/delete-icon.svg";
import "./images/like-active.svg";
import "./images/like-inactive.svg";
import { appendCard } from "./scripts/card";
import { initialCards } from "./scripts/cards";
import {
  closeModal,
  openModal,
  closeModalOnEscape,
  closeModalOnOverlay,
  fillForm,
} from "./scripts/modal";

// selectors
const placesList = document.querySelector(".places__list");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileCloseButton = document.querySelector("#profile-popup-close");
const popupProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardCloseButton = document.querySelector("#new-card-popup-close");
const popupNewCardForm = document.forms["new-place"];

//functions
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileForm.name.value;
  profileDescription.textContent = popupProfileForm.description.value;
  closeModal(popupProfile);
};

//event listeners
//
//profile popup
popupEditButton.addEventListener("click", () => {
  openModal(popupProfile);
  fillForm(
    popupProfileForm,
    profileTitle.textContent,
    profileDescription.textContent,
  );
  document.addEventListener("keydown", closeModalOnEscape);
});

popupProfileCloseButton.addEventListener("click", () => {
  closeModal(popupProfile);
});

popupProfile.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt, popupProfile);
});

popupProfileForm.addEventListener("submit", handleFormSubmit);

// add card popup
addCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
  document.addEventListener("keydown", closeModalOnEscape);
});

popupNewCard.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt, popupNewCard);
});

popupNewCardCloseButton.addEventListener("click", () => {
  closeModal(popupNewCard);
});

popupNewCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = popupNewCardForm.elements["place-name"].value;
  const link = popupNewCardForm.elements.link.value;
  const description = name;
  const newCard = {
    name: name,
    link: link,
    description: description,
  };
  appendCard(newCard, placesList, "start");
  closeModal(popupNewCard);
  popupNewCardForm.reset();
});

// initialization
initialCards.forEach((card) => appendCard(card, placesList));
