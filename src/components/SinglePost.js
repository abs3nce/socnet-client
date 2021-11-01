import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { getPost, deletePost } from "../controllers/posts";
import { isUserAuthenticated } from "../controllers/auth";

import defaultPostIcon from "../images/defaultPostIcon.png";
import defaultUserIcon from "../images/defaultUserIcon.png";

class SinglePost extends Component {
    state = {
        post: "",
        redirectToProfile: false,
    };

    componentDidMount = () => {
        const postID = this.props.match.params.postID;
        getPost(postID).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ post: data });
            }
        });
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

        return (
            <>
                <div className="row">
                    <div className="col-sm-12 m-0 p-0">
                        <img
                            src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
                            alt=""
                            style={{
                                height: "80vh",
                                width: "100%",
                                objectFit: "contain",
                            }}
                            onError={(index) =>
                                (index.target.src = defaultPostIcon)
                            }
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="row p-3">
                            <div className="col-sm-2">
                                <img
                                    style={{
                                        height: "50px",
                                        width: "auto",
                                        aspectRatio: "1/1",
                                        objectFit: "cover",
                                        borderRadius: "128px",
                                        border: "0px solid black",
                                    }}
                                    className="image-thumbnail"
                                    src={profilePictureURL}
                                    onError={(index) =>
                                        (index.target.src = defaultUserIcon)
                                    }
                                    alt={postedByUsername}
                                />
                            </div>

                            <div className="col-sm-10">
                                <h4>
                                    <Link to={postedByID}>
                                        {postedByUsername}
                                    </Link>
                                </h4>
                            </div>

                            <div className="exif">
                                <h4>EXIF</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsa quidem laudantium,
                                    eaque vel ratione, odio commodi sint
                                    praesentium perferendis quam fugit est nam
                                    dolorem veritatis iste, natus officia optio
                                    blanditiis accusamus impedit quos tenetur.
                                    Unde, soluta amet numquam perferendis sed
                                    est quas illum voluptatibus eum, impedit
                                    quibusdam animi ad dolorem fugit. Id rerum
                                    nam velit dicta labore dolor atque illum
                                    necessitatibus et! Nam ea laborum cum
                                    dolores officiis vel, odio, nisi mollitia
                                    eos illo quam alias ab soluta velit fuga et
                                    aut minima! Molestiae quas repudiandae illo
                                    alias molestias quae doloribus suscipit rem
                                    tenetur similique voluptatum officia id,
                                    inventore cumque.
                                </p>
                            </div>
                            <div className="buttons">
                                {isUserAuthenticated().user &&
                                    isUserAuthenticated().user._id ===
                                        post.postedBy._id && (
                                        <div className="row justify-content-center">
                                            <div className="col-sm-2 text-center">
                                                <Link
                                                    className="btn btn-raised btn-warning btn-sm"
                                                    to={`/posts/edit/${post._id}`}
                                                >
                                                    UPDATE POST
                                                </Link>
                                            </div>
                                            <div className="col-sm-2 text-center">
                                                <button
                                                    onClick={this.handleDelete}
                                                    className="btn btn-raised btn-danger btn-sm"
                                                >
                                                    DELETE POST
                                                </button>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                        <div className="row">
                            <h1 className="">{post.title}</h1>
                        </div>
                        <div className="row">
                            <p className="">{post.body}</p>
                        </div>
                        <h6 className="">
                            {new Date(post.created).toDateString()}
                        </h6>
                    </div>
                </div>
            </>
        );
    };

    render() {
        const { post, redirectToProfile } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/users/${post.postedBy._id}`} />;
        }
        return (
            <div className="container-fluid lead">
                {!post ? (
                    <div className="lead mt-3">
                        <p>Loading...</p>
                    </div>
                ) : (
                    this.renderPost(post)
                )}
            </div>
        );
    }
}

export default SinglePost;
