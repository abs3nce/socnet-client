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
        this.setState({ error: "" });
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
        if (text.length > 150) {
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
            <div>
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
                            <button className="btn btn-raised btn-sm btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                {error ? error : ""}
                {message ? message : ""}
                <hr />
                {/* {JSON.stringify(comments)} */}
                {/* <p>{comments.length}</p> */}
                <div>
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
                                        <span className="">
                                            {comment.postedBy.username}
                                        </span>
                                    </Link>
                                </div>
                                <div className="row">
                                    <p className="text-break">{comment.text}</p>
                                </div>
                                <div className="row">
                                    <div className="col-6">
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
                                    <div className="col-6">
                                        {isUserAuthenticated().user &&
                                            isUserAuthenticated().user._id ===
                                                comment.postedBy._id && (
                                                <>
                                                    <button
                                                        className="btn btn-raised btn-sm btn-danger"
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
