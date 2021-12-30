import React, { Component } from "react";
import { getPosts } from "../../controllers/posts";
// import DefaultProfilePicture from "../images/defaultUserIcon.png";
import { Link } from "react-router-dom";

import defaultPostIcon from "../../images/defaultPostIcon.png";

import Spinner from "react-bootstrap/Spinner";

import "./allposts.scss";

class AdminAllPosts extends Component {
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
        return posts.map((post, index) => {
            const postedByID = post.postedBy
                ? `/users/${post.postedBy._id}`
                : "";
            const postedByUsername = post.postedBy
                ? post.postedBy.username
                : "Unknown";

            return (
                <div className="mx-3 col-10 col-sm-5 col-md-3 col-lg-2">
                    <div key={post._id}>
                        <div
                            id="card"
                            className="ALLPOSTS row shadow-lg mt-4 bg-body rounded"
                        >
                            <Link to={`/posts/${post._id}`} className="m-0 p-0">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/posts/pfp/thumb/${post._id}`}
                                        alt={post.title}
                                        onError={(i) =>
                                            (i.target.src = `${defaultPostIcon}`)
                                        }
                                        className="post-image"
                                        style={{}}
                                    />
                                </div>
                            </Link>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="d-flex flex-column justify-content-between">
                                    <div className="mt-3">
                                        <p className="post-card-info-created">
                                            Posted by:{" "}
                                            <Link to={`${postedByID}`}>
                                                {postedByUsername}
                                            </Link>{" "}
                                            on{" "}
                                            {new Date(
                                                post.created
                                            ).toDateString()}
                                        </p>
                                        <Link
                                            to={`/posts/${post._id}`}
                                            className="btn btn-raised btn-primary btn-sm w-100 mb-3"
                                        >
                                            View more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    render() {
        const { posts, noPosts } = this.state;

        return (
            <>
                {!noPosts ? (
                    !posts.length ? (
                        <div className="container-fluid d-flex justify-content-center">
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
                        </div>
                    ) : (
                        <div className="container">
                            <div className="row justify-content-center">{this.renderPosts(posts)}</div>
                        </div>
                    )
                ) : (
                    <div className="container d-flex justify-content-center">
                        <div className="col-12 text-center">
                            <p className="pt-3">No posts yet</p>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
export default AdminAllPosts;
