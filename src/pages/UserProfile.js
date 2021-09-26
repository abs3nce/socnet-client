import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import { isUserAuthenticated } from "../controllers/auth/auth";
import { getUser } from "../controllers/data/users";

import DefaultProfilePicture from "../images/defaultUserIcon.png";
import DefaultProfileBanner from "../images/defaultUserBanner.jpeg";

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
      // <div className="container">
      //   <div className="row">
      //     <div className="col-md-6 text-center">
      //       <h2 className="mt-5 mb-5">{user.username}'s profile page</h2>
      //     </div>
      //     <div className="col-md-6 d-flex align-items-center">
      //       {isUserAuthenticated().user && isUserAuthenticated().user._id === user._id && (
      //         <div className="row d-flex justify-content-center">
      //           <div className="col-md-5">
      //             <Link
      //               className="btn btn-raised btn-success"
      //               to={`/user/edit/${user._id}`}
      //             >
      //               EDIT PROFILE
      //             </Link>
      //           </div>
      //           <div className="col-md-5">
      //             <button className="btn btn-raised btn-danger">
      //               DELETE PROFILE
      //             </button>
      //           </div>
      //         </div>
      //       )}
      //     </div>
      //   </div>
      //   <div className="row d-flex justify-content-evenly">
      //     <div className="col-md-6">
      //       <img
      //         src={DefaultProfilePicture}
      //         className="card-img-top"
      //         alt={`${user.username}'s avatar`}
      //         style={{ width: "100%", height: "15vw", objectFit: "cover" }}
      //       />
      //     </div>
      //     <div className="col-md-6 d-flex align-items-center">
      //       <div className="lead">
      //         <p>Hello {user.username}</p>
      //         <p>Email is {user.email}</p>

      //         <p> {`Registered on ${new Date(user.created).toDateString()}`}</p>
      //         <p>{`Has been a member for ${this.registeredFor(
      //           user.created
      //         )} days`}</p>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <>
        <div className="row">
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
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <img
                src={DefaultProfilePicture}
                className="card-img-top"
                alt={`${user.username}'s avatar`}
                style={{ width: "33%", height: "auto", objectFit: "cover" }}
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
                      <DeleteUserButton></DeleteUserButton>
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
