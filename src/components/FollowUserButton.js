import React, { Component } from "react";

import { followUser, unfollowUser } from "../controllers/users";

class FollowUserButton extends Component {
    followClicked = () => {
        this.props.onButtonClick(followUser);
    };

    unfollowClicked = () => {
        this.props.onButtonClick(unfollowUser);
    };

    render() {
        return (
            <div className="row justify-content-center">
                {!this.props.following ? (
                    <div className="col-md-1">
                        <button
                            onClick={this.followClicked}
                            className="btn btn-success button-raised "
                        >
                            Follow
                        </button>
                    </div>
                ) : (
                    <div className="col-md-1">
                        <button
                            onClick={this.unfollowClicked}
                            className="btn btn-danger button-raised "
                        >
                            Unfollow
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default FollowUserButton;
