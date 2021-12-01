import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getUsers } from "../../controllers/users";
import DefaultProfilePicture from "../../images/defaultUserIcon.png";

import Spinner from "react-bootstrap/Spinner";

// import { FaImages } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

import "./discover.scss";

class Discover extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            noUsers: false,
        };
    }

    componentDidMount() {
        getUsers().then((data) => {
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

    renderUsers = (users) =>
        users.map((user, index) => (
            <div
                id="card-row"
                className="DISCOVER row shadow-lg p-2 mb-3 bg-body rounded"
            >
                <Link className="d-md-flex" to={`/users/${user._id}`}>
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
                        <div className="btn btn-raised btn-primary btn-sm">
                            View Profile
                        </div>
                    </div>
                </Link>
            </div>
        ));

    render() {
        const { users, noUsers } = this.state;
        return (
            <>
                {!noUsers ? (
                    !users.length ? (
                        <div className="container">
                            <div className="row justify-content-center">
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
                        </div>
                    ) : (
                        <div className="container d-flex flex-column">
                            {this.renderUsers(users)}
                        </div>
                    )
                ) : (
                    <div className="container d-flex flex-column">
                        <div className="col-12 text-center">
                            <p className="pt-3">No users yet</p>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
export default Discover;
