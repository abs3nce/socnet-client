import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

import AdminDashboard from "./core/admin/AdminDashboard";
import AdminPosts from "./core/admin/AdminPosts";
import AdminUsers from "./core/admin/AdminUsers";
// import Navbar from "./core/Navbar/Navbar";
import Home from "./core/Home/Home";
import FollowedFeed from "./pages/FollowedFeed/FollowedFeed";
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
import Layout from "./core/Layout/Layout";

const MainRouter = () => (
    <div>
        <Layout>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <AdminRoute
                    exact
                    path="/administrationdashboard"
                    component={AdminDashboard}
                />
                <AdminRoute
                    exact
                    path="/administrationdashboard/posts"
                    component={AdminPosts}
                />
                <AdminRoute
                    exact
                    path="/administrationdashboard/users"
                    component={AdminUsers}
                />

                <PrivateRoute exact path="/posts/followed">
                    <FollowedFeed />
                </PrivateRoute>

                <PrivateRoute exact path="/posts/create">
                    <CreatePost></CreatePost>
                </PrivateRoute>

                <PrivateRoute
                    exact
                    path="/posts/edit/:postID"
                    component={PostEditor}
                />

                <Route exact path="/posts/:postID" component={SinglePost} />

                <Route exact path="/register" component={Register} />

                <Route exact path="/login" component={Login} />

                <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                />

                <Route
                    exact
                    path="/reset-password/:resetPasswordToken"
                    component={ResetPassword}
                />

                <Route exact path="/users/discover" component={Discover} />

                <PrivateRoute
                    exact
                    path="/users/suggested"
                    component={Suggested}
                />

                <PrivateRoute
                    exact
                    path="/users/edit/:userID"
                    component={ProfileEditor}
                />

                <Route exact path="/users/:userID" component={UserProfile} />

                <Redirect to="/" />
            </Switch>
        </Layout>
    </div>
);

export default MainRouter;
// import React from "react";
// import { Route, Switch, Redirect } from "react-router-dom";

// import PrivateRoute from "./components/PrivateRoute";

// import Navbar from "./core/Navbar/Navbar";
// // import NavbarNew from "./core/Navbar/NavbarNew";
// // import Header from "./core/Header/Header";
// import Home from "./core/Home/Home";
// import Register from "./pages/Register/Register";
// import Login from "./pages/Login/Login";
// import UserProfile from "./pages/UserProfile/UserProfile";
// import Discover from "./pages/Discover/Discover";
// import ProfileEditor from "./pages/ProfileEditor/ProfileEditor";
// import Suggested from "./pages/Suggested/Suggested";
// import CreatePost from "./pages/CreatePost/CreatePost";
// import SinglePost from "./pages/PostViewer/PostViewer";
// import PostEditor from "./pages/PostEditor/PostEditor";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword/ResetPassword";
// import Layout from "./core/Layout/Layout";

// const MainRouter = () => (
//     <div>
//         <Navbar />

//         <Switch>
//             <Route exact path="/" component={Home} />
//             <PrivateRoute exact path="/posts/create" component={CreatePost} />
//             <PrivateRoute
//                 exact
//                 path="/posts/edit/:postID"
//                 component={PostEditor}
//             />
//             <Route exact path="/posts/:postID" component={SinglePost} />
//             <Route exact path="/register" component={Register} />
//             <Route exact path="/login" component={Login} />
//             <Route exact path="/forgot-password" component={ForgotPassword} />
//             <Route
//                 exact
//                 path="/reset-password/:resetPasswordToken"
//                 component={ResetPassword}
//             />
//             <Route exact path="/users/discover" component={Discover} />
//             <PrivateRoute exact path="/users/suggested" component={Suggested} />
//             <PrivateRoute
//                 exact
//                 path="/users/edit/:userID"
//                 component={ProfileEditor}
//             />
//             <Route exact path="/users/:userID" component={UserProfile} />
//             <Redirect to="/" />
//         </Switch>
//     </div>
// );

// export default MainRouter;
