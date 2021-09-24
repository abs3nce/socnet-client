import React, { Component } from "react";
import {registerUser} from '../auth'

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      error: null,
      success: false,
    };

    //binding
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name) => (event) => {
    //pri hociakej zmene udajov predchadzajuci error zmizne
    this.setState({ error: null, success: false });

    //ukladanie udajov z formu >> ak je to event z username tak this.state.username nadobudne hodnotu username z inputu a podobne
    this.setState({ [name]: event.target.value });
  };

  handleSubmit(e) {
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
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          username: "",
          email: "",
          password: "",
          error: null,
          success: true,
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
        className="btn btn-raised btn-primary mt-3"
      >
        Register
      </button>
    </form>
  );

  render() {
    const { username, email, password, error, success } = this.state;

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
          Account successfully created, please sign in!
        </div>
      </div>
    );
  }
}

export default Register;
