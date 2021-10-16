import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import { isUserAuthenticated } from "../controllers/auth";
import { getUser } from "../controllers/users";

import DefaultProfilePicture from "../images/defaultUserIcon.png";
// import DefaultProfileBanner from "../images/defaultUserBanner.jpeg";

import DeleteUserButton from "../components/DeleteUserButton";

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
    getUser(userID).then((data) => {
      if (data.error) {
        this.setState({ redirectToLogin: true });
      } else {
        console.log(`> USER LOADED (PROFILE): `,data);
        this.setState({ user: data });
      }
    });
  };

  componentDidMount() {
    const userID = this.props.match.params.userID;
    this.init(userID);
  }

  componentWillReceiveProps(props) {
    //pri prechode na iny profile sa zmeni aj jeho obsah
    const userID = props.match.params.userID;
    this.init(userID);
  }

  render() {
    const { redirectToLogin, user } = this.state;
    if (redirectToLogin) return <Redirect to="/login" />;

    return (
      <>
        {/* <div className="row">
          <div className="col-sm-12 banner">
            <img
              src={DefaultProfileBanner}
              className=""
              alt=""
              style={{
                width: "100%",
                position: "relative",
              }}
            />
          </div>
        </div> */}

        <div className="container">
          <div className="row mt-3">
            <div className="col-sm-12 text-center">
              <img
                src={DefaultProfilePicture}
                className="card-img-top"
                alt={`${user.username}'s avatar`}
                style={{ width: "25%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-center mt-3">
              <h2 className="">{user.username}</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <div className="lead mt-3">
                <p>Email is {user.email}</p>
                <p>
                  {" "}
                  {`Registered on ${new Date(user.created).toDateString()}`}
                </p>
                <p>{`Has been a member for ${this.registeredFor(
                  user.created
                )} days`}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              {isUserAuthenticated().user &&
                isUserAuthenticated().user._id === user._id && (
                  <div className="row justify-content-center">
                    <div className="col-sm-3 text-center">
                      <Link
                        className="btn btn-raised btn-success"
                        to={`/user/edit/${user._id}`}
                      >
                        EDIT PROFILE
                      </Link>
                    </div>
                    <div className="col-sm-3 text-center">
                      <DeleteUserButton userID={user._id} />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Profile;
