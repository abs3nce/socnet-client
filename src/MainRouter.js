import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import Navbar from "./core/Navbar/Navbar";
import Home from "./core/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import Discover from "./pages/Discover/Discover";
import ProfileEditor from "./pages/ProfileEditor/ProfileEditor";
import Suggested from "./pages/Suggested/Suggested";
import CreatePost from "./pages/CreatePost/CreatePost";
import SinglePost from "./pages/PostViewer/PostViewer";
import PostEditor from "./pages/PostEditor/PostEditor";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

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
            {/* redirect if 404 */}
            <Redirect to="/" />
        </Switch>
    </div>
);

export default MainRouter;
