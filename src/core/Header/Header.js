import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { BiGlobe } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";
import { MdNewLabel } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";

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
        if (size.width > 1600 && menuOpen) {
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
                        menuOpen && size.width < 1600 ? classes.isMenu : ""
                    }`}
                >
                    <ul>
                        <li>
                            <Link to="/" onClick={menuToggleHandler}>
                                <BiGlobe className="m-2" />
                                Global Feed
                            </Link>
                        </li>

                        {isUserAuthenticated() && (
                            <li>
                                <Link
                                    to="/posts/followed"
                                    onClick={menuToggleHandler}
                                >
                                    <BiHeart className="m-2" />
                                    Your Feed
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                to="/users/discover"
                                onClick={menuToggleHandler}
                            >
                                <FiUsers className="m-2" />
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
                                        <FiLogIn className="m-2" />
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/Register"
                                        onClick={menuToggleHandler}
                                    >
                                        <MdNewLabel className="m-2" />
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
                                        <FiUserPlus className="m-1" />
                                        Suggested
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/posts/create"
                                        onClick={menuToggleHandler}
                                    >
                                        <BsPlusLg className="m-1" />
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
                                        <BsPerson className="m-2" />
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
                                        <IoMdExit className="m-2" />
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
