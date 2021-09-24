import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./core/Navbar";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./user/Login";

const MainRouter = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </div>
);

export default MainRouter;
