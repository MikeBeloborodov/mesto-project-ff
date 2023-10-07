// selectors
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places');

// functions
function createCard(card, deleteCardFn) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', (evt) => {
      deleteCardFn(evt);
    });
  return cardElement;
}

function deleteCard(evt) {
  const parent = evt.target.parentElement;
  parent.remove();
}

// initialization
const readyCards = initialCards.map((card) => createCard(card, deleteCard));
readyCards.forEach((card) => {
  placesList.append(card);
});
