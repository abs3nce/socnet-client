import React, { Component } from "react";
import { getUsers } from "../controllers/users";
import DefaultProfilePicture from "../images/defaultUserIcon.png";
import { Link } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import { FaImages } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

import "../styles/discover.scss";

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
            <div id="card-row" className="row shadow-lg p-2 mb-3 bg-body rounded">
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
                        {/* <div className="col-3 d-flex align-items-center text-center justify-content-center">
                            {Object.keys(user.posts).length}
                            <FaImages className="user-icon" />
                        </div> */}
                        <div className="col-3 d-flex align-items-center text-center justify-content-center">
                            {user.followers.length}
                            <FaUsers className="user-icon" />
                        </div>
                        <div className="col-3 d-flex align-items-center text-center justify-content-center">
                            {user.following.length}
                            <FaUserPlus className="user-icon" />
                        </div>
                    </div>
                    <div className="col-12 col-md-3 d-flex align-items-center justify-content-center">
                        View Profile
                    </div>
                </Link>

                {/* {JSON.stringify(user)} */}
            </div>
        ));
    // renderUsers = (users) => (
    //     <div className="row text-center d-flex justify-content-center w-100">
    //         {users.map((user, index) => (
    //             <div
    //                 className="card col-sm-12 col-md-3 m-3 p-0 shadow-lg p-3 mb-5 bg-body rounded"
    //                 key={index}
    //             >
    //                 <Link className="link-to-profile" to={`/users/${user._id}`}>
    // <img
    //     style={{
    //         height: "auto",
    //         aspectRatio: "1/1",
    //         width: "100%",
    //         objectFit: "cover",
    //     }}
    //     className="image-thumbnail"
    //     src={`${process.env.REACT_APP_API_URL}/users/pfp/${user._id}`}
    //     onError={(index) =>
    //         (index.target.src = DefaultProfilePicture)
    //     }
    //     alt={user.username}
    // />
    //                     <div className="card-body ">
    //                         <p className="card-title">{user.username}</p>
    //                         <div className="row justify-content-center">
    //                             <div className="col-3 d-flex align-items-center text-center justify-content-center">
    //                                 {[user.posts].length}
    //                                 <FaImages className="user-icon" />
    //                             </div>
    //                             <div className="col-3 d-flex align-items-center text-center justify-content-center">
    //                                 {[user.followers].length}
    //                                 <FaUsers className="user-icon" />
    //                             </div>
    //                             <div className="col-3 d-flex align-items-center text-center justify-content-center">
    //                                 {[user.following].length}
    //                                 <FaUserPlus className="user-icon" />
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </Link>
    //             </div>
    //         ))}
    //     </div>
    // );

    render() {
        const { users, noUsers } = this.state;

        return (
            <div className="container d-flex flex-column">
                {!noUsers ? (
                    !users.length ? (
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
                    )
                ) : (
                    <div className="col-12 text-center">
                        <p className="pt-3">No users yet</p>
                    </div>
                )}
            </div>
        );
    }
}
export default Discover;
