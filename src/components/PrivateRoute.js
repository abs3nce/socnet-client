import React from "react";
// import { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { isUserAuthenticated } from "../controllers/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
    //props je komponent, ktory sa passuje do tejto funkcie
    <Route
        {...rest}
        render={(props) =>
            isUserAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);

export default PrivateRoute;

/*
funguje ako dalsia uroven ochrany,
komponent alebo stranka sa ukaze iba v pripade ak je uzivatel overeny
>> MainRouter.js je to pouzite na napriklad ProfileEditor.js
*/
