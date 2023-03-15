import "./ResetPassword.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    document.body.style = "background: #CBC3E3 !important;";

    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:4000/${param.id}/validate/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
            }
        };
        verifyEmailUrl();
    }, []);

    const handleSubmit = (values) => {
        if (values.password !== values.confirmPassword) {
            invalidData("Passwords do not match");
        }

        else{
            axios
            .post(`http://localhost:4000/${param.id}/reset/${param.token}`, {
                password: values.password,
            })
            .then((user) => {
                console.log(user);
                messageApi.open({
                    type: 'success',
                    content: "Password Changed Successfully. Navigating to login...",
                });
                setTimeout(function () {
                    navigate("/login");
                }, 3000);
                
            })
            .catch((err) => {
                console.log(err);
                invalidData(err.response.data.message)
            });
        }
    };

    const invalidData = (message) => {
        messageApi.open({
            type: "error",
            content: message,
        });
    };

    return (
        <div>
            {validUrl ? (
                <div className="card-sign card-reset">
                    {contextHolder}
                    <div className="left-card">
                        <div className="overlay" id="reset">
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
                        <h1 className="title">Forget Password</h1>
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
                                label="New Password"
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
                                        visible ? (
                                            <EyeTwoTone />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )
                                    }
                                />
                            </Form.Item>

                            <Form.Item
                                label="Confirm Password"
                                name="confirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter the confirm password",
                                    },
                                ]}
                                colon=""
                            >
                                <Input.Password
                                    placeholder="123456789"
                                    className="logo-pass"
                                    iconRender={(visible) =>
                                        visible ? (
                                            <EyeTwoTone />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )
                                    }
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="success"
                                    htmlType="submit"
                                    className="btn-confirm"
                                >
                                    Change Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </div>
    );
};

export default ResetPassword;
