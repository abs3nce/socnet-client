import React, { Component } from "react";
import { getUsers } from "../controllers/users";
import DefaultProfilePicture from "../images/defaultUserIcon.png";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    getUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = (users) => (
    <div className="row text-center d-flex justify-content-center">
      {users.map((user, index) => (
        <div className="card col-md-3 m-3" key={index}>
          <img
            style={{ height: "200px", width: "auto", objectFit: "cover"}}
            className="image-thumbnail"
            src={`${process.env.REACT_APP_API_URL}/users/pfp/${user._id}`}
            onError={index => (index.target.src = DefaultProfilePicture)}
            alt={user.username}
          />
          <div className="card-body">
            <h5 className="card-title">{user.username}</h5>
            <p className="card-text">{user.email}</p>
            <Link
              to={`/user/${user._id}`}
              className="btn btn-raised btn-primary btn-sm"
            >
              View profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users } = this.state;

    return (
      <>
        <div className="bg-light p-5">
          <h2>Discover</h2>
          <p className="lead">Users will be displayed here</p>
        </div>
        <div className="container">{this.renderUsers(users)}</div>
      </>
    );
  }
}
export default Users;
