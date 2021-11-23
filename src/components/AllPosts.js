import React, { Component } from "react";
import { getPosts } from "../controllers/posts";
// import DefaultProfilePicture from "../images/defaultUserIcon.png";
import { Link } from "react-router-dom";

import defaultPostIcon from "../images/defaultPostIcon.png";

import Spinner from "react-bootstrap/Spinner";

class AllPosts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            noPosts: false,
        };
    }

    componentDidMount() {
        getPosts().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
                if (!data.length) {
                    this.setState({ noPosts: true });
                }
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
                        <div className="col-sm-12 col-md-4 m-0 p-0" key={index}>
                            <div
                                className="post"
                                style={{
                                    height: "auto",
                                    aspectRatio: "1/1",
                                    width: "100%",
                                }}
                            >
                                <Link to={`/posts/${post._id}`}>
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
                                        alt={post.title}
                                        onError={(i) =>
                                            (i.target.src = `${defaultPostIcon}`)
                                        }
                                        className="m-0 p-0"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Link>
                                {/* <h5 className="lead">
                                    {post.title.substring(0, 30)}...
                                </h5>
                                <p className="lead">
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
                                </Link> */}
                            </div>
                            {/* <div className="card-body">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
                                    alt={post.title}
                                    onError={(i) =>
                                        (i.target.src = `${defaultPostIcon}`)
                                    }
                                    className="img-thumbnail mb-3"
                                    style = {{width:"100%", height:"50%", objectFit:"cover"}}
                                />
                                <h5 className="lead card-title">
                                    {post.title.substring(0, 30)}...
                                </h5>
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
                            </div> */}
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts, noPosts } = this.state;

        return (
            <>
                <div className="container d-flex justify-content-center">
                    {!noPosts ? (
                        !posts.length ? (
                            <Spinner
                                className="mt-3"
                                animation="border"
                                role="status"
                                variant="primary"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </Spinner>
                        ) : (
                            this.renderPosts(posts)
                        )
                    ) : (
                        "No posts yet"
                    )}
                </div>
            </>
        );
    }
}
export default AllPosts;