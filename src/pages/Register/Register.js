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
    }

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

            <button
                onClick={this.handleSubmit}
                className="btn btn-raised btn-primary mt-3 w-100"
            >
                Register
            </button>

            <div className="row justify-content-center">
                <div className="col-12 text-start mt-3">
                    <Link to="/login">Login here</Link>
                </div>
            </div>
        </form>
    );

    render() {
        const { username, email, password, error, success, loading } =
            this.state;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Register Page</h2>

                {this.loadRegisterForm(username, email, password)}

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
