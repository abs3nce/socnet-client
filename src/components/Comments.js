import React, { Component } from "react";
import { Link } from "react-router-dom";

import { commentPost, uncommentPost } from "../controllers/posts";
import { isUserAuthenticated } from "../controllers/auth";

import defaultProfilePicture from "../images/defaultUserIcon.png";

import { FaTrashAlt } from "react-icons/fa";

class CommentBox extends Component {
    state = {
        text: "",
        error: "",
        message: "",
    };

    handleChange = (event) => {
        this.setState({ error: "", message: "" });
        this.setState({ text: event.target.value });
    };

    isCommentValid = () => {
        const { text } = this.state;
        if (!text.length > 0) {
            this.setState({
                error: "Comment must not be empty",
            });
            return false;
        }
        if (text.length > 300) {
            this.setState({
                error: "Comment can not be longer than 150 characters",
            });
            return false;
        }
        return true;
    };

    createComment = (event) => {
        event.preventDefault();
        if (!isUserAuthenticated()) {
            this.setState({ error: "Please sign in to leave a comment" });
            return false;
        }
        if (this.isCommentValid()) {
            const userID = isUserAuthenticated().user._id;
            const token = isUserAuthenticated().token;
            const postID = this.props.postID;
            const comment = { text: this.state.text };

            commentPost(userID, token, postID, comment).then((data) => {
                if (data.err) {
                    console.log(data.err);
                } else {
                    this.setState({ text: "" });
                    //prerenderovanie commentov v singlepost.js
                    this.props.updatedList(data.comments);
                }
            });
        }
    };

    deleteComment = (comment) => {
        const userID = isUserAuthenticated().user._id;
        const token = isUserAuthenticated().token;
        const postID = this.props.postID;
        const commentToDelete = comment;

        uncommentPost(userID, token, postID, commentToDelete).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ message: "Comment deleted successfully" });
                this.props.updatedList(data.comments);
            }
        });
    };

    commentDelConfirmation = (comment) => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );

        if (answer) {
            this.deleteComment(comment);
        }
    };

    render() {
        const { comments } = this.props;
        const { error, message } = this.state;
        return (
            <div className="mt-3">
                <div className="row">
                    <form onSubmit={this.createComment}>
                        <div className="form-group">
                            <input
                                type="text"
                                onChange={this.handleChange}
                                className="form-control"
                                value={this.state.text}
                                placeholder="Leave a comment"
                            />
                        </div>
                        <button className="btn btn-raised btn-sm btn-primary w-100 mt-2">
                            Submit
                        </button>
                    </form>
                </div>
                {error ? (
                    <div
                        class="alert alert-warning d-flex align-items-center mt-2"
                        role="alert"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                            viewBox="0 0 16 16"
                            role="img"
                            aria-label="Warning:"
                        >
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div className="m-2">{error}</div>
                    </div>
                ) : (
                    ""
                )}
                {message ? (
                    <div
                        class="alert alert-success d-flex align-items-center mt-2"
                        role="alert"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-check-circle-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        <div className="m-2">{message}</div>
                    </div>
                ) : (
                    ""
                )}
                <hr />
                <div>
                    {!comments.length ? (
                        <div className="d-flex justify-content-center">
                            <p>No comments yet</p>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center">
                            {comments.length === 1 ? (
                                <p>{comments.length} comment</p>
                            ) : (
                                <p>{comments.length} comments</p>
                            )}
                        </div>
                    )}
                    {comments.map((comment, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="row">
                                    <Link
                                        to={`/users/${comment.postedBy._id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "#212529",
                                        }}
                                    >
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/users/pfp/${comment.postedBy._id}`}
                                            alt={comment.postedBy.username}
                                            onError={(index) =>
                                                (index.target.src =
                                                    defaultProfilePicture)
                                            }
                                            style={{
                                                height: "30px",
                                                width: "auto",
                                                aspectRatio: "1/1",
                                                objectFit: "cover",
                                                borderRadius: "128px",
                                                border: "0px solid black",
                                            }}
                                        />
                                        <span className="m-2">
                                            {comment.postedBy.username}
                                        </span>
                                    </Link>
                                </div>
                                <div className="row mt-2">
                                    <p className="text-break">{comment.text}</p>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col-10 text-start d-flex align-items-center">
                                        <span>
                                            {new Date(
                                                comment.created
                                            ).toLocaleDateString()}
                                        </span>
                                        <span className="m-2">
                                            {new Date(
                                                comment.created
                                            ).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div className="col-2 text-end ">
                                        {isUserAuthenticated().user &&
                                            isUserAuthenticated().user._id ===
                                                comment.postedBy._id && (
                                                <>
                                                    <button
                                                        className="btn btn-raised btn-sm btn-danger d-flex align-items-center"
                                                        style={{height:"80%", aspectRatio:"1/1", width:"auto"}}
                                                        onClick={() => {
                                                            this.commentDelConfirmation(
                                                                comment
                                                            );
                                                        }}
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </>
                                            )}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default CommentBox;
