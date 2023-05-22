import "./Login.css";
import { Form, Button, Input, Checkbox, Row, Col, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { login, logout } from "../../redux/userRedux";
import axios from "axios";

const Login = () => {
  document.body.style = "background: #CBC3E3 !important;";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [verificationError, setVerificationError] = useState(false);

  dispatch(logout());

  useEffect(() => {
    Cookies.set("token", null);
    Cookies.set("refresh_token", null);
  }, []);

  const handleSubmit = (values) => {
    /**
     * Validation on data
     */
    const email = values.email;
    const password = values.password;
    if (email === "admin@gmail.com" && password === "admin") {
      dispatch(login());
      navigate("/");
    } else {
      axios
        .post(`${process.env.REACT_APP_KIA}/login`, {
          email: values.email,
          password: values.password,
        })
        .then((user) => {
          console.log(user);
          if (user.status === 200) {
            Cookies.set("token", user.data.token);
            Cookies.set("refresh_token", user.data.refresh);
            dispatch(login());
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          invalidData(err.response.data.message);
        });
    }
  };

  const invalidData = (message) => {
    if (message === "An Email sent to your account please verify") {
      setVerificationError(true);
    } else {
      messageApi.open({
        type: "error",
        content: message,
      });
    }
  };

  const googleLogin = () => {
    window.open(`${process.env.REACT_APP_KIA}/auth/google`, "_self");
  };

  const forgetPassword = () => {
    navigate("/forgetpassword");
  };

  const signUp = () => {
    navigate("/signup");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      event.stopPropagation(); // Stop event propagation
      document.getElementById('submitBtn').click(); // Trigger form submission by clicking the submit button
    }
  };

  return (
    <div className="card-sign card-in">
      {contextHolder}
      <div className="left-card">
        <div className="overlay" id="in">
          <a
            href="https://storyset.com/work"
            className="redirect"
            target="_blank"
          >
            Work illustrations by Storyset
          </a>
        </div>
      </div>
      <div className="right-card">
        <h1 className="title">Login</h1>
        <Button type="primary" onClick={googleLogin}>
          <img
            src={require("../../Assets/icons8-google-48.png")}
            alt="google icon"
            className="google-logo"
          />
          sign in with google
        </Button>{" "}
        <br />
        <div className="middle-hr">
          <span className="middle-text">or sign in with E-mail</span>
        </div>
        <Form
          name="basicform"
          onFinishFailed={() => alert("Failed to submit")}
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter the email",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
            colon=""
          >
            <Input
              placeholder="test123@gmail.com"
              className="logo-user including-user-logo"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter the password",
              },
            ]}
            colon=""
          >
            <Input.Password
              placeholder="123456789"
              className="logo-pass"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onKeyPress={handleKeyPress} // Handle Enter key press

            />
          </Form.Item>
          <Row>
            <Col span={24} align="right">
              <button className="forget" onClick={forgetPassword}>
                Forget password?
              </button>
            </Col>
          </Row>
          {verificationError ? (
            <>
              <div className="login-verification-cont">
                <h3 className="login-verification-message">
                  This email is not verified yet. A Verification mail is re-sent
                  to your account. It will expire after an hour
                </h3>
              </div>
            </>
          ) : (
            <></>
          )}

          <Form.Item>
            <Button type="success" htmlType="submit" className="btn-confirm" id="submitBtn">
              Login
            </Button>
          </Form.Item>
        </Form>
        <span className="not-registered">Not registered yet? </span>
        <span className="create" onClick={signUp}>
          Create an Account
        </span>
      </div>
    </div>
  );
};

export default Login;
