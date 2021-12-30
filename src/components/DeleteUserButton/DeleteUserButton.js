import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { deleteUser } from "../../controllers/users";
import { isUserAuthenticated, logoutUser } from "../../controllers/auth";

class DeleteUser extends Component {
    state = {
        redirect: false,
        error: "",
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

        deleteUser(userID, token).then((data) => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error });
            } else {
                if (!isUserAuthenticated().user.role === "administrator") {
                    logoutUser(() => {
                        console.log(`> USER PROFILE DELETED`);
                    });
                }
                this.setState({ redirectToHome: true });
            }
        });
    };

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <button
                    onClick={this.confirmDeletion}
                    className="btn btn-raised btn-danger"
                >
                    {!this.state.error ? "DELETE PROFILE" : this.state.error}

                    {/* <div
                        style={{ display: this.state.error ? "" : "none" }}
                        className="alert alert-danger mt-3"
                    >
                        
                    </div> */}
                </button>
            </div>
        );
    }
}

export default DeleteUser;
