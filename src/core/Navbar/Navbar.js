import React from "react";
import { Link, withRouter } from "react-router-dom";
import { logoutUser, isUserAuthenticated } from "../../controllers/auth";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

const isActive = (props, path) => {
    if (props.history.location.pathname === path) {
        return { color: "#0943A2" }; //active link color
    } else {
        return { color: "#444" }; //inactive link color
    }
};

// const NavbarComponent = (props) => (
//     <Navbar bg="light" expand={false}>
//         <Container fluid>
//             <Navbar.Brand href="#">Socnet</Navbar.Brand>
//             <Navbar.Toggle aria-controls="offcanvasNavbar" />
//             <Navbar.Offcanvas
//                 id="offcanvasNavbar"
//                 aria-labelledby="offcanvasNavbarLabel"
//                 placement="end"
//             >
//                 <Offcanvas.Header closeButton>
//                     <Offcanvas.Title id="offcanvasNavbarLabel">
//                         Socnet
//                     </Offcanvas.Title>
//                 </Offcanvas.Header>
//                 <Offcanvas.Body>
//                     <Nav className="justify-content-end flex-grow-1 pe-3">
//                         <Nav.Link>
//                             <Link
//                                 className="nav-link"
//                                 style={isActive(props, "/")}
//                                 to="/"
//                             >
//                                 Home
//                             </Link>
//                         </Nav.Link>
//                         <Nav.Link>New Post</Nav.Link>
//                         <Nav.Link>Profile</Nav.Link>
//                         <NavDropdown title="Users" id="offcanvasNavbarDropdown">
//                             <NavDropdown.Item>
//                                 <Link
//                                     className="nav-link"
//                                     style={isActive(props, "/users/discover")}
//                                     to="/users/discover"
//                                 >
//                                     All users
//                                 </Link>
//                             </NavDropdown.Item>

//                             <NavDropdown.Item>
//                                 <Link
//                                     className="nav-link"
//                                     style={isActive(props, `/users/suggested`)}
//                                     to={`/users/suggested`}
//                                 >
//                                     Suggested
//                                 </Link>
//                             </NavDropdown.Item>

//                             {/* <NavDropdown.Divider /> */}
//                         </NavDropdown>
//                         <Nav.Link href="#action2">Logout</Nav.Link>
//                     </Nav>
//                     {/* <Form className="d-flex">
//                                 <FormControl
//                                     type="search"
//                                     placeholder="Search"
//                                     className="me-2"
//                                     aria-label="Search"
//                                 />
//                                 <Button variant="outline-success">
//                                     Search
//                                 </Button>
//                             </Form> */}
//                 </Offcanvas.Body>
//             </Navbar.Offcanvas>
//         </Container>
//     </Navbar>
// );

const NavbarComponent = (props) => (
    <div className="bg-light">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(props, "/")} to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(props, "/users/discover")}
                    to="/users/discover"
                >
                    All users
                </Link>
            </li>
            {!isUserAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(props, "/login")}
                            to="/login"
                        >
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(props, "/register")}
                            to="/register"
                        >
                            Register
                        </Link>
                    </li>
                </>
            )}

            {isUserAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(props, `/users/suggested`)}
                            to={`/users/suggested`}
                        >
                            Suggested
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(props, `/posts/create`)}
                            to={`/posts/create`}
                        >
                            New Post
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(
                                props,
                                `/users/${isUserAuthenticated().user._id}`
                            )}
                            to={`/users/${isUserAuthenticated().user._id}`}
                        >
                            {`${isUserAuthenticated().user.username}'s profile`}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <span
                            className="nav-link"
                            // style={
                            //   ({ cursor: "pointer", color: "#444" },
                            //   isActive(props, "/logout"))
                            // }
                            style={
                                (isActive(props, "/logout"),
                                { cursor: "pointer", color: "#444" })
                            }
                            onClick={() =>
                                logoutUser(() => props.history.push("/"))
                            }
                        >
                            Logout
                        </span>
                    </li>
                </>
            )}
        </ul>
    </div>
);

export default withRouter(NavbarComponent);
