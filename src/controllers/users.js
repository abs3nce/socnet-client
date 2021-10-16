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

export const updateUser = (userID, token, user) => {
  console.log(`> DATA FROM EDIT FORM:`, user);
  
  return fetch(`${process.env.REACT_APP_API_URL}/users/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = (userID, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/users/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
