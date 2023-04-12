import "./SignUp.css";
import {
  Form,
  Button,
  Input,
  Checkbox,
  DatePicker,
  Modal,
  message,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { logout } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const SignUp = () => {
  document.body.style = "background: #CBC3E3 !important;";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  dispatch(logout());

  useEffect(() => {
    Cookies.set("token", null);
  }, []);

  const signIn = () => {
    navigate("/login");
  };

  const handleSubmit = (values) => {
    /**
     * Validation  on data
     */

    if (values.password !== values.confirmPassword) {
      messageApi.open({
        type: "error",
        content: "Passwords do not match",
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_KIA}/register`, {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          birthDate:
            values.birthDate === undefined
              ? undefined
              : JSON.stringify(values.birthDate).slice(1, 11),
        })
        .then((user) => {
          console.log(user);
          messageApi.open({
            type: "warning",
            content: user.data.message,
          });
          setTimeout(function () {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          messageApi.open({
            type: "warning",
            content: err.response.data.message,
          });
        });
    }
  };

  return (
    <div className="card-sign card-up">
      {contextHolder}
      <div className="left-card">
        <div className="overlay">
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
        <h1 className="title">Register</h1>
        <br />
        <br />
        <Form
          name="basicform"
          onFinishFailed={() => alert("Failed to submit")}
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please enter your first name",
              },
            ]}
            colon=""
          >
            <Input
              placeholder="John Smith"
              className="logo-user including-name-logo"
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please enter your last name",
              },
            ]}
            colon=""
          >
            <Input
              placeholder="John Smith"
              className="logo-user including-name-logo"
            />
          </Form.Item>

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
              {
                min: 12,
                message: "Password should be 12 characters minimum",
              },
              {
                max: 15,
                message: "Password should be 15 characters maximum",
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
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please re-enter the password",
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
            />
          </Form.Item>

          <Form.Item label="Birth Date" name="birthDate" colon="">
            <DatePicker className="logo-user birth-date" />
          </Form.Item>
          <Form.Item
            name="agree"
            valuePropName="checked"
            className="remember"
            rules={[
              {
                required: true,
                message: "Please agree to our terms and conditions",
              },
            ]}
          >
            <Checkbox>
              I agree to all of the{" "}
              <span onClick={showModal} className="terms-cons">
                terms and conditions
              </span>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="success" htmlType="submit" className="btn-confirm">
              Register
            </Button>
          </Form.Item>
        </Form>
        <span className="not-registered">Already have an account? </span>
        <span className="create" onClick={signIn}>
          Sign in
        </span>
      </div>
      <Modal
        title="Popup Title"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
      >
        <h3>Terms and Conditions</h3>
        <p>
          Welcome to AirScrum! These terms and conditions outline the rules and
          regulations for the use of AirScrum's Website, located at
          www.airscrum.com. By accessing this website we assume you accept these
          terms and conditions. Do not continue to use AirScrum if you do not
          agree to take all of the terms and conditions stated on this page. The
          following terminology applies to these Terms and Conditions, Privacy
          Statement and Disclaimer Notice and all Agreements: "Client", "You"
          and "Your" refers to you, the person log on this website and compliant
          to the Company’s terms and conditions. "The Company", "Ourselves",
          "We", "Our" and "Us", refers to our Company. "Party", "Parties", or
          "Us", refers to both the Client and ourselves. All terms refer to the
          offer, acceptance and consideration of payment necessary to undertake
          the process of our assistance to the Client in the most appropriate
          manner for the express purpose of meeting the Client’s needs in
          respect of provision of the Company’s stated services, in accordance
          with and subject to, prevailing law of Netherlands. Any use of the
          above terminology or other words in the singular, plural,
          capitalization and/or he/she or they, are taken as interchangeable and
          therefore as referring to same.
        </p>
        <h3>Cookies</h3>
        <p>
          We employ the use of cookies. By accessing AirScrum, you agreed to use
          cookies in agreement with the AirScrum's Privacy Policy. Most
          interactive websites use cookies to let us retrieve the user’s details
          for each visit. Cookies are used by our website to enable the
          functionality of certain areas to make it easier for people visiting
          our website. Some of our affiliate/advertising partners may also use
          cookies.
        </p>

        <h3>License</h3>
        <p>
          Unless otherwise stated, AirScrum and/or its licensors own the
          intellectual property rights for all material on AirScrum. All
          intellectual property rights are reserved. You may access this from
          AirScrum for your own personal use subjected to restrictions set in
          these terms and conditions. You must not:{" "}
          <ul>
            <li>Republish material from AirScrum Sell</li>
            <li>rent or sub-license material from AirScrum </li>
            <li>Reproduce, duplicate or copy material from AirScrum</li>
            <li>Redistribute content from AirScrum </li>
          </ul>{" "}
          This Agreement shall begin on the date hereof. Our Terms and
          Conditions were created with the help of the Free Terms and Conditions
          Generator. Parts of this website offer an opportunity for users to
          post and exchange opinions and information in certain areas of the
          website. AirScrum does not filter, edit, publish or review Comments
          prior to their presence on the website. Comments do not reflect the
          views and opinions of AirScrum,its agents and/or affiliates. Comments
          reflect the views and opinions of the person who post their views and
          opinions. To the extent permitted by applicable laws, AirScrum shall
          not be liable for the Comments or for any liability, damages or
          expenses caused and/or suffered as a result of any use of and/or
          posting of and/or appearance of the Comments on this website. AirScrum
          reserves the right to monitor all Comments and to remove any Comments
          which can be considered inappropriate, offensive or causes breach of
          these Terms and Conditions. You warrant and represent that:
          <ul>
            <li>
              You are entitled to post the Comments on our website and have all
              necessary licenses and consents to do so;
            </li>
            <li>
              The Comments do not invade any intellectual property right,
              including without limitation copyright, patent or trademark of any
              third party;
            </li>
            <li>
              The Comments do not contain any defamatory, libelous, offensive,
              indecent or otherwise unlawful material which is an invasion of
              privacy
            </li>
            <li>
              The Comments will not be used to solicit or promote business or
              custom or present commercial activities or unlawful activity.
            </li>
            <li>
              You hereby grant AirScrum a non-exclusive license to use,
              reproduce, edit and authorize others to use, reproduce and edit
              any of your Comments in any and all forms, formats or media.
            </li>
          </ul>
        </p>
      </Modal>
    </div>
  );
};

export default SignUp;
