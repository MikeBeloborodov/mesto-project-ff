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

// exports
export { getInitialCards };
