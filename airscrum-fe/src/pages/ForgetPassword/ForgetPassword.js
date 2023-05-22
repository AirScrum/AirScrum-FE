import "./ForgetPassowrd.css";
import { Form, Button, Input, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ForgetPassword = () => {
    document.body.style = "background: #CBC3E3 !important;";

    const [messageApi, contextHolder] = message.useMessage();
    const [verificationError, setVerificationError] = useState(false);

    const handleSubmit = (values) => {
        console.log(values.email);
        axios
            .post(`${process.env.REACT_APP_KIA}/forget`, {
                email: values.email,
            })
            .then((response) => {
                setVerificationError(true)
            })
            .catch((err) => {
                console.log(err);
                invalidData(err.response.data.message);
            });
    };

    const invalidData = (message) => {
        messageApi.open({
            type: "error",
            content: message,
        });
    };

    return (
        <div className="card-sign card-forget">
            {contextHolder}
            <div className="left-card">
                <div className="overlay" id="forget">
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
                <br />
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

                    <Form.Item>
                        {verificationError ? (
                            <>
                                <div className="login-verification-cont">
                                    <h3 className="login-verification-message">
                                        A link has been sent to your email. Please click it to reset password and close this tab
                                    </h3>
                                </div>
                            </>
                        ) : (
                            <>
                                <br />
                                <br />
                            </>
                        )}

                        <Button
                            type="success"
                            htmlType="submit"
                            className="btn-confirm"
                        >
                            Send E-mail
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ForgetPassword;
