import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getPost } from "../controllers/posts";

import defaultPostIcon from "../images/defaultPostIcon.png";
import defaultUserIcon from "../images/defaultUserIcon.png";

class SinglePost extends Component {
    state = {
        post: "",
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
                            style={{ width: "100%" }}
                            onError={(index) =>
                                (index.target.src = defaultPostIcon)
                            }
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="row p-3">
                            <div className="col-sm-1">
                                <img
                                    style={{
                                        height: "50px",
                                        width: "auto",
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

                            <div className="col-sm-11">
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

            // <>
            //     <div className="row p-4">
            //         <div className="col-lg-9 m-0 p-0">
            //             <img
            //                 src={`${process.env.REACT_APP_API_URL}/posts/pfp/${post._id}`}
            //                 alt=""
            //                 style={{
            //                     objectFit: "contain",
            //                     height: "50vh",
            //                     width: "100%",
            //                 }}
            //                 onError={(index) =>
            //                     (index.target.src = defaultPostIcon)
            //                 }
            //             />
            //         </div>

            //         <div
            //             className="col-lg-3 p-4"
            //             style={{ borderLeft: "1px solid #212529" }}
            //         >
            //             <div className="row">
            //                 <div className="col-md-2 lead">
            //                     <img
            //                         style={{
            //                             height: "50px",
            //                             width: "auto",
            //                             borderRadius: "128px",
            //                             border: "0px solid black",
            //                         }}
            //                         className="image-thumbnail"
            //                         src={profilePictureURL}
            //                         onError={(index) =>
            //                             (index.target.src = defaultUserIcon)
            //                         }
            //                         alt={postedByUsername}
            //                     />
            //                 </div>

            //                 <div className="col-md-10">
            //                     <h4>
            //                         <Link to={postedByID}>
            //                             {postedByUsername}
            //                         </Link>
            //                     </h4>
            //                 </div>
            //                 <hr />
            //             </div>
            //             <div className="row">
            //                 <div className="col-md-12 lead">
            //                     <h4>{post.title}</h4>
            //                     {post.body}
            //                     <br />
            //                     <br />
            //                     <h6>{new Date(post.created).toDateString()}</h6>
            //                 </div>
            //                 <hr />
            //             </div>
            //             <div className="row">
            //                 <div className="col-md-12 lead">EXIF INFO?</div>
            //                 <hr />
            //             </div>
            //             <div className="row">
            //                 <div className="col-md-12 lead">
            //                     👍 👎 💬
            //                     <br />
            //                     Liked by....
            //                 </div>
            //                 <hr />
            //             </div>
            //         </div>
            //     </div>
            //     <div className="row">
            //         <div className="col-md-12">
            //             Lorem ipsum dolor sit amet consectetur adipisicing elit.
            //             Iste quod quaerat perferendis, ex cum fugiat velit
            //             officia molestias. Dolores inventore iusto fuga odit
            //             veritatis aperiam cupiditate ducimus consectetur
            //             molestiae illo.
            //         </div>
            //     </div>
            // </>
        );
    };

    render() {
        const { post } = this.state;
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
