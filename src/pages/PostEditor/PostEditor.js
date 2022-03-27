import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { getPost, updatePost } from "../../controllers/posts";
import { isUserAuthenticated } from "../../controllers/auth";

import defaultPostIcon from "../../images/defaultPostIcon.png";

import Spinner from "react-bootstrap/Spinner";

class PostEditor extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            body: "",
            postedById: null,

            redirectToProfile: false,
            redirectToHome: false,
            error: "",
            fileSize: 0,
            loading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this); //zistit ako toto funguje
    }

    componentDidMount() {
        this.postData = new FormData();
        const postID = this.props.match.params.postID;
        this.init(postID);
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" });
        //handle formu
        //pokial sa vyplnil aj input obrazku tak hned ako to tato funkcia zisti tak nahra tento obrazok do event.target.file[0],
        //ak nie tak zoberie ostatne udaje a ulozi ich ako value
        //nasledne zaplnime userData objekt udajmi podla ich mena a hodnoty, cize username a jeho hodnota, email a jeho hodnota....
        const value =
            name === "image" ? event.target.files[0] : event.target.value;

        const fileSize = name === "image" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize: fileSize });
    };

    init = (postID) => {
        getPost(postID).then((data) => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
                console.log(data.error);
            } else {
                console.log(`POST LOADED (EDITOR): `, data);
                this.setState({
                    id: data._id,
                    title: data.title,
                    body: data.body,
                    error: "",
                    posterId: data.postedBy._id,
                });
            }
            if (
                !(
                    isUserAuthenticated().user.role === "administrator" ||
                    isUserAuthenticated().user._id === this.state.posterId
                )
            ) {
                this.setState({ redirectToHome: true });
            }
        });
    };

    isInputValid = () => {
        const { fileSize, title, body } = this.state;

        if (fileSize > 10000000) {
            this.setState({
                error: "Maximal size of an image is 10 MB",
                loading: false,
            });
            return false;
        }

        if (title.length === 0) {
            this.setState({
                error: "Title must not be empty",
                loading: false,
            });
            return false;
        }
        if (title.length < 8) {
            this.setState({
                error: "Title must be atlease 8 characters long",
                loading: false,
            });
            return false;
        }
        if (title.length > 150) {
            this.setState({
                error: "Title must be maximum 150 characters long",
                loading: false,
            });
            return false;
        }

        if (body.length < 8) {
            this.setState({
                error: "The minimum length of body is 8 characters",
                loading: false,
            });
            return false;
        }
        if (body.length > 1500) {
            this.setState({
                error: "The maximum length of body is 1500 characters",
                loading: false,
            });
            return false;
        }

        return true;
    };

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });

        if (this.isInputValid()) {
            const postID = this.state.id;
            const token = isUserAuthenticated().token;

            updatePost(postID, token, this.postData).then((data) => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    this.setState({
                        redirectToProfile: true,
                    });
                }
            });
        }
    }

    loadEditPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Fotografia príspevku</label>
                <input
                    onChange={this.handleChange("image")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <br />

            <div className="form-group">
                <label className="text-muted">Názov</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                    placeholder="Aký je názov tohto príspevku?"
                />
            </div>
            <br />

            <div className="form-group">
                <label className="text-muted">Popisok</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                    placeholder="Napíš niečo o príspevku"
                />
            </div>
            <br />

            <button
                onClick={this.handleSubmit}
                className="btn btn-raised btn-primary mt-3 mb-3 w-100"
            >
                Aktualizovať príspevok
            </button>
        </form>
    );

    render() {
        let {
            title,
            body,
            id,
            redirectToProfile,
            loading,
            error,
            redirectToHome,
        } = this.state;

        const postPictureURL = id
            ? `${
                  process.env.REACT_APP_API_URL
              }/posts/pfp/thumb/${id}?${new Date().getTime()}`
            : defaultPostIcon;

        if (redirectToProfile) {
            return <Redirect to={`/posts/${id}`} />;
        }

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit {title}</h2>
                <img
                    style={{ height: "200px", width: "auto" }}
                    className="image-thumbnail mb-5"
                    src={postPictureURL}
                    onError={(index) => (index.target.src = defaultPostIcon)}
                    alt={title}
                />{" "}
                {/* {isUserAuthenticated().user.role === "administrator" ||
                isUserAuthenticated().user._id === posterId
                    ? this.loadEditPostForm(title, body)
                    : ""} */}
                {this.loadEditPostForm(title, body)}
                <div
                    style={{ display: error ? "" : "none" }}
                    className="alert alert-danger mt-3"
                >
                    {error}
                </div>
                <div className="row d-flex justify-content-center text-center">
                    {loading ? (
                        <Spinner
                            className="mt-3 mb-3"
                            animation="border"
                            role="status"
                            variant="primary"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}
export default PostEditor;
