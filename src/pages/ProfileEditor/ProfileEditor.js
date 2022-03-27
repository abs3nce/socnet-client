import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { isUserAuthenticated } from "../../controllers/auth";
import {
    getUser,
    updateUser,
    updateUserCredentials,
} from "../../controllers/users";

import defaultProfilePicture from "../../images/defaultUserIcon.png";

import Spinner from "react-bootstrap/Spinner";

class EditUserProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            username: "",
            email: "",
            password: "",
            description: "",
            facebookLink: "",
            instagramLink: "",
            customLink: "",
            role: "",

            fileSize: 0,
            redirectToProfile: false,

            error: "",
            loading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this); //zistit ako toto funguje
    }

    componentDidMount() {
        this.userData = new FormData();
        const userID = this.props.match.params.userID;
        this.init(userID);
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" });
        //handle formu
        //pokial sa vyplnil aj input obrazku tak hned ako to tato funkcia zisti tak nahra tento obrazok do event.target.file[0],
        //ak nie tak zoberie ostatne udaje a ulozi ich ako value
        //nasledne zaplnime userData objekt udajmi podla ich mena a hodnoty, cize username a jeho hodnota, email a jeho hodnota....
        const value =
            name === "profilePicture"
                ? event.target.files[0]
                : event.target.value;

        const fileSize =
            name === "profilePicture" ? event.target.files[0].size : 0;
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize: fileSize });
    };

    init = (userID) => {
        getUser(userID).then((data) => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
                console.log(data.error);
            } else {
                console.log(`> USER LOADED (EDITOR): `, data);
                this.setState({
                    id: data._id,
                    username: data.username,
                    email: data.email,
                    error: "",
                    description: data.description,
                    facebookLink: data.facebookLink,
                    instagramLink: data.instagramLink,
                    customLink: data.customLink,
                });
                if (
                    !(
                        isUserAuthenticated().user._id === this.state.id ||
                        isUserAuthenticated().user.role === "administrator"
                    )
                ) {
                    this.setState({ redirectToProfile: true });
                }
            }
        });
    };

    isInputValid = () => {
        const { username, email, password, fileSize } = this.state;

        if (fileSize > 5000000) {
            this.setState({
                error: "Maximálna veľkosť fotografie je 5MB",
                loading: false,
            });
            return false;
        }

        if (username.length === 0) {
            this.setState({
                error: "Meno nemôže byť prázdne",
                loading: false,
            });
            return false;
        }
        if (username.length > 0 && username.length <= 2) {
            this.setState({
                error: "Meno musí byť aspoň 3 písmená dlhé",
                loading: false,
            });
            return false;
        }
        if (username.length > 32) {
            this.setState({
                error: "Meno môže byť maximálne32 písmen dlhé",
                loading: false,
            });
            return false;
        }

        if (email.length === 0) {
            this.setState({
                error: "Email nemôže byť prázdny",
                loading: false,
            });
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            //https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript validacia mailu pomocou regex
            this.setState({ error: "Email musí mať validný tvar", loading: false });
            return false;
        }

        if (password.length > 0 && password.length <= 7) {
            this.setState({
                error: "Heslo musí byť aspoň 8 znakov dlhé",
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
            const userID = this.props.match.params.userID;
            const token = isUserAuthenticated().token;

            updateUser(userID, token, this.userData).then((data) => {
                if (data.error) {
                    this.setState({ error: data.error });
                    this.setState({ loading: false });
                } else {
                    updateUserCredentials(data, () => {
                        this.setState({
                            redirectToProfile: true,
                        });
                    });
                }
            });
        }
    }

    loadEditProfileForm = (
        username,
        email,
        password,
        description,
        facebookLink,
        instagramLink,
        customLink
    ) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Profilová fotografia</label>
                <input
                    onChange={this.handleChange("profilePicture")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <br />

            <div className="form-group">
                <label className="text-muted">Meno</label>
                <input
                    onChange={this.handleChange("username")}
                    type="text"
                    className="form-control"
                    value={username}
                    placeholder="Napíšte vaše meno"
                />
            </div>
            <br />

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                    placeholder="Napíšte váš email"
                />
            </div>
            <br />

            <div className="form-group">
                <label className="text-muted">Popisok</label>
                <textarea
                    onChange={this.handleChange("description")}
                    type="text"
                    className="form-control"
                    value={description}
                    placeholder="Napíšte niečo o sebe"
                />
            </div>
            <br />

            <div className="form-group">
                <label className="text-muted">URL na Facebook profil</label>
                <input
                    onChange={this.handleChange("facebookLink")}
                    type="text"
                    className="form-control"
                    value={facebookLink}
                    placeholder="napr.: https://www.facebook.com/profile.php?id=21381823798"
                />
            </div>
            <br />

            <div className="form-group">
                <label className="text-muted">URL na Instagram profil</label>
                <input
                    onChange={this.handleChange("instagramLink")}
                    type="text"
                    className="form-control"
                    value={instagramLink}
                    placeholder="napr.: https://www.instagram.com/bob.harvey/"
                />
            </div>
            <br />

            <div className="form-group">
                <label className="text-muted">Vlastná URL</label>
                <input
                    onChange={this.handleChange("customLink")}
                    type="text"
                    className="form-control"
                    value={customLink}
                    placeholder="napr.: https://www.bobandmartin.com"
                />
            </div>
            <br />

            <div className="form-group">
                <label className="text-muted">Heslo</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <br />

            <button
                onClick={this.handleSubmit}
                className="btn btn-raised btn-primary mt-3 mb-3"
            >
                {!this.state.error ? "Aktualizovať údaje" : this.state.error}
            </button>
        </form>
    );

    render() {
        const {
            username,
            id,
            email,
            password,
            description,
            redirectToProfile,
            loading,
            role,
            facebookLink,
            instagramLink,
            customLink,
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/users/${id}`} />;
        }

        const profilePictureURL = id
            ? `${
                  process.env.REACT_APP_API_URL
              }/users/pfp/${id}?${new Date().getTime()}`
            : defaultProfilePicture;

        return (
            <div className="container mt-5">
                {/* <h2 className="mt-5 mb-5">Edit {username}'s Profile</h2> */}
                <div className="row">
                    <div className="col-12 col-md-3 d-flex justify-content-center flex-column">
                        <img
                            style={{
                                height: "200px",
                                width: "auto",
                                objectFit: "contain",
                            }}
                            className="image-thumbnail mb-3"
                            src={profilePictureURL}
                            onError={(index) =>
                                (index.target.src = defaultProfilePicture)
                            }
                            alt={username}
                        />
                    </div>
                    <div className="col-12 col-md-9">
                        {this.loadEditProfileForm(
                            username,
                            email,
                            password,
                            description,
                            facebookLink,
                            instagramLink,
                            customLink
                        )}
                    </div>
                </div>{" "}
                {loading ? (
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

export default EditUserProfile;
