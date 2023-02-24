import "rc-footer/assets/index.css";
import Logo from "../../Assets/Air_scrum-removebg-preview 1.png";
import { Container, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import "./Footer.css";
const FooterBar = () => {

  const { loginState } = useSelector((state) => state.loginState);

  var currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container fluid className="footer mt-5">
        <Row className="justify-content-center pt-3">
          <Col sm={4} md={4} className="footer-logo">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <Link to={"/"}>
                <img title="Groove Street, Home" alt="Logo" src={Logo}></img>
              </Link>
            </div>
          </Col>
          <Col sm={4} md={4}>
            <h3 className="main-text-color">Site Map</h3>
            <ListGroup className={"SiteMap-list-group"} title="SiteMap">
              <ListGroupItem>
                <Link to={"/"}>{"Home"}</Link>
              </ListGroupItem>
              {loginState ? (
                <>
                  <ListGroupItem>
                    <Link to={"/upload"} style={{ display: "block" }}>
                      {"Upload"}
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link to={"/profile"} style={{ display: "block" }}>
                      {"Profile"}
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link to={"/history"} style={{ display: "block" }}>
                      {"History"}
                    </Link>
                  </ListGroupItem>
                </>
              ) : (
                <></>
              )}
              {!loginState ? (
                <>
                  <ListGroupItem>
                    <Link to={"/login"} style={{ display: "block" }}>
                      {"Login"}
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link to={"/signup"} style={{ display: "block" }}>
                      {"Sign Up"}
                    </Link>
                  </ListGroupItem>
                </>
              ) : (
                <></>
              )}
              <ListGroupItem>
                <Link to={"/about"}>{"About Us"}</Link>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col sm={4} md={4}>
            <h3 className="main-text-color">{"Contact Us"}</h3>
            <Form
              name="basicform"
              onFinishFailed={() => alert("Failed to submit")}
              onFinish={() => alert("Form Submitted")}
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter the email" }]}
                colon=""
              >
                <Input
                  placeholder="test123@gmail.com"
                  className="logo-user including-user-logo"
                />
              </Form.Item>
              <Form.Item
                label="Message"
                name="message"
                rules={[
                  { required: true, message: "Please enter your message here" },
                ]}
                colon=""
              >
                <Input.TextArea
                  placeholder="Enter your message here"
                  className="logo-user including-message-logo"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <hr></hr>
        <Row className="justify-content-center mt-2">
          <Col sm={12} className="text-center">
            <p>Copyright Air Scrum © {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterBar;
