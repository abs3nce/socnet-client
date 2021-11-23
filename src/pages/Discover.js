import React, { Component } from "react";
import { getUsers } from "../controllers/users";
import DefaultProfilePicture from "../images/defaultUserIcon.png";
import { Link } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

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

    renderUsers = (users) => (
        <div className="row text-center d-flex justify-content-center w-100">
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
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users, noUsers } = this.state;

        return (
            <>
                <div className="container d-flex justify-content-center">
                    {!noUsers ? (
                        !users.length ? (
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
                            this.renderUsers(users)
                        )
                    ) : (
                        "No users yet"
                    )}
                    {/* //dokoncit ukoncenie nacitavania ak neexistuju uzivatelia
                    {!users.length ? (
                        <Spinner
                            className="mt-3"
                            animation="border"
                            role="status"
                            variant="primary"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        this.renderUsers(users)
                    )} */}
                </div>
            </>
        );
    }
}
export default Discover;
