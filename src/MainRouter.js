import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./core/Navbar";
import Home from "./core/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Discover from "./pages/Discover";
import ProfileEditor from "./pages/ProfileEditor";

import PrivateRoute from "./components/PrivateRoute";

const MainRouter = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Discover} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/user/edit/:userID" component={ProfileEditor} />
      <Route exact path="/user/:userID" component={UserProfile} />
    </Switch>
  </div>
);

export default MainRouter;
