import React, { Component } from "react";
import { getUser } from "../../controllers/users";
import { Link } from "react-router-dom";
import DefaultProfilePicture from "../../images/defaultUserIcon.png";

class Follows extends Component {
    constructor() {
        super();

        this.state = {
            users: [],
            targetUser: "",
        };
    }
    componentDidMount() {
        const userID = this.props.match.params.userid;
        getUser(userID).then((data) => {
            if (data.error) {
                this.setState({ redirectToLogin: true });
                console.log(data.error);
            } else {
                console.log(`> LOADED FOLLOWERS OF USER: `, data.following);
                this.setState({
                    users: data.following,
                    targetUser: data.username,
                });
            }
        });
    }

    render() {
        const { users, targetUser } = this.state;
        return (
            <div className="container">
                {users.length ? <div className="row justify-content-center my-3">
                   {targetUser} sleduje:
                </div> : ""}
                {users.length ? (
                    users.map((user, index) => (
                        <div
                            key={user._id}
                            id="card-row"
                            className="DISCOVER row shadow-lg p-2 mb-3 bg-body rounded mx-3"
                        >
                            <div
                                className="d-md-flex"
                                to={`/users/${user._id}`}
                            >
                                <div className="text-center col-12 col-md-1 d-flex align-items-center justify-content-center">
                                    <img
                                        style={{
                                            height: "auto",
                                            aspectRatio: "1/1",
                                            width: "50%",
                                            objectFit: "cover",
                                            borderRadius: "128px",
                                        }}
                                        className="image-thumbnail"
                                        src={`${process.env.REACT_APP_API_URL}/users/pfp/${user._id}`}
                                        onError={(index) =>
                                            (index.target.src =
                                                DefaultProfilePicture)
                                        }
                                        alt={user.username}
                                    />
                                </div>

                                <div className="col-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start">
                                    {user.username}
                                </div>

                                <div className="col-12 col-md-8 d-flex align-items-center justify-content-center justify-content-md-end">
                                    <div className="btn btn-raised btn-primary">
                                        <Link to={`/users/${user._id}`}>
                                            Prejs?? na profil
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="container">
                        <div className="row justify-content-center mt-3">
                            {targetUser} nikoho nesleduje
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
export default Follows;
