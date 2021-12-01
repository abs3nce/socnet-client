import React, { Component } from "react";
import { Link } from "react-router-dom";

import { registerUser } from "../../controllers/auth";

import Spinner from "react-bootstrap/Spinner";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            error: null,
            success: false,
            loading: false,
            recaptcha: false,
        };

        //binding
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (name) => (event) => {
        //pri hociakej zmene udajov predchadzajuci error zmizne
        this.setState({ error: null, success: false, loading: false });

        //ukladanie udajov z formu >> ak je to event z username tak this.state.username nadobudne hodnotu username z inputu a podobne
        this.setState({ [name]: event.target.value });
    };

    handleSubmit(e) {
        this.setState({ loading: true });
        e.preventDefault();

        //vytvorenie usera
        const { username, email, password } = this.state;
        const user = {
            username,
            email,
            password,
        };

        if (this.state.recaptcha) {
            console.log(`> REGISTER FORM data: `, user);

            registerUser(user).then((data) => {
                //nastavenie erroru v state pokial nejaky existuje, pokial nie tak premazanie registracneho formu
                if (data.error)
                    this.setState({ error: data.error, loading: false });
                else {
                    this.setState({
                        username: "",
                        email: "",
                        password: "",
                        success: true,
                        loading: false,
                    });
                }
            });
        } else {
            this.setState({
                loading: false,
                error: "What day is it today? Please write the correct answer.",
            });
        }
    }

    recaptchaHandler = (event) => {
        this.setState({ error: "" });
        let userDay = event.target.value.toLowerCase();
        let dayCount;

        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }

        if (dayCount === new Date().getDay()) {
            this.setState({ recaptcha: true });
            return true;
        } else {
            this.setState({
                recaptcha: false,
            });
            return false;
        }
    };

    loadRegisterForm = (username, email, password) => (
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
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
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

            {/* recaptcha */}
            <div className="form-group">
                <label className="text-muted">
                    {this.state.recaptcha
                        ? "Thanks. Now you can register"
                        : "What day is it today?"}
                </label>

                <input
                    onChange={this.recaptchaHandler}
                    type="text"
                    className="form-control"
                />
            </div>

            <button
                onClick={this.handleSubmit}
                className="btn btn-raised btn-primary mt-3"
            >
                Register
            </button>
        </form>
    );

    render() {
        const {
            username,
            email,
            password,
            error,
            success,
            loading,
            recaptcha,
        } = this.state;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Register Page</h2>

                {this.loadRegisterForm(username, email, password, recaptcha)}

                {/* alert o nesplnenej registracii s errorom*/}
                <div
                    style={{ display: error ? "" : "none" }}
                    className="alert alert-danger mt-3"
                >
                    {error}
                </div>

                {/* alert o splnenej registracii uzivatela */}
                <div
                    style={{ display: success ? "" : "none" }}
                    className="alert alert-success mt-3"
                >
                    Account successfully created, please{" "}
                    <Link to="/login">sign in!</Link>
                </div>
                {loading && !error ? (
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

export default Register;
