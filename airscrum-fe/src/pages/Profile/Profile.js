import "./Profile.css";
import { Form, Button, Input, DatePicker, Avatar, message } from "antd";
import MazenImg from "../../Assets/icons8-male-user-100.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout, login } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import axios from "axios";

const { TextArea } = Input;
const Profile = () => {
    document.body.style = "background: #ffffff !important;";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});
    const [token, setToken] = useState(null);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onChangeAll = (inputs) => {
        form.setFieldsValue({
            email: `${inputs.email}`,
            firstName: `${inputs.firstName}`,
            lastName: `${inputs.lastName}`,
            phoneNo: `${inputs.phoneNo}`,
            birthdate: dayjs(inputs.birthdate).locale("fr"),
            gender: `${inputs.gender}`,
            title: `${inputs.title}`,
            address: `${inputs.address}`,
            bio: `${inputs.bio}`,
        });
    };

    useEffect(() => {
        var token = Cookies.get("token");
        // Check if he has logged in using google

        //console.log(token);
        setToken(token);
        axios
            .get("http://localhost:4000/protected", {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                dispatch(login());
            })
            .catch((err) => {
                console.log(err);
                dispatch(logout());
                navigate("/login");
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:4000/profile", {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setUserProfile(response.data);
                var space = response.data.fullname.indexOf(" ");
                var firstName = response.data.fullname.substring(0, space);
                var lastName = response.data.fullname.substring(space + 1);
                var phoneNo =
                    response.data.phoneNo === undefined
                        ? ""
                        : response.data.phoneNo;
                var birthDate =
                    response.data.birthDate === undefined
                        ? ""
                        : response.data.birthDate;
                var gender =
                    response.data.gender === undefined
                        ? ""
                        : response.data.gender;
                var title =
                    response.data.title === undefined
                        ? ""
                        : response.data.title;
                var address =
                    response.data.address === undefined
                        ? ""
                        : response.data.address;
                var bio =
                    response.data.bio === undefined ? "" : response.data.bio;
                onChangeAll({
                    email: response.data.email,
                    firstName: firstName,
                    lastName: lastName,
                    phoneNo: phoneNo,
                    birthdate: birthDate,
                    gender: gender,
                    title: title,
                    address: address,
                    bio: bio,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);

    const handleSubmit = (values) => {
        axios
            .post(
                "http://localhost:4000/profile",
                {
                    email: values.email,
                    fullName: values.firstName + " " + values.lastName,
                    birthDate: values.birthdate,
                    phoneNo: values.phoneNo,
                    gender: values.gender,
                    title: values.title,
                    address: values.address,
                    bio: values.bio,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((user) => {
                messageApi.open({
                    type: "success",
                    content: "Saved Successfully",
                });
            })
            .catch((err) => {
                console.log(err);
                messageApi.open({
                  type: "error",
                  content: "Something went wrong!",
              });
            });
    };

    return (
        <div className="profile-container">
            {contextHolder}
            <div className="blue-up-cont">
                <div className="invisible">Profile</div>
            </div>
            <div className="white-down-cont">
                <h1 className="title acc-title">Account Settings</h1>
                <div className="acc-settings-cont">
                    <div className="first-left-container">
                        <Avatar
                            size={200}
                            src={MazenImg}
                            className="profile-img"
                        />
                        <h1 className="title acc-title">
                            {userProfile.fullname}
                        </h1>
                        <hr className="name-seperator" />
                    </div>
                    <div className="second-left-container">
                        <h1 className="title acc-title">Account Settings</h1>

                        <Form
                            name="basicform"
                            onFinishFailed={() => alert("Failed to submit")}
                            onFinish={handleSubmit}
                            initialValues={{ remember: true }}
                            layout="vertical"
                            form={form}
                        >
                            <div className="second-flex-container">
                                <div className="first-second-cont">
                                    <Form.Item
                                        label="First Name"
                                        name="firstName"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please enter the first name",
                                            },
                                        ]}
                                        colon=""
                                    >
                                        <Input
                                            className="logo-user without-logo"
                                            value={"aaaaa"}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        name="lastName"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please enter the last name",
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
                                            {
                                                required: true,
                                                message:
                                                    "Please enter the email",
                                            },
                                        ]}
                                        colon=""
                                    >
                                        <Input
                                            placeholder="test123@gmail.com"
                                            className="logo-user without-logo"
                                            value={userProfile.email}
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
                                        <DatePicker
                                            className="logo-user without-logo-birth"
                                            value={userProfile.birthdate}
                                        />
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
                            <Form.Item label="Bio" name="bio" colon="">
                                <TextArea
                                    rows={4}
                                    placeholder="My aim is to make this world a better one"
                                    maxLength={200}
                                    className="logo-user without-logo"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="success"
                                    htmlType="submit"
                                    className="btn-confirm"
                                >
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
