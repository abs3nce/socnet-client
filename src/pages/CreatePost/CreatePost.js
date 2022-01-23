import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { isUserAuthenticated } from "../../controllers/auth";
import { createPost } from "../../controllers/posts";

import Spinner from "react-bootstrap/Spinner";

class CreatePost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            image: "",
            error: "",
            user: {},

            loading: false,
            redirectToProfile: false,
            redirectToLogin: false,
            fileSize: 0,
        };
        this.handleSubmit = this.handleSubmit.bind(this); //zistit ako toto funguje
    }

    componentDidMount() {
        if (!isUserAuthenticated()) {
            this.setState({ redirectToLogin: true });
        }

        this.postData = new FormData();
        this.setState({ user: isUserAuthenticated().user });
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
            const userID = isUserAuthenticated().user._id;
            const token = isUserAuthenticated().token;

            createPost(userID, token, this.postData).then((data) => {
                if (data?.error) {
                    this.setState({ error: data.error });
                } else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        image: "",
                        redirectToProfile: true,
                    });
                }
            });
        }
    }

    loadCreatePostForm = (title, body) => (
        <form className="mt-3">
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
                    placeholder="Ako sa táto fotografia volá?"
                />
            </div>
            <br />

            <div className="form-group">
                <label className="text-muted">Popis</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                    placeholder="Niečo o fotografií"
                />
            </div>
            <br />

            <button
                onClick={this.handleSubmit}
                className="btn btn-raised btn-primary"
            >
                Nahrať
            </button>
        </form>
    );

    render() {
        const {
            title,
            body,
            user,
            error,
            loading,
            redirectToProfile,
            redirectToLogin,
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/users/${user._id}`} />;
        }

        if (redirectToLogin) {
            return <Redirect to={`/login`} />;
        }

        return (
            <div className="container">
                {this.loadCreatePostForm(title, body)}
                <div
                    style={{ display: error ? "" : "none" }}
                    className="alert alert-danger mt-3"
                >
                    {error}
                </div>
                {loading && !error ? (
                    <Spinner
                        className="mt-3"
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
        );
    }
}

export default CreatePost;
