import React, { Component } from "react";
import { Link } from "react-router-dom";

import { commentPost, unCommentPost } from "../controllers/posts";
import { isUserAuthenticated } from "../controllers/auth";

class CommentBox extends Component {
    state = {
        text: "",
    };

    handleChange = (event) => {
        this.setState({ text: event.target.value });
    };

    createComment = (event) => {
        event.preventDefault();
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
    };
    render() {
        const { comments } = this.props;
        return (
            <div>
                <div className="row">
                    <form onSubmit={this.createComment}>
                        <div className="form-group">
                            <input
                                type="text"
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </div>
                    </form>
                </div>
                {/* <div className="row">
                    <div>
                        {following.map((person, index) => {
                            return (
                                <div key={index}>
                                    <Link
                                        to={`/users/${person._id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "#212529",
                                        }}
                                    >
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/users/pfp/${person._id}`}
                                            alt={person.username}
                                            onError={(index) =>
                                                (index.target.src =
                                                    defaultProfilePicture)
                                            }
                                            style={{
                                                height: "50px",
                                                width: "auto",
                                                aspectRatio: "1/1",
                                                objectFit: "cover",
                                                borderRadius: "128px",
                                                border: "0px solid black",
                                            }}
                                        />
                                        <span className="lead">
                                            {person.username}
                                        </span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div> */}
                {JSON.stringify(comments)}
            </div>
        );
    }
}

export default CommentBox;
