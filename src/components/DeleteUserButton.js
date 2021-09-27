import React, { Component } from "react";

import { deleteUserAccount } from "../controllers/data/deletion";
import { isUserAuthenticated } from "../controllers/auth/auth";

class DeleteUser extends Component {
  confirmDeletion = () => {
    let userInput = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (userInput) {
      this.deleteUserAccount();
    }
  };

  deleteUserAccount = () => {
    const token = isUserAuthenticated().token;

    // removeUser()
  };

  render() {
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
