import React, { Component } from "react";
import { Link } from "react-router-dom";

import defaultProfilePicture from "../images/defaultUserIcon.png";

class ProfileLists extends Component {
    render() {
        const { following, followers } = this.props;
        return (
            <div className="row">
                <div className="col-md-6">
                    Following:
                    <hr />
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
                </div>
                <div className="col-md-6">
                    Followers:
                    <hr />
                    <div>
                        {followers.map((person, index) => {
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
                </div>
            </div>
        );
    }
}
export default ProfileLists;
