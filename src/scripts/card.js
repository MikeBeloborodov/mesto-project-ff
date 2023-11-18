import { putLike, deleteLike, deleteCard as deleteCardFromServer } from "./api";

// selectors
const cardTemplate = document.querySelector("#card-template").content;

// functions
const likeCard = async (evt) => {
  let currentLikes = evt.target.parentNode.querySelector(".card__like-count");

  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(evt.target.closest(".card").id)
      .then((updatedCard) => {
        evt.target.classList.remove("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.reduce(
          (accum, nextVal) => accum + 1,
          0,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(evt.target.closest(".card").id)
      .then((updatedCard) => {
        evt.target.classList.add("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.reduce(
          (accum, nextVal) => accum + 1,
          0,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const deleteCard = (evt) => {
  const parent = evt.target.closest(".card");
  deleteCardFromServer(parent.id)
    .then((result) => {
      parent.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const createCard = (
  card,
  userInfo,
  deleteCardFn,
  likeCardFn,
  openFullImageFn,
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  cardElement.id = card._id;
  cardElement.dataset.ownerId = card.owner._id;
  cardImage.src = card.link;
  cardImage.alt = card.description;
  cardTitle.textContent = card.name;

  // render likes
  let amountOfLikes = 0;
  card.likes.forEach((like) => {
    if (like.name === card.owner.name) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
    amountOfLikes += 1;
  });
  cardLikeCount.textContent = amountOfLikes;

  // delete card
  if (card.owner.name === userInfo.name) {
    cardDeleteButton.addEventListener("click", (evt) => {
      deleteCardFn(evt);
    });
  } else {
    cardDeleteButton.remove();
  }

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
  userInfo,
  container,
  likeCard,
  deleteCard,
  openFullImageFn,
  place = "end",
) => {
  const cardElement = createCard(
    item,
    userInfo,
    deleteCard,
    likeCard,
    openFullImageFn,
  );
  if (place === "end") {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};

export { renderCard, likeCard, deleteCard };
