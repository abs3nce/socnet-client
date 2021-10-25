export const createPost = (userID, token, post) => {
    console.log(`> DATA FROM CREATE POST FORM:`, post);

    return fetch(`${process.env.REACT_APP_API_URL}/posts/${userID}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: post,
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getPosts = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/`, {
        method: "GET",
        headers: {
            Accept: "application/json",
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
