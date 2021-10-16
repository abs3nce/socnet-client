import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { isUserAuthenticated } from "../controllers/auth";
import { getUser, updateUser } from "../controllers/users";

class EditUserProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      username: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this); //zistit ako toto funguje
  }

  componentDidMount() {
    this.userData = new FormData();
    const userID = this.props.match.params.userID;
    this.init(userID);
  }

  handleChange = (name) => (event) => {
    //ukladanie udajov z formu >> ak je to event z username tak this.state.username nadobudne hodnotu username z inputu a podobne
    this.setState({ [name]: event.target.value });
  };

  init = (userID) => {
    getUser(userID).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        console.log(data);
        this.setState({
          id: data._id,
          username: data.username,
          email: data.email,
        });
      }
    });
  };

  isInputValid = () => {
    const { username, email, password } = this.state;

    if (username.length === 0) {
      this.setState({ error: "Username must not be empty" });
      return false;
    }
    if (username.length > 0 && username.length <= 2) {
      this.setState({ error: "Username must be atlease 3 characters long" });
      return false;
    }
    if (username.length > 25) {
      this.setState({ error: "Username must be maximum 25 characters long" });
      return false;
    }

    if (email.length === 0) {
      this.setState({ error: "Email must not be empty" });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      //https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript validacia mailu pomocou regex
      this.setState({ error: "Email must be valid" });
      return false;
    }

    if (password.length > 0 && password.length <= 7) {
      this.setState({ error: "Password must be at least 8 characters long" });
      return false;
    }
    return true;
  };

  handleSubmit(e) {
    e.preventDefault();

    if (this.isInputValid()) {
      //vytvorenie usera
      const { username, email, password } = this.state;
      const user = {
        username,
        email,
        password: password || undefined,
      };

      console.log(`> UPDATE FORM data: `, user);

      const userID = this.props.match.params.userID;
      const token = isUserAuthenticated().token;

      updateUser(userID, token, user).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            redirectToProfile: true,
          });
        }
      });
    }
  }

  loadEditProfileForm = (username, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Profile Image</label>
        <input
          onChange={this.handleChange("profileImage")}
          type="file"
          className="form-control"
          accept="image/*"
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
    const { username, id, email, password, redirectToProfile, error } =
      this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit User Profile</h2>

        {this.loadEditProfileForm(username, email, password)}

        <div
          style={{ display: error ? "" : "none" }}
          className="alert alert-danger mt-3"
        >
          {error}
        </div>
      </div>
    );
  }
}

export default EditUserProfile;
