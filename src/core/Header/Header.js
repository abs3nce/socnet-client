import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Header.module.scss";

import { logoutUser, isUserAuthenticated } from "../../controllers/auth";

const Header = (props) => {
    const history = useHistory();
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

    const ctaClickHandler = () => {
        menuToggleHandler();
        history.push("/page-cta");
    };
    return (
        <header className={classes.header}>
            <div className={classes.header__content}>
                <Link to="/" className={classes.header__content__logo}>
                    SOCNET
                </Link>
                <nav
                    className={`${classes.header__content__nav} ${
                        menuOpen && size.width < 768 ? classes.isMenu : ""
                    }`}
                >
                    <ul>
                        <li>
                            <Link to="/" onClick={menuToggleHandler}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/users/discover"
                                onClick={menuToggleHandler}
                            >
                                All Users
                            </Link>
                        </li>

                        {!isUserAuthenticated() && (
                            <>
                                <li>
                                    <Link
                                        to="/Login"
                                        onClick={menuToggleHandler}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/Register"
                                        onClick={menuToggleHandler}
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        {isUserAuthenticated() && (
                            <>
                                <li>
                                    <Link
                                        to="/users/suggested"
                                        onClick={menuToggleHandler}
                                    >
                                        Suggested
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/posts/create"
                                        onClick={menuToggleHandler}
                                    >
                                        New Post
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/users/${
                                            isUserAuthenticated().user._id
                                        }`}
                                        onClick={menuToggleHandler}
                                    >
                                        {`${
                                            isUserAuthenticated().user.username
                                        }'s profile`}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/logout"
                                        onClick={menuToggleHandler}
                                        onClick={() =>
                                            logoutUser(() =>
                                                props.history.push("/")
                                            )
                                        }
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* <button onClick={ctaClickHandler}>CTA Page</button> */}
                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default withRouter(Header);
