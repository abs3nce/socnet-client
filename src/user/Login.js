import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { loginUser, authUser } from "../auth";

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
      authUser(data, () => {
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

      <button
        onClick={this.handleSubmit}
        className="btn btn-raised btn-primary mt-3"
      >
        Login
      </button>
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

        {/* alert o neuspesnom logine s errorom*/}
        <div
          style={{ display: error ? "" : "none" }}
          className="alert alert-danger mt-3"
        >
          {error}
        </div>

        {loading ? (
          <div>
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Login;
