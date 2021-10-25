import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import { isUserAuthenticated } from "../controllers/auth";
import { getUser } from "../controllers/users";

import defaultProfilePicture from "../images/defaultUserIcon.png";
// import DefaultProfileBanner from "../images/defaultUserBanner.jpeg";

import DeleteUserButton from "../components/DeleteUserButton";
import FollowUserButton from "../components/FollowUserButton";
import ProfileLists from "../components/ProfileLists";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToLogin: false,
            following: false,
            error: "",
        };
    }

    registeredFor(registeredDate) {
        let duration = new Date() - new Date(registeredDate);
        return Math.floor(duration / (1000 * 60 * 60 * 24));
    } //for testing

    //overenie followovania
    checkIfUserFollowing = (user) => {
        const jwt = isUserAuthenticated();
        const match = user.followers.find((follower) => {
            //jedno uzivatelske id ma vela inych id (followerov) a opacne
            return follower._id === jwt.user._id;
        });
        return match;
    };

    init = (userID) => {
        getUser(userID).then((data) => {
            if (data.error) {
                this.setState({ redirectToLogin: true });
            } else {
                console.log(`> USER LOADED (PROFILE): `, data);
                let following = this.checkIfUserFollowing(data);
                this.setState({ user: data, following: following });
            }
        });
    };

    clickedFollowButton = (handleFollow) => {
        const userID = isUserAuthenticated().user._id;
        const token = isUserAuthenticated().token;

        handleFollow(userID, token, this.state.user._id).then((data) => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                this.setState({ user: data, following: !this.state.following });
            }
        });
    };

    componentDidMount() {
        const userID = this.props.match.params.userID;
        this.init(userID);
    }

    componentWillReceiveProps(props) {
        //pri prechode na iny profile sa zmeni aj jeho obsah
        const userID = props.match.params.userID;
        this.init(userID);
    }

    render() {
        const { redirectToLogin, user } = this.state;
        if (redirectToLogin) return <Redirect to="/login" />;

        const profilePictureURL = user._id
            ? `${process.env.REACT_APP_API_URL}/users/pfp/${
                  user._id
              }?${new Date().getTime()}`
            : defaultProfilePicture;

        return (
            <>
                {/* <div className="row">
          <div className="col-sm-12 banner">
            <img
              src={DefaultProfileBanner}
              className=""
              alt=""
              style={{
                width: "100%",
                position: "relative",
              }}
            />
          </div>
        </div> */}

                <div className="container">
                    <div className="row mt-3">
                        <div className="col-sm-12 text-center">
                            <img
                                style={{
                                    height: "200px",
                                    width: "auto",
                                    borderRadius: "128px",
                                    border: "0px solid black"
                                }}
                                className="image-thumbnail"
                                src={profilePictureURL}
                                onError={(index) =>
                                    (index.target.src = defaultProfilePicture)
                                }
                                alt={user.username}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 text-center mt-3">
                            <h1 className="">{user.username}</h1>
                        </div>
                    </div>

                    {/* {isUserAuthenticated().user &&
          isUserAuthenticated().user._id !== user._id && (
            <div className="row">
              <div className="col-md-12 text-center">
                <FollowUserButton />
              </div>
            </div>
          )} */}
                    <hr />

                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="lead">
                                <h3>{user.description}</h3>
                                <p>Email is {user.email}</p>
                                <p>
                                    {" "}
                                    {`Registered on ${new Date(
                                        user.created
                                    ).toDateString()}`}
                                </p>
                                <p>{`Has been a member for ${this.registeredFor(
                                    user.created
                                )} days`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-sm-12">
                            {isUserAuthenticated().user &&
                            isUserAuthenticated().user._id === user._id ? (
                                <div className="row justify-content-center">
                                    <div className="col-sm-2 text-center">
                                        <Link
                                            className="btn btn-raised btn-success"
                                            to={`/users/edit/${user._id}`}
                                        >
                                            EDIT PROFILE
                                        </Link>
                                    </div>
                                    <div className="col-sm-2 text-center">
                                        <DeleteUserButton userID={user._id} />
                                    </div>
                                </div>
                            ) : (
                                <FollowUserButton
                                    following={this.state.following}
                                    onButtonClick={this.clickedFollowButton}
                                />
                            )}
                        </div>
                    </div>

                    <ProfileLists
                        followers={user.followers}
                        following={user.following}
                    />
                </div>
            </>
        );
    }
}
export default Profile;
