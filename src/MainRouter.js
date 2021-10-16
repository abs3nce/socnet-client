import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./core/Navbar";
import Home from "./core/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Discover from "./pages/Discover";
import EditUserProfile from "./pages/EditUserProfile";

const MainRouter = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Discover} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/user/edit/:userID" component={EditUserProfile} />
      <Route exact path="/user/:userID" component={UserProfile} />
    </Switch>
  </div>
);

export default MainRouter;
