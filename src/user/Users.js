import React, { Component } from "react";
import { getUsers } from "./userAPIController";
import DefaultProfilePicture from '../images/icon.png'

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
    <div className="row">
      {users.map((user, index) => (
        <div className="card col-md-3" key={index}>
          <img src={DefaultProfilePicture} className="card-img-top p-3" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{user.username}</h5>
            <p className="card-text">{user.email}</p>
            <a href="#" className="btn btn-raised btn-primary btn-sm">
              View profile
            </a>
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
