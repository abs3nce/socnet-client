import React from "react";
import { Link, withRouter } from "react-router-dom";
import { logoutUser, isAuthenticated } from "../auth";

const isActive = (props, path) => {
  if (props.history.location.pathname === path) {
    return { color: "#0943A2" }; //active link color
  } else {
    return { color: "#444" }; //inactive link color
  }
};

const Navbar = (props) => (
  <div className="bg-light">
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(props, "/")} to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(props, "/users")} to="/users">
          Discover
        </Link>
      </li>
      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props, "/login")}
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props, "/register")}
              to="/register"
            >
              Register
            </Link>
          </li>
        </>
      )}

      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props, `/user/${isAuthenticated().user._id}`)}
              to={`/user/${isAuthenticated().user._id}`}
            >
              {`${isAuthenticated().user.username}'s profile`}
            </Link>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              style={
                (isActive(props, "/logout"),
                { cursor: "pointer", color: "#444" })
              }
              onClick={() => logoutUser(() => props.history.push("/"))}
            >
              Logout
            </a>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default withRouter(Navbar);
