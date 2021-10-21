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
                                    <div className="row">
                                        <Link to={`/users/${person._id}`}>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/users/pfp/${person._id}`}
                                                alt={person.username}
                                                height="30px"
                                                onError={(index) =>
                                                    (index.target.src =
                                                        defaultProfilePicture)
                                                }
                                            />
                                            <div>{person.username}</div>
                                            <p
                                                style={{ clear: "both" }}
                                                className="description"
                                            >
                                                {person.description}
                                            </p>
                                        </Link>
                                    </div>
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
                                    <div className="row">
                                        <Link to={`/users/${person._id}`}>
                                            <div className="row">

                                            </div>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/users/pfp/${person._id}`}
                                                alt={person.username}
                                                height="30px"
                                                onError={(index) =>
                                                    (index.target.src =
                                                        defaultProfilePicture)
                                                }
                                            />
                                            <div>{person.username}</div>
                                            {/* <p
                                                style={{ clear: "both" }}
                                                className="description"
                                            >
                                                {person.description}
                                            </p> */}
                                        </Link>
                                    </div>
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
