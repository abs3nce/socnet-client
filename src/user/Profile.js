import React, { Component } from "react";
import { Redirect } from "react-router";
import { isAuthenticated } from "../auth/";
import { read } from "./apiController";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToLogin: false,
    };
  }

  registeredFor(registeredDate) {
    let duration = new Date() - new Date(registeredDate);
    return Math.floor(duration / (1000 * 60 * 60 * 24));
  }

  init = (userID) => {
    const token = isAuthenticated().token;
    read(userID, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToLogin: true });
      } else {
        console.log(data);
        this.setState({ user: data });
      }
    });
  };

  componentDidMount() {
    const userID = this.props.match.params.userID;
    this.init(userID);
  }

  render() {
    const redirectToLogin = this.state.redirectToLogin;
    if (redirectToLogin) return <Redirect to="/login" />;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile Page</h2>
        <p>Hello {isAuthenticated().user.username}</p>
        <p>Email is {isAuthenticated().user.email}</p>
        <p>
          {" "}
          {`Registered on ${new Date(this.state.user.created).toDateString()}`}
        </p>
        <p>{`Has been a member for ${this.registeredFor(
          this.state.user.created
        )} days`}</p>
      </div>
    );
  }
}
export default Profile;
