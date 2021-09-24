import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (props, path) => {
  if (props.history.location.pathname === path) {
    return { color: "#0943A2" };
  } else {
    return { color: "#444" };
  }
};

export const logout = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("token");
  next();
  return fetch("http://localhost:3000/logout", {
    method: "GET",
  })
    .then((res) => {
      console.log("> USER LOGGED OUT: ", res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = () => {
  if (typeof windows !== "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else return false;
};

const Navbar = (props) => (
  <div className="bg-light">
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(props, "/")} to="/">
          Home
        </Link>
      </li>
      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props, "/register")}
              to="/register"
            >
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props, "/login")}
              to="/login"
            >
              Login
            </Link>
          </li>
        </>
      )}

      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <a
              className="nav-link"
              style={
                (isActive(props, "/logout"),
                { cursor: "pointer", color: "#444" })
              }
              onClick={() => logout(() => props.history.push("/"))}
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
