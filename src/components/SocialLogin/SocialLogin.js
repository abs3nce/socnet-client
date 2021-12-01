// import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import GoogleLogin from "react-google-login";
// import { socialLogin, authenticateUser } from "../controllers/auth";
 
// class SocialLogin extends Component {
//     constructor() {
//         super();
//         this.state = {
//             redirectToHome: false
//         };
//     }
 
//     responseGoogle = response => {
//         console.log(response);
//         const { googleId, name, email, imageUrl } = response.profileObj;
//         const user = {
//             password: googleId,
//             name: name,
//             email: email,
//             imageUrl: imageUrl
//         };
//         // console.log("user obj to social login: ", user);
//         socialLogin(user).then(data => {
//             console.log("signin data: ", data);
//             if (data.error) {
//                 console.log("Error Login. Please try again..");
//             } else {
//                 console.log("signin success - setting jwt: ", data);
//                 authenticateUser(data, () => {
//                     this.setState({ redirectToReferrer: true });
//                 });
//             }
//         });
//     };
 
//     render() {
//         // redirect
//         const { redirectToHome } = this.state;
//         if (redirectToHome) {
//             return <Redirect to="/" />;
//         }
 
//         return (
//             <GoogleLogin
//                 clientId="110996404286-8ssdfh52adn5n2utlvua85kko3b8aj8k.apps.googleusercontent.com"
//                 buttonText="Login with Google"
//                 onSuccess={this.responseGoogle}
//                 onFailure={this.responseGoogle}
//             />
//         );
//     }
// }
 
// export default SocialLogin;