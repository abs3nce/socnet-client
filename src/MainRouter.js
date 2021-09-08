import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Register from "./user/Register";

const MainRouter = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
    <Switch>
      <Route exact path="/register" component={Register} />
    </Switch>
  </div>
);

export default MainRouter;
