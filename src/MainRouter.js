import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./core/Navbar";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./user/Login";
import Profile from "./user/Profile";

const MainRouter = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/user/:userID" component={Profile} />
    </Switch>
  </div>
);

export default MainRouter;
