import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Comments from "../../components/Comments/Comments";
import Exif from "../../components/ExifData/Exif";

import {
    getPost,
    deletePost,
    likePost,
    unlikePost,
} from "../../controllers/posts";
import { isUserAuthenticated } from "../../controllers/auth";

//images
import defaultPostIcon from "../../images/defaultPostIcon.png";
import defaultUserIcon from "../../images/defaultUserIcon.png";
// import cameraIcon from "../../images/camera2.svg";
// import lensIcon from "../../images/lens3.svg";
// import settingsIcon from "../../images/settings.svg";

//css
import "./post-viewer.scss";

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
        comments: [],
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
                    comments: data.comments,
                });
                console.log(`POST LOADED (VIEWER): `, data);
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
            "Ste si ist??, ??e chcete vymaza?? tento pr??spevok?"
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

    updateCommentList = (comments) => {
        this.setState({ comments });
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
        const { likedByUser, likes, redirectToLogin, likeLoading, comments } =
            this.state;

        if (redirectToLogin) {
            return <Redirect to="/login"></Redirect>;
        }

        return (
            <div className="SINGLEPOST container p-0 m-0">
                <div className="row">
                    <div className="col-12">
                        <Image
                            src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
                            alt=""
                            style={{
                                maxHeight: "calc(100vh - 70px)",
                                width: "100%",
                                objectFit: "contain",
                            }}
                            onError={(index) =>
                                (index.target.src = defaultPostIcon)
                            }
                            fluid
                        />
                    </div>
                </div>
                <hr />
                <div className="row p-3">
                    <div className="col-12 text-center col-md-6">
                        <div className="row">
                            <div className="col-12 col-md-2 text-center text-md-end d-md-flex flex-md-column justify-md-content-center align-md-items-start">
                                <img
                                    style={{
                                        height: "50px",
                                        width: "50px",
                                        objectFit: "fill",
                                        borderRadius: "128px",
                                    }}
                                    className="image-thumbnail"
                                    src={profilePictureURL}
                                    onError={(index) =>
                                        (index.target.src = defaultUserIcon)
                                    }
                                    alt={postedByUsername}
                                />
                            </div>
                            <div className="col-12 col-md-10 text-center text-md-start d-md-flex flex-md-column justify-md-content-center">
                                <Link to={postedByID} className="p-3">
                                    {postedByUsername}
                                </Link>
                            </div>
                        </div>

                        <div className="row text-center text-md-start text-break">
                            <h1>{post.title}</h1>
                        </div>
                        <div className="row text-center text-md-start text-break">
                            <p>{post.body}</p>
                            <p>{new Date(post.created).toDateString()}</p>
                        </div>

                        {!exifData ||
                        !exifData.exif ||
                        !exifData.image ||
                        !exifData.image.Model ||
                        !exifData.exif.LensModel ||
                        !exifData.exif.FNumber ||
                        !exifData.exif.FocalLength ||
                        !exifData.exif.ExposureTime ||
                        !exifData.exif.ISO ||
                        exifData.exif.ExposureCompensation === undefined ? (
                            <div className="exif-">
                                D??ta EXIF nie s?? k dispoz??ci??
                                <br />
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-12 text-start">
                                    <Exif exifData={exifData} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-md-6 text-center text-md-start">
                        <div className="row">
                            {isUserAuthenticated().user &&
                                isUserAuthenticated().user.role ===
                                    "administrator" &&
                                isUserAuthenticated().user._id !==
                                    post.postedBy._id && (
                                    <div className="card mb-3 text-center bg-light">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Admin
                                            </h5>
                                            <p className="text-danger">
                                                Upravi??/Vymaza?? ako Admin
                                            </p>
                                            <Link
                                                className="btn btn-raised btn-warning btn-sm mb-2 w-100"
                                                to={`/posts/edit/${post._id}`}
                                            >
                                                Upravi?? pr??spevok
                                            </Link>
                                            <br />
                                            <button
                                                onClick={this.handleDelete}
                                                className="btn btn-raised btn-danger btn-sm w-100"
                                            >
                                                Vymaza?? pr??spevok
                                            </button>
                                        </div>
                                    </div>
                                )}
                        </div>

                        {isUserAuthenticated().user &&
                            isUserAuthenticated().user._id ===
                                post.postedBy._id && (
                                <>
                                    <div className="row justify-content-center py-3 py-md-0">
                                        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center mb-3 mb-md-0 mt-md-3 mt-xl-0">
                                            <Link
                                                className="btn btn-raised btn-warning btn-sm w-100"
                                                to={`/posts/edit/${post._id}`}
                                            >
                                                Upravi?? pr??spevok
                                            </Link>
                                        </div>
                                        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center mt-md-3 mt-xl-0">
                                            <button
                                                onClick={this.handleDelete}
                                                className="btn btn-raised btn-danger btn-sm w-100"
                                            >
                                                Vymaza?? pr??spevok
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        {isUserAuthenticated().user && (
                            <div className="row">
                                <div className="likes mt-3">
                                    {likedByUser ? (
                                        <button
                                            className="btn btn-raised btn-sm like-button like-button-liked"
                                            onClick={this.likeToggle}
                                        >
                                            {likeLoading ? (
                                                <div>
                                                    <Spinner
                                                        className=""
                                                        animation="border"
                                                        role="status"
                                                        size="sm"
                                                    >
                                                        <span className="visually-hidden">
                                                            Loading...
                                                        </span>
                                                    </Spinner>
                                                </div>
                                            ) : (
                                                <div>
                                                    <FaHeart className="mx-1" />
                                                    <span>{likes}</span>
                                                </div>
                                            )}
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-raised btn-sm like-button like-button-notliked"
                                            onClick={this.likeToggle}
                                        >
                                            {likeLoading ? (
                                                <div>
                                                    <Spinner
                                                        className=""
                                                        animation="border"
                                                        role="status"
                                                        size="sm"
                                                    >
                                                        <span className="visually-hidden">
                                                            Loading...
                                                        </span>
                                                    </Spinner>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <span>
                                                        <FaHeart className="mx-1" />
                                                    </span>
                                                    <span>{likes}</span>
                                                </div>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {!isUserAuthenticated().user && (
                            <div className="row text-center">
                                {likes === 1 ? (
                                    <p>{likes} ??loveku sa to p????i</p>
                                ) : (
                                    <p>{likes} ??udom sa to p????i</p>
                                )}
                            </div>
                        )}

                        <div className="row">
                            <Comments
                                className=""
                                postID={post._id}
                                comments={comments.reverse()}
                                updatedList={this.updateCommentList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
        // return (
        //     <div className="SINGLEPOST container-fluid">
        //         {/* <div className="row justify-content-center align-content-center align-items-center"></div> */}
        //         <div className="row d-flex justify-content-between align-content-center align-items-center">
        //             <div className="col-sm-12 col-xl-8 m-0 p-0 w100">
        //                 <Image
        //                     src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
        //                     alt=""
        //                     style={{
        //                         maxHeight: "90vh",
        //                         width: "100%",
        //                         objectFit: "contain",
        //                     }}
        //                     onError={(index) =>
        //                         (index.target.src = defaultPostIcon)
        //                     }
        //                     fluid
        //                 />
        //             </div>

        //             <div className="col-sm-12 col-xl-4 p-3 p-xl-5">
        //                 {isUserAuthenticated().user &&
        //                     isUserAuthenticated().user.role ===
        //                         "administrator" && (
        //                         <div className="card mb-3 text-center bg-light">
        //                             <div className="card-body">
        //                                 <h5 className="card-title">Admin</h5>
        //                                 <p className="text-danger">
        //                                     Edit/Delete as an Admin
        //                                 </p>
        //                                 <Link
        //                                     className="btn btn-raised btn-warning btn-sm mb-2"
        //                                     to={`/posts/edit/${post._id}`}
        //                                 >
        //                                     UPDATE POST
        //                                 </Link>
        //                                 <br />
        //                                 <button
        //                                     onClick={this.handleDelete}
        //                                     className="btn btn-raised btn-danger btn-sm"
        //                                 >
        //                                     DELETE POST
        //                                 </button>
        //                             </div>
        //                         </div>
        //                     )}

        //                 {isUserAuthenticated().user &&
        //                 post.postedBy &&
        //                 isUserAuthenticated().user._id === post.postedBy._id ? (
        //                     <div className="row">
        //                         <div className="col-12 col-lg-4 d-flex justify-content-center">
        //                             <div className="row">
        //                                 <div className="col-12 text-center mt-3 mt-xl-0">
        //                                     <img
        //                                         style={{
        //                                             height: "50px",
        //                                             width: "auto",
        //                                             aspectRatio: "1/1",
        //                                             objectFit: "cover",
        //                                             borderRadius: "128px",
        //                                             border: "0px solid black",
        //                                         }}
        //                                         className="image-thumbnail "
        //                                         src={profilePictureURL}
        //                                         onError={(index) =>
        //                                             (index.target.src =
        //                                                 defaultUserIcon)
        //                                         }
        //                                         alt={postedByUsername}
        //                                     />
        //                                 </div>
        //                                 <div className="col-12 text-center mb-3 mb-md-0">
        //                                     <Link to={postedByID}>
        //                                         {postedByUsername}
        //                                     </Link>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 mt-md-3 mt-xl-0">
        //                             <Link
        //                                 className="btn btn-raised btn-warning btn-sm"
        //                                 to={`/posts/edit/${post._id}`}
        //                             >
        //                                 UPDATE POST
        //                             </Link>
        //                         </div>
        //                         <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center mt-md-3 mt-xl-0">
        //                             <button
        //                                 onClick={this.handleDelete}
        //                                 className="btn btn-raised btn-danger btn-sm"
        //                             >
        //                                 DELETE POST
        //                             </button>
        //                         </div>
        //                     </div>
        //                 ) : (
        //                     <>
        //                         <div className="col-12 text-center">
        //                             <img
        //                                 style={{
        //                                     height: "50px",
        //                                     width: "auto",
        //                                     aspectRatio: "1/1",
        //                                     objectFit: "cover",
        //                                     borderRadius: "128px",
        //                                     border: "0px solid black",
        //                                 }}
        //                                 className="image-thumbnail "
        //                                 src={profilePictureURL}
        //                                 onError={(index) =>
        //                                     (index.target.src = defaultUserIcon)
        //                                 }
        //                                 alt={postedByUsername}
        //                             />
        //                         </div>

        //                         <div className="col-12 text-center">
        //                             <Link to={postedByID}>
        //                                 {postedByUsername}
        //                             </Link>
        //                         </div>
        //                     </>
        //                 )}

        //                 <hr />
        // <div className="likes mt-3">
        //     {likedByUser ? (
        //         <button
        //             className="btn btn-raised btn-sm btn-dark like-button"
        //             onClick={this.likeToggle}
        //         >
        //             {likeLoading ? (
        //                 <div>
        //                     <Spinner
        //                         className="mt-3"
        //                         animation="border"
        //                         role="status"
        //                         size="sm"
        //                     >
        //                         <span className="visually-hidden">
        //                             Loading...
        //                         </span>
        //                     </Spinner>
        //                 </div>
        //             ) : (
        //                 <div>
        //                     <FaHeart />
        //                     <span>{likes}</span>
        //                 </div>
        //             )}
        //         </button>
        //     ) : (
        //         <button
        //             className="btn btn-raised btn-sm btn-dark like-button"
        //             onClick={this.likeToggle}
        //         >
        //             {likeLoading ? (
        //                 <div>
        //                     <Spinner
        //                         className="mt-3"
        //                         animation="border"
        //                         role="status"
        //                         size="sm"
        //                     >
        //                         <span className="visually-hidden">
        //                             Loading...
        //                         </span>
        //                     </Spinner>
        //                 </div>
        //             ) : (
        //                 <div className="status-wrapper">
        //                     <span>
        //                         <FaHeart />
        //                     </span>
        //                     <span>{likes}</span>
        //                 </div>
        //             )}
        //         </button>
        //     )}
        // </div>
        //                 <hr />
        // <div className="post-info-scroll mt-3">
        //     <div className="row justify-content-left align-items-center exif">
        //         {!exifData ||
        //         !exifData.exif ||
        //         !exifData.image ||
        //         !exifData.image.Model ||
        //         !exifData.exif.LensModel ||
        //         !exifData.exif.FNumber ||
        //         !exifData.exif.FocalLength ||
        //         !exifData.exif.ExposureTime ||
        //         !exifData.exif.ISO ? (
        //             <div className="exif-error">
        //                 No EXIF data available
        //             </div>
        //         ) : (
        //             <>
        //                 <div className="exif-camera">
        //                     <span>
        //                         <img
        //                             src={cameraIcon}
        //                             alt=""
        //                             style={{
        //                                 height: "40px",
        //                                 width: "auto",
        //                             }}
        //                         />
        //                     </span>
        //                     <span>{exifData.image.Model}</span>
        //                 </div>
        //                 <div className="exif-lens">
        //                     <span>
        //                         <img
        //                             src={lensIcon}
        //                             alt=""
        //                             style={{
        //                                 height: "40px",
        //                                 width: "auto",
        //                             }}
        //                         />
        //                     </span>
        //                     <span>
        //                         {exifData.exif.LensModel}
        //                     </span>
        //                 </div>
        //                 <div className="exif-settings">
        //                     <span>
        //                         <img
        //                             src={settingsIcon}
        //                             alt=""
        //                             style={{
        //                                 height: "40px",
        //                                 width: "auto",
        //                             }}
        //                         />
        //                     </span>
        //                     <span>
        //                         {exifData.exif.FocalLength}mm
        //                     </span>
        //                     <span>
        //                         f/
        //                         {exifData.exif.FNumber}
        //                     </span>
        //                     <span>
        //                         1/
        //                         {1 / exifData.exif.ExposureTime}
        //                         s
        //                     </span>
        //                     <span>ISO {exifData.exif.ISO}</span>
        //                 </div>
        //             </>
        //         )}
        //     </div>
        //                     <hr />
        //                     <div className="row">
        //                         <h1 className="post-title text-break">
        //                             {post.title}
        //                         </h1>
        //                         <p className="post-body text-break">
        //                             {post.body}
        //                         </p>
        //                         <h6 className="post-created">
        //                             {new Date(post.created).toDateString()}
        //                         </h6>
        //                     </div>

        //                     <Comments
        //                         className=""
        //                         postID={post._id}
        //                         comments={comments.reverse()}
        //                         updatedList={this.updateCommentList}
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // );
    };

    render() {
        const { post, redirectToProfile } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/users/${post.postedBy._id}`} />;
        }
        return (
            <div className="container-fluid d-flex justify-content-center p-0 m-0">
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
