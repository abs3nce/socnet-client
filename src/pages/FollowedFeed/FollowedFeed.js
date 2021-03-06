import React, { Component } from "react";
import { getFollowedFeed } from "../../controllers/posts";
import { isUserAuthenticated } from "../../controllers/auth";
// import DefaultProfilePicture from "../images/defaultUserIcon.png";
import { Link, Redirect } from "react-router-dom";

import defaultPostIcon from "../../images/defaultPostIcon.png";
import cameraIcon from "../../images/camera2.svg";
import lensIcon from "../../images/lens3.svg";
import settingsIcon from "../../images/settings.svg";

import Spinner from "react-bootstrap/Spinner";

import "../../components/AllPosts/AllPosts";

class FollowedFeed extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            noPosts: false,
            redirectToLogin: false,
            pageNumber: 1,
        };
    }

    componentDidMount() {
        this.loadFollowedFeed(this.state.pageNumber);
    }

    loadFollowedFeed = (pageNumber) => {
        if (!isUserAuthenticated()) {
            this.setState({ redirectToLogin: true });
        } else {
            const token = isUserAuthenticated().token;
            const _id = isUserAuthenticated().user._id;

            getFollowedFeed(_id, token, pageNumber).then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    this.setState({ posts: data });
                    if (!data.length) {
                        this.setState({ noPosts: true });
                    }
                }
            });
        }
    };

    loadNextPage = (number) => {
        this.setState({ pageNumber: this.state.pageNumber + number });
        this.loadFollowedFeed(this.state.pageNumber + number);
    };

    loadPreviousPage = (number) => {
        this.setState({ pageNumber: this.state.pageNumber - number });
        this.loadFollowedFeed(this.state.pageNumber - number);
    };

    loadLastPage = (number) => {
        this.setState({
            pageNumber: this.state.pageNumber - number,
            noPosts: false,
        });
        this.loadFollowedFeed(this.state.pageNumber - number);
    };

    renderPosts = (posts) => {
        return posts.map((post, index) => {
            const postedByID = post.postedBy
                ? `/users/${post.postedBy._id}`
                : "";
            const postedByUsername = post.postedBy
                ? post.postedBy.username
                : "Unknown";
            const exifData = post.exifData;
            return (
                <div key={post._id}>
                    <div
                        id="card"
                        className="ALLPOSTS row shadow-lg mb-5 bg-body rounded"
                    >
                        <Link to={`/posts/${post._id}`} className="m-0 p-0">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/posts/pfp/thumb/${post._id}`}
                                    alt={post.title}
                                    onError={(i) =>
                                        (i.target.src = `${defaultPostIcon}`)
                                    }
                                    className="post-image"
                                    style={{}}
                                />
                            </div>
                        </Link>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                            <div className="d-flex flex-column justify-content-between">
                                <div className="">
                                    <p className="post-card-info-title mt-3 text-break">
                                        {/* {post.title.substring(0, 30)}... */}
                                        <strong>
                                            <Link to={`/posts/${post._id}`}>
                                                {post.title.toUpperCase()}
                                            </Link>
                                        </strong>
                                    </p>
                                    <p className="text-break">
                                        {post.body.substring(0, 150)}...
                                    </p>
                                </div>
                                <div className="exif">
                                    {!exifData ||
                                    !exifData.exif ||
                                    !exifData.image ||
                                    !exifData.image.Model ||
                                    !exifData.exif.LensModel ||
                                    !exifData.exif.FNumber ||
                                    !exifData.exif.FocalLength ||
                                    !exifData.exif.ExposureTime ||
                                    !exifData.exif.ISO ||
                                    exifData.exif.ExposureCompensation ===
                                        undefined ? (
                                        <div className="exif-error">
                                            D??ta EXIF nie s?? k dispoz??ci??
                                            <br />
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
                                                <span>
                                                    {exifData.image.Model}
                                                </span>
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
                                                    {exifData.exif.FocalLength}
                                                    mm
                                                </span>
                                                <span>
                                                    f/
                                                    {exifData.exif.FNumber}
                                                </span>
                                                <span>
                                                    1/
                                                    {1 /
                                                        exifData.exif
                                                            .ExposureTime}
                                                    s
                                                </span>
                                                <span>
                                                    ISO {exifData.exif.ISO}
                                                </span>
                                                <span>
                                                    EVC{" "}
                                                    {exifData.exif.ExposureCompensation.toString().slice(
                                                        0,
                                                        4
                                                    )}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="">
                                    <p className="post-card-info-created">
                                        Autor:{" "}
                                        <Link to={`${postedByID}`}>
                                            {postedByUsername}
                                        </Link>{" "}
                                        on{" "}
                                        {new Date(post.created).toDateString()}
                                    </p>
                                    <Link
                                        to={`/posts/${post._id}`}
                                        className="btn btn-raised btn-primary btn-sm w-100 mb-3"
                                    >
                                        Vidie?? viac
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    render() {
        const { posts, noPosts, redirectToLogin, pageNumber } = this.state;

        if (redirectToLogin) {
            return <Redirect to="/login"></Redirect>;
        }
        return (
            <>
                {!noPosts ? (
                    !posts.length ? (
                        <div className="container-fluid d-flex justify-content-center">
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
                        <div className="container d-flex flex-column align-items-center">
                            <div className="col-12 col-lg-5">
                                {this.renderPosts(posts)}
                            </div>
                            {pageNumber > 1 ? (
                                <button
                                    className="btn btn-raised btn-warning mb-3"
                                    onClick={() => this.loadPreviousPage(1)}
                                >
                                    Predo??l?? strana
                                </button>
                            ) : (
                                ""
                            )}

                            {posts.length ? (
                                <button
                                    className="btn btn-raised btn-success mb-3"
                                    onClick={() => this.loadNextPage(1)}
                                >
                                    N??sleduj??ca strana
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    )
                ) : (
                    <div className="container d-flex justify-content-center">
                        <div className="col-12 text-center">
                            <p className="pt-3">??iadne pr??spevky</p>
                            <button
                                className="btn btn-raised btn-warning mb-3"
                                onClick={() => this.loadLastPage(1)}
                            >
                                Predo??l?? strana
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
export default FollowedFeed;
