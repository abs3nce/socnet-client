import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import Navbar from "./core/Navbar";
import Home from "./core/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Discover from "./pages/Discover";
import ProfileEditor from "./pages/ProfileEditor";
import Suggested from "./pages/Suggested";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./components/SinglePost";
import PostEditor from "./components/PostEditor";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const MainRouter = () => (
    <div>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />

            <PrivateRoute exact path="/posts/create" component={CreatePost} />
            <PrivateRoute
                exact
                path="/posts/edit/:postID"
                component={PostEditor}
            />
            <Route exact path="/posts/:postID" component={SinglePost} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
                exact
                path="/reset-password/:resetPasswordToken"
                component={ResetPassword}
            />

            <Route exact path="/users/discover" component={Discover} />
            <PrivateRoute exact path="/users/suggested" component={Suggested} />
            <PrivateRoute
                exact
                path="/users/edit/:userID"
                component={ProfileEditor}
            />
            <Route exact path="/users/:userID" component={UserProfile} />
        </Switch>
    </div>
);

export default MainRouter;
