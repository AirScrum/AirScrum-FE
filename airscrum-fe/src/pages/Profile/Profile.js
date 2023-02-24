import "./Profile.css";
import { Form, Button, Input, DatePicker, Avatar } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import MazenImg from "../../Assets/mazen.PNG";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

const { TextArea } = Input;
const Profile = () => {

  document.body.style = 'background: #ffffff !important;';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    var token = Cookies.get('token');
    // Check if he has logged in using google
    
    console.log(token)
    axios.get("http://localhost:4000/protected", {
        headers: {
            Authorization: token,
        }
    }).then(res => {
        console.log(res)
        
    }).catch(err => {
        console.log(err)
        dispatch(logout())
        navigate('/login')
    })
    
}, [])
  
  return (
    <div className="profile-container">
      <div className="blue-up-cont">
        <div className="invisible">Profile</div>
      </div>
      <div className="white-down-cont">
        <h1 className="title acc-title">Account Settings</h1>
        <div className="acc-settings-cont">
          <div className="first-left-container">
            <Avatar size={200} src={MazenImg} className="profile-img" />
            <h1 className="title acc-title">Mazen Mahmoud</h1>
						<hr className="name-seperator"/>
          </div>
          <div className="second-left-container">
            <h1 className="title acc-title">Account Settings</h1>

            <Form
              name="basicform"
              onFinishFailed={() => alert("Failed to submit")}
              onFinish={() => alert("Form Submitted")}
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <div className="second-flex-container">
                <div className="first-second-cont">
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the first name",
                      },
                    ]}
                    colon=""
                  >
                    <Input
                      placeholder="John"
                      className="logo-user without-logo"
                    />
                  </Form.Item>
									<Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the last name",
                      },
                    ]}
                    colon=""
                  >
                    <Input
                      placeholder="Smith"
                      className="logo-user without-logo"
                    />
                  </Form.Item>
									
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter the email" },
                    ]}
                    colon=""
                  >
                    <Input
                      placeholder="test123@gmail.com"
                      className="logo-user without-logo"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter the password" },
                    ]}
                    colon=""
                  >
                    <Input.Password
                      placeholder="123456789"
                      className="logo-pass without-logo"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
									<Form.Item
                    label="Phone Number"
                    name="phoneNo"
                    colon=""
                  >
                    <Input
                      placeholder="(+20)115566454)"
                      className="logo-user without-logo"
                    />
                  </Form.Item>

                </div>
                <div className="second-second-cont">
									<Form.Item
                    label="Birth Date"
                    name="birthdate"
                    colon=""
                  >
                    <DatePicker className="logo-user without-logo-birth" />
                  </Form.Item>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    colon=""
                  >
                    <Input
                      placeholder="Male"
                      className="logo-user without-logo"
                    />
                  </Form.Item>
									<Form.Item
                    label="Title"
                    name="title"
                    colon=""
                  >
                    <Input
                      placeholder="Front-end Engineer"
                      className="logo-user without-logo"
                    />
                  </Form.Item>

									<Form.Item
                    label="Company Name"
                    name="companyName"
                    colon=""
                  >
                    <Input
                      placeholder="Google"
                      className="logo-user without-logo"
                    />
                  </Form.Item>
									<Form.Item
                    label="Address"
                    name="address"
                    colon=""
                  >
                    <Input
                      placeholder="Villa 105, Street 105, Manhattan, New York"
                      className="logo-user without-logo"
                    />
                  </Form.Item>
                </div>
              </div>
							<Form.Item
                    label="Bio"
                    name="bio"
                    colon=""
                  >
										<TextArea rows={4} placeholder="My aim is to make this world a better one" maxLength={200} className="logo-user without-logo"/>
              </Form.Item>
							<Form.Item>
                <Button type="success" htmlType="submit" className="btn-confirm">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
