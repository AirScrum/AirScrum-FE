import React, { useState } from "react";
import { Anchor, Drawer, Button } from "antd";
import Preview from "../../Assets/Air_scrum-removebg-preview.png";
import MenuIcon from "../../Assets/icons8-menu-50.png";
import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";
import Cookies from "js-cookie";

function NavBar() {
    const [visible, setVisible] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loginState } = useSelector((state) => state.loginState);


    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const logout2 = () => {
        Cookies.remove("token");
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="container-fluid navbar-color">
            <div className="header">
                <div className="left">
                    <img src={Preview} className="logo" alt="Air Scrum" />
                    <a href="/" className="title">
                        AirScrum
                    </a>
                </div>
                <div className="mobileHidden">
                    <Anchor targetOffset="65">
                        <Link
                            to={"/"}
                            className={`${
                                location.pathname === "/"
                                    ? "active-title"
                                    : "nav-visible-title"
                            }`}
                        >
                            Home
                        </Link>
                        {loginState ? (
                            <></>
                        ) : (
                            <>
                                <Link
                                    to={"/login"}
                                    className={"nav-visible-title"}
                                >
                                    Login
                                </Link>
                                <Link
                                    to={"/signup"}
                                    className={"nav-visible-title"}
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                        {loginState ? (
                            <>
                                <Link
                                    to={"/upload"}
                                    className={`${
                                        location.pathname === "/upload"
                                            ? "active-title"
                                            : "nav-visible-title"
                                    }`}
                                >
                                    Upload
                                </Link>
                                <Link
                                    to={"/profile"}
                                    className={`${
                                        location.pathname === "/profile"
                                            ? "active-title"
                                            : "nav-visible-title"
                                    }`}
                                >
                                    Profile
                                </Link>
                                <Link
                                    to={"/history"}
                                    className={`${
                                        location.pathname === "/history"
                                            ? "active-title"
                                            : "nav-visible-title"
                                    }`}
                                >
                                    History
                                </Link>
                            </>
                        ) : (
                            <></>
                        )}

                        <Link
                            to={"/about"}
                            className={`${
                                location.pathname === "/about"
                                    ? "active-title"
                                    : "nav-visible-title"
                            }`}
                        >
                            About Us
                        </Link>
                        {loginState ? (
                            <>
                                <button
                                    className="logout nav-visible-title"
                                    onClick={logout2}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                    </Anchor>
                </div>
                <div className="mobileVisible">
                    <Button
                        type="primary"
                        onClick={showDrawer}
                        className="open-bar-btn"
                    >
                        <img src={MenuIcon} alt="Menu Bar" className="menu" />
                    </Button>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        open={visible}
                    >
                        <Anchor targetOffset="65">
                            <Link
                                to={"/"}
                                className={`${
                                    location.pathname === "/"
                                        ? "active-title mobile-size"
                                        : "nav-visible-title mobile-size"
                                }`}
                            >
                                Home
                            </Link>
                            {loginState ? (
                                <>
                                    <Link
                                        to={"/upload"}
                                        className={`${
                                            location.pathname === "/upload"
                                                ? "active-title mobile-size"
                                                : "nav-visible-title mobile-size"
                                        }`}
                                    >
                                        Upload
                                    </Link>
                                    <Link
                                        to={"/profile"}
                                        className={`${
                                            location.pathname === "/profile"
                                                ? "active-title mobile-size"
                                                : "nav-visible-title mobile-size"
                                        }`}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to={"/history"}
                                        className={`${
                                            location.pathname === "/profile"
                                                ? "active-title mobile-size"
                                                : "nav-visible-title mobile-size"
                                        }`}
                                    >
                                        History
                                    </Link>
                                </>
                            ) : (
                                <></>
                            )}
                            {loginState ? (
                                <></>
                            ) : (
                                <>
                                    <Link
                                        to={"/login"}
                                        className={`${
                                            location.pathname === "/upload"
                                                ? "active-title mobile-size"
                                                : "nav-visible-title mobile-size"
                                        }`}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to={"/signup"}
                                        className={`${
                                            location.pathname === "/upload"
                                                ? "active-title mobile-size"
                                                : "nav-visible-title mobile-size"
                                        }`}
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                            <Link
                                to={"/about"}
                                className={`${
                                    location.pathname === "/about"
                                        ? "active-title mobile-size"
                                        : "nav-visible-title mobile-size"
                                }`}
                            >
                                About Us
                            </Link>
                            {loginState ? (
                                <>
                                    <button
                                        onClick={logout2}
                                        className="logout nav-visible-title mobile-size"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <></>
                            )}
                        </Anchor>
                    </Drawer>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
