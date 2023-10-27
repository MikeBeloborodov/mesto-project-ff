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
import {
  renderCard,
  likeCard,
  deleteCard,
  addImageContent,
} from "./scripts/card";
import { initialCards } from "./scripts/cards";
import {
  closeModal,
  openModal,
  closeModalOnEscape,
  closeModalOnOverlay,
} from "./scripts/modal";

// selectors
const placesList = document.querySelector(".places__list");
const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = document.forms["new-place"];
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

//functions
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileForm.name.value;
  profileDescription.textContent = popupProfileForm.description.value;
  closeModal(popupProfile, "popup_is-opened");
};

const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

//event listeners
//
// image popup
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    addImageContent(evt, image, caption);
    openModal(popupImage, "popup_is-opened");
  }
});

popupImage.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt, "popup_is-opened");
});

//profile popup
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("profile__edit-button")) {
    fillProfilePopup(
      popupProfileForm,
      profileTitle.textContent,
      profileDescription.textContent,
    );
    openModal(popupProfile, "popup_is-opened");
  }
});

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

popupProfile.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt, "popup_is-opened");
});

// add card popup
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("profile__add-button")) {
    openModal(popupNewCard, "popup_is-opened");
  }
});

popupNewCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = popupNewCardForm.elements["place-name"].value;
  const link = popupNewCardForm.elements.link.value;
  const description = name;
  const newCard = {
    name,
    link,
    description,
  };
  renderCard(newCard, placesList, "start");
  closeModal(popupNewCard, "popup_is-opened");
  popupNewCardForm.reset();
});

popupNewCard.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt, "popup_is-opened");
});

// popup close button
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    closeModal(evt.target.parentNode.parentNode, "popup_is-opened");
  }
});

// popup close on escape
document.addEventListener("keydown", (evt) => {
  closeModalOnEscape(evt, "popup_is-opened");
});

// delete card
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__delete-button")) {
    deleteCard(evt);
  }
});

// like card
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    likeCard(evt);
  }
});

// initialization
initialCards.forEach((card) => renderCard(card, placesList));
