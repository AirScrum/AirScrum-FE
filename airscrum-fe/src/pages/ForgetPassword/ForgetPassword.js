import "./ForgetPassowrd.css";
import { Form, Button, Input, message } from "antd";
import axios from "axios";

const ForgetPassword = () => {
    document.body.style = "background: #CBC3E3 !important;";

    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = (values) => {
        console.log(values.email);
        axios
            .post("http://localhost:4000/forget", {
                email: values.email,
            })
            .then((response) => {
                console.log(response);
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
                        <br />
                        <br />
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
