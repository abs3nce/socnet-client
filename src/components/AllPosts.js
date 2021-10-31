import React, { Component } from "react";
import { getPosts } from "../controllers/posts";
// import DefaultProfilePicture from "../images/defaultUserIcon.png";
import { Link } from "react-router-dom";

import defaultPostIcon from "../images/defaultPostIcon.png";

class AllPosts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        getPosts().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    }

    renderPosts = (posts) => {
        return (
            <div className="row text-center d-flex justify-content-center">
                {posts.map((post, index) => {
                    const postedByID = post.postedBy
                        ? `/users/${post.postedBy._id}`
                        : "";
                    const postedByUsername = post.postedBy
                        ? post.postedBy.username
                        : "Unknown";

                    return (
                        <div
                            className="card col-sm-12 col-md-3 m-2 p-0"
                            key={index}
                        >
                            <div className="card-body">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
                                    alt={post.title}
                                    onError={(i) =>
                                        (i.target.src = `${defaultPostIcon}`)
                                    }
                                    className="img-thumbnail mb-3"
                                />
                                <h5 className="lead card-title">
                                    {post.title.substring(0, 30)}...
                                </h5>
                                <p className="lead card-text">
                                    {post.body.substring(0, 20)}
                                </p>
                                <p className="lead card-text">
                                    Posted by:{" "}
                                    <Link to={`${postedByID}`}>
                                        {postedByUsername}
                                    </Link>{" "}
                                    on {new Date(post.created).toDateString()}
                                </p>

                                <Link
                                    to={`/posts/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm"
                                >
                                    View more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts } = this.state;

        return (
            <>
                <div className="container">
                    {!posts.length ? (
                        <div className="lead mt-3">
                            <p>Loading...</p>
                        </div>
                    ) : (
                        this.renderPosts(posts)
                    )}
                </div>
            </>
        );
    }
}
export default AllPosts;
