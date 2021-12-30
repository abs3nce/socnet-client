import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getUsers } from "../../controllers/users";
import DefaultProfilePicture from "../../images/defaultUserIcon.png";

import Spinner from "react-bootstrap/Spinner";

import DeleteUserButton from "../../components/DeleteUserButton/DeleteUserButton";

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
                key={user._id}
                id="card-row"
                className="DISCOVER row shadow-lg p-2 mb-3 bg-body rounded mx-3"
            >
                <div className="d-md-flex" to={`/users/${user._id}`}>
                    <div className="text-center col-12 col-md-1 d-flex align-items-center justify-content-center">
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

                    <div className="col-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start">
                        {user.username}
                    </div>

                    <div className="col-12 col-md-8 d-flex align-items-center justify-content-center justify-content-md-end">
                        <div className="btn btn-raised btn-primary">
                            <Link to={`/users/${user._id}`}>View Profile</Link>
                        </div>

                        <Link
                            className="btn btn-raised btn-success mx-2"
                            to={`/users/edit/${user._id}`}
                        >
                            Edit Profile
                        </Link>

                        <DeleteUserButton userID={user._id} />
                    </div>
                </div>
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
