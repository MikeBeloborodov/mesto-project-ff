const openModal = (element) => {
  element.classList.toggle("popup_is-opened");
};

const closeModal = (element) => {
  element.classList.toggle("popup_is-opened");
  document.removeEventListener("keydown", closeModalOnEscape);
};

const closeModalOnEscape = (evt) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    currentPopup.classList.toggle("popup_is-opened");
    document.removeEventListener("keydown", closeModalOnEscape);
  }
};
const fillForm = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

export { openModal, closeModal, closeModalOnEscape, fillForm };
