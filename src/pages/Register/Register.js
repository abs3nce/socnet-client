import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { isUserAuthenticated, registerUser } from "../../controllers/auth";

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
            isLoggedIn: false,
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

    loadRegisterForm = (username, email, password, success) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Meno</label>
                <input
                    onChange={this.handleChange("username")}
                    type="text"
                    className="form-control"
                    value={username}
                    placeholder="Zadajte vaše meno"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                    placeholder="Zadajte váš email"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Heslo</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                    placeholder="Zadajte vaše heslo"
                />
            </div>

            <button
                onClick={this.handleSubmit}
                className="btn btn-raised btn-primary mt-3 w-100"
            >
                Zaregistrovať
            </button>

            {!success && (
                <div className="row justify-content-center">
                    <div className="col-12 text-start mt-3">
                        <Link to="/login">Prihlásiť sa</Link>
                    </div>
                </div>
            )}
            <br />
            <br />
            <br />
            <p style={{ fontSize: "12px" }} className="text-center">
                <em>
                    Zaregistrovaním užívateľ súhlasí s uložením svojich údajov
                    do databázý spravovanej autorom projektu a následnou možnou
                    manipuláciou, vymazaním alebo upravením daných dát. Tak isto
                    užívateľ súhlasí s podmienkami a pravidlami tejto siete.
                </em>
            </p>
        </form>
    );

    render() {
        const { username, email, password, error, success, loading } =
            this.state;

        if (isUserAuthenticated()) {

            return (<Redirect to="/"></Redirect>)
        }
        return (
            <div className="container mt-5">
                {this.loadRegisterForm(username, email, password, success)}

                {/* alert o nesplnenej registracii s errorom*/}
                <div
                    style={{ display: error ? "" : "none" }}
                    className="alert alert-danger mt-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                        viewBox="0 0 16 16"
                        role="img"
                        aria-label="Warning:"
                    >
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    {error}
                </div>

                {/* alert o splnenej registracii uzivatela */}
                <div
                    style={{ display: success ? "" : "none" }}
                    className="alert alert-success mt-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-check-circle-fill me-2"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    Účet úspešne vytvorený, prosím{" "}
                    <Link to="/login" className="">
                        prihláste sa tu
                    </Link>
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
