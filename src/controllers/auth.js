// REGISTER
export const registerUser = (user) => {
    //fetch metody post s potrebnymi parametrami pre API a handling odpovede
    return fetch(`${process.env.REACT_APP_API_URL}/register`, {
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
    return fetch(`${process.env.REACT_APP_API_URL}/login`, {
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
export const authenticateUser = (data, redirect) => {
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
    return fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: "GET",
    })
        .then((res) => {
            console.log("> USER LOGGED OUT");
            return res.json();
        })
        .catch((err) => console.log(err));
};

//CHECK IF AUTHENTICATED
export const isUserAuthenticated = () => {
    if (typeof windows !== "undefined") {
        return false;
    }
    if (localStorage.getItem("token")) {
        return JSON.parse(localStorage.getItem("token"));
    } else return false;
};

export const forgotPassword = (email) => {
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const resetPassword = (resetPasswordInfo) => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resetPasswordInfo),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

// export const socialLogin = (user) => {
//     return fetch(`${process.env.REACT_APP_API_URL}/social-login`, {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         //credentials: "include" //funguje iba na jednom a tom istom origine
//         body: JSON.stringify(user),
//     })
//         .then((res) => {
//             console.log(`login response: `, res);
//             return res.json();
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
