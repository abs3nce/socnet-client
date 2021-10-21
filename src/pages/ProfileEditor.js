import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { isUserAuthenticated } from "../controllers/auth";
import {
  getUser,
  updateUser,
  updateUserCredentials,
} from "../controllers/users";

import defaultProfilePicture from "../images/defaultUserIcon.png";

class EditUserProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      username: "",
      email: "",
      password: "",
      description: "",

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
      name === "profilePicture" ? event.target.files[0] : event.target.value;

    const fileSize = name === "profilePicture" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize: fileSize });
  };

  init = (userID) => {
    getUser(userID).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        console.log(`> USER LOADED (EDITOR): `, data);
        this.setState({
          id: data._id,
          username: data.username,
          email: data.email,
          error: "",
          description: data.description,
        });
      }
    });
  };

  isInputValid = () => {
    const { username, email, password, fileSize } = this.state;

    if (fileSize > 100000) {
      this.setState({ error: "Maximum file size is 100kB", loading: false });
      return false;
    }

    if (username.length === 0) {
      this.setState({ error: "Username must not be empty", loading: false });
      return false;
    }
    if (username.length > 0 && username.length <= 2) {
      this.setState({
        error: "Username must be atlease 3 characters long",
        loading: false,
      });
      return false;
    }
    if (username.length > 25) {
      this.setState({
        error: "Username must be maximum 25 characters long",
        loading: false,
      });
      return false;
    }

    if (email.length === 0) {
      this.setState({ error: "Email must not be empty", loading: false });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      //https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript validacia mailu pomocou regex
      this.setState({ error: "Email must be valid", loading: false });
      return false;
    }

    if (password.length > 0 && password.length <= 7) {
      this.setState({
        error: "Password must be at least 8 characters long",
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
        if (data.error) this.setState({ error: data.error });
        else {
          updateUserCredentials(data, () => {
            this.setState({
              redirectToProfile: true,
            });
          });
        }
      });
    }
  }

  loadEditProfileForm = (username, email, password, description) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Profile Photo</label>
        <input
          onChange={this.handleChange("profilePicture")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <br />

      <div className="form-group">
        <label className="text-muted">Username</label>
        <input
          onChange={this.handleChange("username")}
          type="text"
          className="form-control"
          value={username}
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
        />
      </div>
      <br />

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={this.handleChange("description")}
          type="text"
          className="form-control"
          value={description}
        />
      </div>
      <br />

      <div className="form-group">
        <label className="text-muted">Password</label>
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
        className="btn btn-raised btn-primary mt-3"
      >
        Update credentials
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
      error,
      loading,
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
      <div className="container">
        <h2 className="mt-5 mb-5">Edit {username}'s Profile</h2>
        <img
          style={{ height: "200px", width: "auto" }}
          className="image-thumbnail"
          src={profilePictureURL}
          onError={(index) => (index.target.src = defaultProfilePicture)}
          alt={username}
        />{" "}
        <br />
        <br />
        {this.loadEditProfileForm(username, email, password, description)}
        <div
          style={{ display: error ? "" : "none" }}
          className="alert alert-danger mt-3"
        >
          {error}
        </div>
        {loading ? (
          <div className="lead mt-3">
            <p>Loading...</p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default EditUserProfile;
