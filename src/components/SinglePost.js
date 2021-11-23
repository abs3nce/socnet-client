import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import {
    getPost,
    deletePost,
    likePost,
    unlikePost,
} from "../controllers/posts";
import { isUserAuthenticated } from "../controllers/auth";

//images
import defaultPostIcon from "../images/defaultPostIcon.png";
import defaultUserIcon from "../images/defaultUserIcon.png";
import cameraIcon from "../images/camera2.svg";
import lensIcon from "../images/lens3.svg";
import settingsIcon from "../images/settings.svg";

//css
import "../styles/single-post.scss";

//bootstrap
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";

import { FaHeart } from "react-icons/fa";

class SinglePost extends Component {
    state = {
        post: "",
        redirectToProfile: false,
        likes: 0,
        likedByUser: false,
        redirectToLogin: false,
        likeLoading: false,
    };

    componentDidMount = () => {
        const postID = this.props.match.params.postID;
        getPost(postID).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data,
                    likes: data.likes.length,
                    likedByUser: this.isLikedByUser(data.likes),
                });
                console.log(`POST LOADED: `, data);
            }
        });
    };

    isLikedByUser = (userIDs) => {
        const userID = isUserAuthenticated() && isUserAuthenticated().user._id;
        let isIDMatching = userIDs.indexOf(userID) !== -1;
        return isIDMatching;
    };

    handleDelete = () => {
        const postID = this.props.match.params.postID;
        const token = isUserAuthenticated().token;

        let userInput = window.confirm(
            "Are you sure you want to delete your account?"
        );
        if (userInput) {
            deletePost(postID, token).then((data) => {
                if (data.error) {
                    console.log(data.err);
                } else {
                    this.setState({ redirectToProfile: true });
                    console.log(`> POST (${postID}) SUCCESSFULLY DELETED`);
                }
            });
        }
    };

    likeToggle = () => {
        if (!isUserAuthenticated()) {
            this.setState({ redirectToLogin: true });
            return false;
        }

        this.setState({ likeLoading: true });

        let likeAPICall = this.state.likedByUser ? unlikePost : likePost;

        const userID = isUserAuthenticated().user._id;
        const postID = this.state.post._id;
        const token = isUserAuthenticated().token;

        likeAPICall(userID, token, postID).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    likedByUser: !this.state.likedByUser,
                    likes: data.likes.length,
                    likeLoading: false,
                });
            }
        });
    };

    renderPost = (post) => {
        const postedByID = post.postedBy ? `/users/${post.postedBy._id}` : "";
        const postedByUsername = post.postedBy
            ? post.postedBy.username
            : "Unknown";

        const profilePictureURL = postedByID
            ? `${process.env.REACT_APP_API_URL}/users/pfp/${
                  post.postedBy._id
              }?${new Date().getTime()}`
            : defaultUserIcon;

        const exifData = post.exifData;
        const { likedByUser, likes, redirectToLogin, likeLoading } = this.state;
        {
            if (redirectToLogin) {
                return <Redirect to="/login"></Redirect>;
            }
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 m-0 p-0 w100">
                        <Image
                            src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
                            alt=""
                            style={{
                                maxHeight: "90vh",
                                width: "100%",
                                objectFit: "contain",
                            }}
                            onError={(index) =>
                                (index.target.src = defaultPostIcon)
                            }
                            fluid
                        />
                    </div>

                    <div className="col-sm-12 col-lg-4 m-0 p-0 p-3">
                        <div className="row justify-content-center align-items-center w100 ">
                            <div className="col-12 text-center">
                                <img
                                    style={{
                                        height: "50px",
                                        width: "auto",
                                        aspectRatio: "1/1",
                                        objectFit: "cover",
                                        borderRadius: "128px",
                                        border: "0px solid black",
                                    }}
                                    className="image-thumbnail "
                                    src={profilePictureURL}
                                    onError={(index) =>
                                        (index.target.src = defaultUserIcon)
                                    }
                                    alt={postedByUsername}
                                />
                            </div>

                            <div className="col-12 text-center">
                                <Link to={postedByID}>{postedByUsername}</Link>
                            </div>
                        </div>
                        <hr />

                        <div className="post-info-scroll">
                            <div className="row justify-content-left align-items-center exif">
                                {!exifData ? (
                                    <div className="exif-error">
                                        No EXIF data available
                                    </div>
                                ) : (
                                    <>
                                        <div className="exif-camera">
                                            <span>
                                                <img
                                                    src={cameraIcon}
                                                    alt=""
                                                    style={{
                                                        height: "40px",
                                                        width: "auto",
                                                    }}
                                                />
                                            </span>
                                            <span>{exifData.image.Model}</span>
                                        </div>
                                        <div className="exif-lens">
                                            <span>
                                                <img
                                                    src={lensIcon}
                                                    alt=""
                                                    style={{
                                                        height: "40px",
                                                        width: "auto",
                                                    }}
                                                />
                                            </span>
                                            <span>
                                                {exifData.exif.LensModel}
                                            </span>
                                        </div>
                                        <div className="exif-settings">
                                            <span>
                                                <img
                                                    src={settingsIcon}
                                                    alt=""
                                                    style={{
                                                        height: "40px",
                                                        width: "auto",
                                                    }}
                                                />
                                            </span>
                                            <span>
                                                {exifData.exif.FocalLength}mm
                                            </span>
                                            <span>
                                                f/
                                                {exifData.exif.FNumber}
                                            </span>
                                            <span>
                                                1/
                                                {1 / exifData.exif.ExposureTime}
                                                s
                                            </span>
                                            <span>ISO {exifData.exif.ISO}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                            <hr />
                            <div className="row">
                                <h1 className="post-title">{post.title}</h1>
                                <p className="post-body">{post.body}</p>
                                <h6 className="post-created">
                                    {new Date(post.created).toDateString()}
                                </h6>
                            </div>
                        </div>

                        {isUserAuthenticated().user &&
                            isUserAuthenticated().user._id ===
                                post.postedBy._id && (
                                <>
                                    <hr />
                                    <div className="row justify-content-center">
                                        <div className="col-6 text-end">
                                            <Link
                                                className="btn btn-raised btn-warning btn-sm"
                                                to={`/posts/edit/${post._id}`}
                                            >
                                                UPDATE POST
                                            </Link>
                                        </div>
                                        <div className="col-6 text-start">
                                            <button
                                                onClick={this.handleDelete}
                                                className="btn btn-raised btn-danger btn-sm"
                                            >
                                                DELETE POST
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        <div className="likes mt-3">
                            {likedByUser ? (
                                <h4
                                    onClick={this.likeToggle}
                                    style={{
                                        color: "pink",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "start",
                                    }}
                                >
                                    {likeLoading ? (
                                        <>
                                            <Spinner
                                                className="mt-3"
                                                animation="border"
                                                role="status"
                                            >
                                                <span className="visually-hidden">
                                                    Loading...
                                                </span>
                                            </Spinner>
                                        </>
                                    ) : (
                                        <>
                                            <FaHeart
                                                style={{ marginRight: "8px" }}
                                            />
                                            {likes}
                                        </>
                                    )}
                                </h4>
                            ) : (
                                <h4
                                    onClick={this.likeToggle}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "start",
                                    }}
                                >
                                    {likeLoading ? (
                                        <>
                                            <Spinner
                                                className="mt-3"
                                                animation="border"
                                                role="status"
                                                style={{ color: "pink" }}
                                            >
                                                <span className="visually-hidden">
                                                    Loading...
                                                </span>
                                            </Spinner>
                                        </>
                                    ) : (
                                        <>
                                            <FaHeart
                                                style={{
                                                    marginRight: "8px",
                                                }}
                                            />
                                            {likes}
                                        </>
                                    )}
                                </h4>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { post, redirectToProfile } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/users/${post.postedBy._id}`} />;
        }
        return (
            <div className="container-fluid d-flex justify-content-center">
                {!post ? (
                    <Spinner
                        className="mt-3"
                        animation="border"
                        role="status"
                        variant="primary"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    this.renderPost(post)
                )}
            </div>
        );
    }
}

export default SinglePost;
