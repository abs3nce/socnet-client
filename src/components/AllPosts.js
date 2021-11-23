import React, { Component } from "react";
import { getPosts } from "../controllers/posts";
// import DefaultProfilePicture from "../images/defaultUserIcon.png";
import { Link } from "react-router-dom";

import defaultPostIcon from "../images/defaultPostIcon.png";
import cameraIcon from "../images/camera2.svg";
import lensIcon from "../images/lens3.svg";
import settingsIcon from "../images/settings.svg";

import Spinner from "react-bootstrap/Spinner";

import "../styles/allposts.scss";

class AllPosts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            noPosts: false,
        };
    }

    componentDidMount() {
        getPosts().then((data) => {
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
                <>
                    <div className="row justify-content-center">
                        <div
                            id="post-card"
                            className="col-12 col-md-10 col-lg-8 shadow-lg p-3 mb-5 bg-body rounded"
                        >
                            <div className="row">
                                <div className="col-12 col-md-5 bg-light">
                                    <Link to={`/posts/${post._id}`}>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
                                            alt={post.title}
                                            onError={(i) =>
                                                (i.target.src = `${defaultPostIcon}`)
                                            }
                                            className="m-0 p-0"
                                            id="post-card-image"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Link>
                                </div>
                                <div className="col-12 col-md-7 d-flex flex-column justify-content-between">
                                    <div className="post-card-info-one">
                                        <p className="post-card-info-title mt-3">
                                            {/* {post.title.substring(0, 30)}... */}
                                            {post.title}
                                        </p>
                                        <p>{post.body.substring(0, 150)}...</p>
                                    </div>
                                    <div className="post-card-info-two exif">
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
                                                        {
                                                            exifData.exif
                                                                .LensModel
                                                        }
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
                                                        {
                                                            exifData.exif
                                                                .FocalLength
                                                        }
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
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="post-card-info-three">
                                        <p className="post-card-info-created">
                                            Posted by:{" "}
                                            <Link to={`${postedByID}`}>
                                                {postedByUsername}
                                            </Link>{" "}
                                            on{" "}
                                            {new Date(
                                                post.created
                                            ).toDateString()}
                                        </p>
                                        <Link
                                            to={`/posts/${post._id}`}
                                            className="btn btn-raised btn-primary btn-sm"
                                        >
                                            View more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        });

        // <div className="row text-center d-flex justify-content-center">
        //     {posts.map((post, index) => {
        //         const postedByID = post.postedBy
        //             ? `/users/${post.postedBy._id}`
        //             : "";
        //         const postedByUsername = post.postedBy
        //             ? post.postedBy.username
        //             : "Unknown";

        //         return (
        //             <div className="col-sm-12 col-md-4 m-0 p-0" key={index}>
        //                 <div
        //                     className="post"
        //                     style={{
        //                         height: "auto",
        //                         aspectRatio: "1/1",
        //                         width: "100%",
        //                     }}
        //                 >
        //                     <Link to={`/posts/${post._id}`}>
        //                         <img
        //                             src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
        //                             alt={post.title}
        //                             onError={(i) =>
        //                                 (i.target.src = `${defaultPostIcon}`)
        //                             }
        //                             className="m-0 p-0"
        //                             style={{
        //                                 width: "100%",
        //                                 height: "100%",
        //                                 objectFit: "cover",
        //                             }}
        //                         />
        //                     </Link>
        //                     {/* <h5 className="lead">
        //                         {post.title.substring(0, 30)}...
        //                     </h5>
        //                     <p className="lead">
        //                         Posted by:{" "}
        //                         <Link to={`${postedByID}`}>
        //                             {postedByUsername}
        //                         </Link>{" "}
        //                         on {new Date(post.created).toDateString()}
        //                     </p>

        //                     <Link
        //                         to={`/posts/${post._id}`}
        //                         className="btn btn-raised btn-primary btn-sm"
        //                     >
        //                         View more
        //                     </Link> */}
        //                 </div>
        //                 {/* <div className="card-body">
        //                     <img
        //                         src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
        //                         alt={post.title}
        //                         onError={(i) =>
        //                             (i.target.src = `${defaultPostIcon}`)
        //                         }
        //                         className="img-thumbnail mb-3"
        //                         style = {{width:"100%", height:"50%", objectFit:"cover"}}
        //                     />
        //                     <h5 className="lead card-title">
        //                         {post.title.substring(0, 30)}...
        //                     </h5>
        //                     <p className="lead card-text">
        //                         Posted by:{" "}
        //                         <Link to={`${postedByID}`}>
        //                             {postedByUsername}
        //                         </Link>{" "}
        //                         on {new Date(post.created).toDateString()}
        //                     </p>

        //                     <Link
        //                         to={`/posts/${post._id}`}
        //                         className="btn btn-raised btn-primary btn-sm"
        //                     >
        //                         View more
        //                     </Link>
        //                 </div> */}
        //             </div>
        //         );
        //     })}
        // </div>
    };

    render() {
        const { posts, noPosts } = this.state;

        return (
            <>
                <div className="container-fluid">
                    {!noPosts ? (
                        !posts.length ? (
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
                            this.renderPosts(posts)
                        )
                    ) : (
                        "No posts yet"
                    )}
                </div>
            </>
        );
    }
}
export default AllPosts;
