const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-1",
  headers: {
    authorization: "b2764f74-2931-4594-b5df-5b42d457e093",
    "Content-Type": "application/json",
  },
};

// functions
const getInitialCards = async () => {
  return new Promise((resolve, reject) => {
    fetch(config.baseUrl + "/cards", {
      headers: config.headers,
    }).then((res) => {
      if (res.ok) {
        resolve(res.json());
      }
      reject(`Ошибка: ${res.status}`);
    });
  });
};

const getUserInfo = async () => {
  return new Promise((resolve, reject) => {
    fetch(config.baseUrl + "/users/me", {
      headers: config.headers,
    }).then((res) => {
      if (res.ok) {
        resolve(res.json());
      }
      reject(`Ошибка: ${res.status}`);
    });
  });
};

const getInitialInfo = async () => {
  return Promise.all([getUserInfo(), getInitialCards()]);
};

const updateUserProfile = async (userProfileData) => {
  return new Promise((resolve, reject) => {
    fetch(config.baseUrl + "/users/me", {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: userProfileData.name,
        about: userProfileData.about,
      }),
    }).then((res) => {
      if (res.ok) {
        resolve(res.json());
      }
      reject(`Ошибка: ${res.status}`);
    });
  });
};

const postNewCard = async (cardData) => {
  return new Promise((resolve, reject) => {
    fetch(config.baseUrl + "/cards", {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then((res) => {
      if (res.ok) {
        resolve(res.json());
      }
      reject(`Ошибка: ${res.status}`);
    });
  });
};

const putLike = async (cardId) => {
  return new Promise((resolve, reject) => {
    fetch(config.baseUrl + `/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    }).then((res) => {
      if (res.ok) {
        resolve(res.json());
      }
      reject(`Ошибка: ${res.status}`);
    });
  });
};

const deleteLike = async (cardId) => {
  return new Promise((resolve, reject) => {
    fetch(config.baseUrl + `/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then((res) => {
      if (res.ok) {
        resolve(res.json());
      }
      reject(`Ошибка: ${res.status}`);
    });
  });
};

const deleteCard = async (cardId) => {
  return new Promise((resolve, reject) => {
    fetch(config.baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then((res) => {
      if (res) {
        resolve(res.json());
      }
      reject(`Ошибка: ${res.status}`);
    });
  });
};

const updateUserAvatar = async (avatarLink) => {
  return new Promise((resolve, reject) => {
    fetch(config.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((res) => {
      if (res.ok) {
        resolve(res.json());
      }
      reject(`Ошибка: ${res.status}`);
    });
  });
};

// exports
export {
  getInitialCards,
  getUserInfo,
  getInitialInfo,
  updateUserProfile,
  postNewCard,
  putLike,
  deleteLike,
  deleteCard,
  updateUserAvatar,
};
