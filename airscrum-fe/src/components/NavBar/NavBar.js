import React, { useState, useEffect } from "react";
import { Anchor, Drawer, Button } from "antd";
import Preview from "../../Assets/Air_scrum-removebg-preview.png";
import MenuIcon from "../../Assets/icons8-menu-50.png";
import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login,logout } from "../../redux/userRedux";


function NavBar() {
  const [visible, setVisible] = useState(false);
  const [navLogin, setNavLogin] = useState("none");
  const [navNotLogin, setNavNotLogin] = useState("none");
  const dispatch = useDispatch();

  const location = useLocation();

  const { loginState } = useSelector((state) => state.loginState);
  //const dispatch = useDispatch();


  useEffect(()=>{
    if(loginState){
      setNavLogin("inline")
      setNavNotLogin("none")
    }
    else{
      setNavLogin("none")
      setNavNotLogin("inline")
    }
	}, [loginState])
  

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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
                location.pathname === "/" ? "active-title" : "nav-visible-title"
              }`}
            >
              Home
            </Link>
            <Link
              to={"/login"}
              style={{ display: navNotLogin }}
              className={"nav-visible-title"}
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              style={{ display: navNotLogin }}
              className={"nav-visible-title"}
            >
              Sign up
            </Link>
            <Link
              to={"/upload"}
              style={{ display: navLogin }}
              className={`${
                location.pathname === "/upload"
                  ? "active-title"
                  : "nav-visible-title"
              }`}
            >
              Upload
            </Link>
            <Link
              to={"/about"}
              style={{ display: navLogin }}
              className={`${
                location.pathname === "/about"
                  ? "active-title"
                  : "nav-visible-title"
              }`}
            >
              About Us
            </Link>
            <Link
              to={"/profile"}
              style={{ display: navLogin }}
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
              style={{ display: navLogin }}
              className={`${
                location.pathname === "/history"
                  ? "active-title"
                  : "nav-visible-title"
              }`}
            >
              History
            </Link>
            <Link to={"/login"} className="logout nav-visible-title" style={{ display: navLogin }}>
              Logout
            </Link>
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer} className="open-bar-btn">
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
                to={"/about"}
                className={`${
                  location.pathname === "/about"
                    ? "active-title mobile-size"
                    : "nav-visible-title mobile-size"
                }`}
              >
                About Us
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
                to={"/login"}
                className="logout nav-visible-title mobile-size"
              >
                Logout
              </Link>
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
