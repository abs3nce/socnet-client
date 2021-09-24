export const getUser = (userID) => {
  return fetch(`http://localhost:3000/users/${userID}`, {
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
  return fetch(`http://localhost:3000/users/`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
