import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
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
    const { redirectToLogin, user } = this.state;
    if (redirectToLogin) return <Redirect to="/login" />;

    return (
      <div className="container">
        <div className="row">
          <h2 className="mt-5 mb-5">Profile Page</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>Hello {isAuthenticated().user.username}</p>
            <p>Email is {isAuthenticated().user.email}</p>
            <p> {`Registered on ${new Date(user.created).toDateString()}`}</p>
            <p>{`Has been a member for ${this.registeredFor(
              user.created
            )} days`}</p>
          </div>
          <div className="col-md-6">
            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
              <div className="row text-center">
                <div className="col-md-6">
                  <Link
                    className="btn btn-raised btn-success"
                    to={`/user/edit/${user._id}`}
                  >
                    EDIT PROFILE
                  </Link>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-raised btn-danger">
                    DELETE PROFILE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
