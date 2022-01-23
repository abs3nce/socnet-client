import React, { useState, useEffect } from "react";
import { Link, /*useHistory,*/ withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {
    BsPeople,
    BsPersonFill,
    BsPersonPlus,
    BsGlobe,
    BsShieldFill,
    BsBoxArrowInRight,
    BsHeartFill,
    BsPlusLg,
    BsBoxArrowRight,
    BsPersonLinesFill,
} from "react-icons/bs";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Header.module.scss";

import { logoutUser, isUserAuthenticated } from "../../controllers/auth";

const Header = (props) => {
    // const history = useHistory();
    const [menuOpen, setMenuOpen] = useState(false);
    // const [size, setSize] = useState({
    //     width: undefined,
    //     height: undefined,
    // });
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
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

    // const ctaClickHandler = () => {
    //     menuToggleHandler();
    //     history.push("/page-cta");
    // };
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
                        {isUserAuthenticated() &&
                            isUserAuthenticated().user.role ===
                                "administrator" && (
                                <li>
                                    <Link
                                        to={`/administrationdashboard`}
                                        onClick={menuToggleHandler}
                                    >
                                        <BsShieldFill className="m-2" />
                                        Admin
                                    </Link>
                                </li>
                            )}

                        <li>
                            <Link to="/" onClick={menuToggleHandler}>
                                <BsGlobe className="m-2" />
                                Domov
                            </Link>
                        </li>

                        {isUserAuthenticated() && (
                            <li>
                                <Link
                                    to="/posts/followed"
                                    onClick={menuToggleHandler}
                                >
                                    <BsHeartFill className="m-2" />
                                    Sledované
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                to="/users/discover"
                                onClick={menuToggleHandler}
                            >
                                <BsPeople className="m-2" />
                                Uživatelia
                            </Link>
                        </li>

                        {!isUserAuthenticated() && (
                            <>
                                <li>
                                    <Link
                                        to="/Login"
                                        onClick={menuToggleHandler}
                                    >
                                        <BsBoxArrowInRight className="m-2" />
                                        Prihlásenie
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/Register"
                                        onClick={menuToggleHandler}
                                    >
                                        <BsPersonPlus className="m-2" />
                                        Registrácia
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
                                        <BsPersonLinesFill className="m-1" />
                                        Odporúčaní
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/posts/create"
                                        onClick={menuToggleHandler}
                                    >
                                        <BsPlusLg className="m-1" />
                                        Pridať
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/users/${
                                            isUserAuthenticated().user._id
                                        }`}
                                        onClick={menuToggleHandler}
                                    >
                                        <BsPersonFill className="m-2" />
                                        {`${
                                            isUserAuthenticated().user.username
                                        }`}
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
                                        <BsBoxArrowRight className="m-2" />
                                        Odhlásiť
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
