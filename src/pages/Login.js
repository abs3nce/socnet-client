import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import { loginUser, authenticateUser } from "../controllers/auth";
// import SocialLogin from "../components/SocialLogin";

import Spinner from "react-bootstrap/Spinner";

// https://www.npmjs.com/package/react-google-login

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error: null,
            redirectUser: false,
            loading: false,
        };

        //binding
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (name) => (event) => {
        //pri hociakej zmene udajov predchadzajuci error zmizne
        this.setState({ error: null });

        //ukladanie udajov z formu >> ak je to event z username tak this.state.username nadobudne hodnotu username z inputu a podobne
        this.setState({ [name]: event.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ loading: true });

        //vytvorenie usera
        const { username, password } = this.state;
        const user = {
            username,
            password,
        };

        console.log(`> LOGIN FORM data: `, user);

        loginUser(user).then((data) => {
            //nastavenie erroru v state pokial nejaky existuje, pokial nie tak premazanie registracneho formu
            if (data.error) {
                this.setState({ error: data.error, loading: false });
            }
            //overenie
            authenticateUser(data, () => {
                this.setState({ redirectUser: true }); //ready to redirect
            });
            //redirect
        });
    }

    loadLoginForm = (username, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input
                    onChange={this.handleChange("username")}
                    type="text"
                    className="form-control"
                    value={username}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>

            <div className="row justify-content-between">
                <div className="col-6 text-start">
                    <button
                        onClick={this.handleSubmit}
                        className="btn btn-raised btn-primary mt-3"
                    >
                        Login
                    </button>
                </div>
                <div className="col-6 text-end">
                    <Link to="/forgot-password">
                        <div className="btn btn-raised btn-info mt-3">
                            Forgot password
                        </div>
                    </Link>
                </div>
            </div>
        </form>
    );

    render() {
        const { username, password, error, redirectUser, loading } = this.state;

        if (redirectUser) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Login Page</h2>

                {this.loadLoginForm(username, password)}

                {/* <SocialLogin /> */}
                <div
                    style={{ display: error ? "" : "none" }}
                    className="alert alert-danger mt-3"
                >
                    {error}
                </div>
                {loading ? (
                    <Spinner
                        className="mt-3"
                        animation="border"
                        role="status"
                        variant="primary"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default Login;
