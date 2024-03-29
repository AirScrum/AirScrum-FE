import FlyingImage from "../../Assets/Flying around the world-rafiki.svg";
import SignUpBro from "../../Assets/Sign up-bro.png";
import UploadBro from "../../Assets/Image upload-bro.png";
import SetupBro from "../../Assets/Setup-rafiki.png";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Home.css";
import { useSearchParams } from "react-router-dom";


const Home = () => {
  document.body.style = "background: #ffffff !important;";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { loginState } = useSelector((state) => state.loginState);

  useEffect(() => {
    var tokenTemp = searchParams.get("token");
    if (tokenTemp !== null) {
      tokenTemp = "Bearer " + searchParams.get("token");
      Cookies.set("token", tokenTemp);
      var tokenTemp2 = "Bearer " + searchParams.get("refresh_token");
      Cookies.set("refresh_token", tokenTemp2);
      navigate("/");
    }
    var token = Cookies.get("token");
    // Check if he has logged in using google
    axios
      .get(`${process.env.REACT_APP_KIA}/protected`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(login());
      })
      .catch((err) => {
        var refreshToken = Cookies.get("refresh_token");
        axios
          .get(`${process.env.REACT_APP_KIA}/refresh`, {
            headers: {
              Authorization: refreshToken,
            },
          })
          .then((res) => {
            var newAccess = res.data.accessToken;
            tokenTemp = "Bearer " + newAccess;
            Cookies.set("token", tokenTemp);
            dispatch(login());
          })
          .catch((err) => {
            console.log(err);
            dispatch(logout());
          });
      });
  }, []);

  const getStarted = () => {
    console.log("Hi")
    if(loginState){
      navigate("/upload");
    }
    else{
      navigate("/login");
    }
  };

  return (
    <>
      <Container fluid className="main-sky-color-background">
        <Row>
          <Col id={"GetStarted-Container-Text"} sm={6} className="px-5">
            <h1 className="main-text-color text-bold fw-bold">
              User Stories on the AIR!
            </h1>
            <p className="main-secondary-color light-rubik-font">
              AirScrum allows Scrum team members to generate user
              <br /> stories using Artificial Intelligence technology
              immediately
              <br /> from scrum meetings recordings!
            </p>
            <Button className="rounded-button" onClick={getStarted}>Get Started</Button>
          </Col>
          <Col sm={6} className="text-center">
            <img
              alt="Flying Plane"
              src={FlyingImage}
              style={{ width: "inherit" }}
            />
            <a
              href="https://storyset.com/work"
              className="redirect"
              target="_blank"
            >
              Work illustrations by Storyset
            </a>
          </Col>
        </Row>
      </Container>
      <Container fluid className={"my-5"}>
        <Row>
          <Col sm={6} className="text-center my-5">
            <img
              alt="SignUp Bro"
              style={{ width: "inherit" }}
              src={SignUpBro}
            />
            <a
              href="https://storyset.com/work"
              className="redirect"
              target="_blank"
            >
              Work illustrations by Storyset
            </a>
          </Col>
          <Col id={"GetStarted-Container-Text"} sm={6} className="px-5">
            <h2 className="main-text-color text-bold fw-bold">
              Create your account now!
            </h2>
            <p className="main-text-color light-rubik-font">
              Sign up in simple steps and access to our awesome features 🚀
            </p>
            <ul className="main-text-color light-rubik-font">
              <li>Upload recorded meetings (.mp3 extension).</li>
              <li>See generated user stories.</li>
              <li>Check uploaded requests history.</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container fluid className="main-sky-color-background">
        <Row>
          <Col id={"GetStarted-Container-Text"} sm={6} className="px-5">
            <h2 className="main-text-color text-bold fw-bold text-wrap text-start">
              Upload all your team<br></br> recorded meetings!
            </h2>
            <p className="main-text-color light-rubik-font text-start">
              Simply upload your scrum meetings
              <br /> with just one click and watch how
              <br /> they are being processed 🔥
            </p>
          </Col>
          <Col sm={6} className="text-center">
            <img
              alt="Upload Bro"
              style={{ width: "inherit" }}
              src={UploadBro}
            />
            <a
              href="https://storyset.com/work"
              className="redirect"
              target="_blank"
            >
              Work illustrations by Storyset
            </a>
          </Col>
        </Row>
      </Container>
      <Container fluid className={"my-5"}>
        <Row>
          <Col sm={6} className="text-center my-5">
            <img alt="SignUp Bro" style={{ width: "inherit" }} src={SetupBro} />
            <a
              href="https://storyset.com/work"
              className="redirect"
              target="_blank"
            >
              Work illustrations by Storyset
            </a>
          </Col>
          <Col id={"GetStarted-Container-Text"} sm={6} className="px-5">
            <h2 className="main-text-color text-bold fw-bold">
              Manage your generated
              <br /> User Stories!
            </h2>
            <p className="main-text-color light-rubik-font">
              Giving you flexibility in dealing with your
              <br />
              AI generated user stories 🧠🦾
            </p>
            <ul className="main-text-color light-rubik-font">
              <li>Access your user stories information.</li>
              <li>Modify user stories’ meta data.</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
