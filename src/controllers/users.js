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
            "Content-Type": "application/json",
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

export const updateUserCredentials = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
            let auth = JSON.parse(localStorage.getItem("token"));
            auth.user = user;
            localStorage.setItem("token", JSON.stringify(auth));
            next();
        }
    }
};

export const followUser = (userID, token, followID) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userID, followID }),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const unfollowUser = (userID, token, unfollowID) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userID, unfollowID }),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const suggestedUsers = (userID) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/suggested/${userID}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
