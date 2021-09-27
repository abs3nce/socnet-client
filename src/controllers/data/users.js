export const getUser = (userID) => {
  return fetch(`${process.env.REACT_APP_API_URL}/users/${userID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUsers = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/users/`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
