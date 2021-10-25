import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isUserAuthenticated } from "../controllers/auth";
import { followUser, suggestedUsers } from "../controllers/users";

import DefaultProfilePicture from "../images/defaultUserIcon.png";

class Suggested extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
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

    renderUsers = (users) => (
        <div className="row text-center d-flex justify-content-center">
            {users.map((user, index) => (
                <div className="card col-sm-12 col-md-3 m-3 p-0" key={index}>
                    <img
                        style={{
                            height: "250px",
                            width: "auto",
                            objectFit: "cover",
                        }}
                        className="image-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/users/pfp/${user._id}`}
                        onError={(index) =>
                            (index.target.src = DefaultProfilePicture)
                        }
                        alt={user.username}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.username}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/users/${user._id}`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            View profile
                        </Link>
                        <button
                            onClick={() => {
                                this.clickFollow(user, index);
                            }}
                            className="btn btn-raised btn-success btn-sm float-right"
                        >
                            Follow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users, open, followMessage } = this.state;

        return (
            <>
                <div className="bg-light p-5">
                    <h2>Discover</h2>
                    <p className="lead">Find people to follow</p>
                </div>
                <br />

                {open && (
                    <div className="container">
                        <div className="alert alert-success">
                            <p>{followMessage}</p>
                        </div>
                    </div>
                )}

                <div className="container">{this.renderUsers(users)}</div>
            </>
        );
    }
}
export default Suggested;
