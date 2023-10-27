const openModal = (element, selector) => {
  element.classList.add(selector);
};

const closeModal = (element, selector) => {
  element.classList.remove(selector);
  document.removeEventListener("keydown", closeModalOnEscape);
};

const closeModalOnEscape = (evt, selector) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector("." + selector);
    console.log(currentPopup);
    closeModal(currentPopup, selector);
  }
};

const closeModalOnOverlay = (evt, selector) => {
  console.log(evt.target);
  console.log(evt.currentTarget);
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget, selector);
  }
};

export { openModal, closeModal, closeModalOnEscape, closeModalOnOverlay };
