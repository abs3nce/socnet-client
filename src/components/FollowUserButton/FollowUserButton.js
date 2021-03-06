import React, { Component } from "react";

import { followUser, unfollowUser } from "../../controllers/users";

class FollowUserButton extends Component {
    followClicked = () => {
        this.props.onButtonClick(followUser);
    };

    unfollowClicked = () => {
        this.props.onButtonClick(unfollowUser);
    };

    render() {
        return !this.props.following ? (
            <button
                onClick={this.followClicked}
                className="btn btn-success button-raised w-100"
            >
                Sledovať
            </button>
        ) : (
            <button
                onClick={this.unfollowClicked}
                className="btn btn-danger button-raised w-100"
            >
                Prestať sledovať
            </button>
        );
    }
}

export default FollowUserButton;
