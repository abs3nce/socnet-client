import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { deleteUserAccount } from "../controllers/users";
import { isUserAuthenticated, logoutUser } from "../controllers/auth";

class DeleteUser extends Component {
  state = {
    redirect: false,
  };

  confirmDeletion = () => {
    let userInput = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (userInput) {
      this.deletionConfirmed();
    }
  };

  deletionConfirmed = () => {
    const token = isUserAuthenticated().token;
    const userID = this.props.userID;

    deleteUserAccount(userID, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        logoutUser(() => {
          console.log(`> USER PROFILE DELETED`);
        });
        this.setState({ redirect: true });
      }
    });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <button
          onClick={this.confirmDeletion}
          className="btn btn-raised btn-danger"
        >
          DELETE PROFILE
        </button>
      </div>
    );
  }
}

export default DeleteUser;
