import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isUserAuthenticated } from "../controllers/auth";
import { followUser, suggestedUsers } from "../controllers/users";

import "../styles/suggested.scss";

import DefaultProfilePicture from "../images/defaultUserIcon.png";

import { FaImages } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

import Spinner from "react-bootstrap/Spinner";

class Suggested extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            noUsers: false,
            error: "",
            open: false,
            followMessage: "",
        };
    }

    componentDidMount() {
        let userID = isUserAuthenticated().user._id;
        suggestedUsers(userID).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
                if (!data.length) {
                    this.setState({ noUsers: true });
                }
            }
        });
    }

    clickFollow = (user, index) => {
        const userID = isUserAuthenticated().user._id;
        const token = isUserAuthenticated().token;

        followUser(userID, token, user._id).then((data) => {
            if (data.err) {
                this.setState({ error: data.err });
            } else {
                let toFollow = this.state.users;
                toFollow.splice(index, 1);
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.username}`,
                });
            }
        });
    };

    renderUsers = (users) =>
        users.map((user, index) => (
            <div
                id="card-row"
                className="SUGGESTED row shadow-lg p-2 mb-3 bg-body rounded"
            >
                <div className="d-md-flex">
                    <div className="col-12 col-md-1 text-center">
                        <img
                            style={{
                                height: "auto",
                                aspectRatio: "1/1",
                                width: "50%",
                                objectFit: "cover",
                                borderRadius: "128px",
                            }}
                            className="image-thumbnail"
                            src={`${process.env.REACT_APP_API_URL}/users/pfp/${user._id}`}
                            onError={(index) =>
                                (index.target.src = DefaultProfilePicture)
                            }
                            alt={user.username}
                        />
                    </div>

                    <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                        {user.username}
                    </div>

                    <div className="col-12 col-md-4 d-flex justify-content-center">
                        <div className="col-3 d-flex align-items-center text-center justify-content-center">
                            {user.followers.length}
                            <FaUsers className="user-icon social-status-icon" />
                        </div>
                        <div className="col-3 d-flex align-items-center text-center justify-content-center">
                            {user.following.length}
                            <FaUserPlus className="user-icon social-status-icon" />
                        </div>
                    </div>

                    <div className="col-12 col-md-3 d-flex align-items-center justify-content-center">
                        <span className="card-body-buttons">
                            <Link
                                to={`/users/${user._id}`}
                                className="btn btn-raised btn-primary btn-sm"
                            >
                                View profile
                            </Link>
                        </span>

                        <span className="card-body-buttons">
                            <button
                                onClick={() => {
                                    this.clickFollow(user, index);
                                }}
                                className="btn btn-raised btn-success btn-sm float-right"
                            >
                                Follow
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        ));

    render() {
        const { users, open, followMessage, noUsers } = this.state;
        return (
            <>
                {!noUsers ? (
                    <>
                        {open && (
                            <div className="container mt-3">
                                <div className="alert alert-success">
                                    <p>{followMessage}</p>
                                </div>
                            </div>
                        )}
                        {!users.length ? (
                            <div className="container d-flex justify-content-center">
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
                            <div className="container d-flex flex-column">
                                <div className="col-12 text-cente">
                                    {this.renderUsers(users)}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    "No suggested users"
                )}
            </>
        );
    }
}
export default Suggested;
