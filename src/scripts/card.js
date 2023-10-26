// selectors
const cardTemplate = document.querySelector("#card-template").content;

// functions
function createCard(card, deleteCardFn) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.description;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      deleteCardFn(evt);
    });
  return cardElement;
}

function deleteCard(evt) {
  const parent = evt.target.closest(".card");
  parent.remove();
}

export function appendCard(item, container, place = "end") {
  const cardElement = createCard(item, deleteCard);
  if (place === "end") {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
}
