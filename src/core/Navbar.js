import React from "react";
import { Link, withRouter } from "react-router-dom";
import { logoutUser, isUserAuthenticated } from "../controllers/auth";

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
        <Link
          className="nav-link"
          style={isActive(props, "/users/discover")}
          to="/users/discover"
        >
          Discover
        </Link>
      </li>
      {!isUserAuthenticated() && (
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

      {isUserAuthenticated() && (
        <>
          
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props, `/users/suggested`)}
              to={`/users/suggested`}
            >
              Suggested
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props, `/users/${isUserAuthenticated().user._id}`)}
              to={`/users/${isUserAuthenticated().user._id}`}
            >
              {`${isUserAuthenticated().user.username}'s profile`}
            </Link>
          </li>

          <li className="nav-item">
            <span
              className="nav-link"
              // style={
              //   ({ cursor: "pointer", color: "#444" },
              //   isActive(props, "/logout"))
              // }
              style={(isActive(props, "/logout")), {cursor: "pointer", color: "#444"}}
              onClick={() => logoutUser(() => props.history.push("/"))}
            >
              Logout
            </span>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default withRouter(Navbar);
