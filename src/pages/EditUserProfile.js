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
    const userID = this.props.match.params.userID;
    this.init(userID);
  }

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

  handleChange = (name) => (event) => {
    //ukladanie udajov z formu >> ak je to event z username tak this.state.username nadobudne hodnotu username z inputu a podobne
    this.setState({ [name]: event.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();

    //vytvorenie usera
    const { username, email, password } = this.state;
    const user = {
      username,
      email,
      password,
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

  loadEditProfileForm = (username, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Username</label>
        <input
          onChange={this.handleChange("username")}
          type="text"
          className="form-control"
          value={username}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <button
        onClick={this.handleSubmit}
        className="btn btn-raised btn-primary mt-3"
      >
        Update credentials
      </button>
    </form>
  );

  render() {
    const { username, id, email, password, redirectToProfile } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit User Profile</h2>

        {this.loadEditProfileForm(username, email, password)}
      </div>
    );
  }
}

export default EditUserProfile;
