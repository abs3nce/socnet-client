import React, { Component } from "react";
import { getAllPosts } from "../../controllers/posts";
// import DefaultProfilePicture from "../images/defaultUserIcon.png";
import { Link } from "react-router-dom";

import defaultPostIcon from "../../images/defaultPostIcon.png";

import Spinner from "react-bootstrap/Spinner";

import { isUserAuthenticated } from "../../controllers/auth";
import { deletePost } from "../../controllers/posts";

import "./allposts.scss";

class AdminAllPosts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            noPosts: false,
            error: "",
        };
    }

    componentDidMount() {
        getAllPosts().then((data) => {
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

    handleDelete = (targetPostID) => {
        const postID = targetPostID;
        const token = isUserAuthenticated().token;

        let userInput = window.confirm(
            "Are you sure you want to delete your account?"
        );
        if (userInput) {
            deletePost(postID, token).then((data) => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    console.log(`> POST (${postID}) SUCCESSFULLY DELETED`);

                    getAllPosts().then((data) => {
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
            });
        }
    };

    renderPosts = (posts) => {
        return posts.map((post, index) => {
            const postedByID = post.postedBy
                ? `/users/${post.postedBy._id}`
                : "";
            const postedByUsername = post.postedBy
                ? post.postedBy.username
                : "Unknown";

            return (
                <div
                    className="mx-3 col-10 col-sm-5 col-md-3 col-lg-2"
                    key={post._id}
                >
                    <div>
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
                                        <p className="post-card-info-created text-center">
                                            <Link to={`${postedByID}`}>
                                                {postedByUsername}
                                            </Link>{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <Link
                                    className="btn btn-raised btn-warning btn-sm mb-2 w-100"
                                    to={`/posts/edit/${post._id}`}
                                >
                                    {!this.state.error
                                        ? "Upraviť"
                                        : this.state.error}
                                </Link>
                                <br />
                                <button
                                    onClick={this.handleDelete.bind(
                                        null,
                                        post._id
                                    )}
                                    className="btn btn-raised btn-danger btn-sm mb-3 w-100"
                                >
                                    {!this.state.error
                                        ? "Vymazať"
                                        : this.state.error}
                                </button>
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
                            <div className="row justify-content-center">
                                {this.renderPosts(posts)}
                            </div>
                        </div>
                    )
                ) : (
                    <div className="container d-flex justify-content-center">
                        <div className="col-12 text-center">
                            <p className="pt-3">Žiadne príspevky</p>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
export default AdminAllPosts;
