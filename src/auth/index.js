// REGISTER
export const registerUser = (user) => {
  //fetch metody post s potrebnymi parametrami pre API a handling odpovede
  return fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// LOGIN
export const loginUser = (user) => {
  //fetch metody post s potrebnymi parametrami pre API a handling odpovede
  return fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// AUTHENTICATE
export const authUser = (data, redirect) => {
  if (typeof window !== "undefined") {
    if (data.error) {
      return;
    }
    localStorage.setItem("token", JSON.stringify(data));
    redirect();
  }
};

// LOGOUT
export const logoutUser = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("token");
  next();
  return fetch("http://localhost:3000/logout", {
    method: "GET",
  })
    .then((res) => {
      console.log("> USER LOGGED OUT: ", res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

//CHECK IF AUTHENTICATED
export const isAuthenticated = () => {
  if (typeof windows !== "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else return false;
};
