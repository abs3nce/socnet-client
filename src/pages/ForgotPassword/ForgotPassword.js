// import React, { Component } from 'react'

// class ForgotPassword extends Component {
//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }

// export default ForgotPassword

import React, { Component } from "react";
import { forgotPassword } from "../../controllers/auth";

class ForgotPassword extends Component {
    state = {
        email: "",
        message: "",
        error: "",
    };

    forgotPassword = (e) => {
        e.preventDefault();
        this.setState({ message: "", error: "" });
        forgotPassword(this.state.email).then((data) => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error });
            } else {
                console.log(data.message);
                this.setState({ message: data.message });
            }
        });
    };

    render() {
        const { error, message } = this.state;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Ask for Password Reset</h2>
                <form>
                    <div className="form-group mt-5">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your email address"
                            value={this.state.email}
                            name="email"
                            onChange={(e) =>
                                this.setState({
                                    email: e.target.value,
                                    message: "",
                                    error: "",
                                })
                            }
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.forgotPassword}
                        className="btn btn-raised btn-primary mt-3"
                    >
                        Send Password Rest Link
                    </button>
                </form>
                {message ? (
                    <div
                        class="alert alert-success d-flex align-items-center mt-3"
                        role="alert"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-check-circle-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        <div className="m-2">{message}</div>
                    </div>
                ) : (
                    ""
                )}
                {error ? (
                    <div
                        class="alert alert-warning d-flex align-items-center mt-3"
                        role="alert"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                            viewBox="0 0 16 16"
                            role="img"
                            aria-label="Warning:"
                        >
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div className="m-2">{error}</div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default ForgotPassword;