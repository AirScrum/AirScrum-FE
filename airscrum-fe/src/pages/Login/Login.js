import "./Login.css"
import { Form, Button, Input,Checkbox, Row,Col } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Login = ()=>{
    return (
        <div className="card card-in">
            <div className="left-card">
                <div className="overlay" id="in"></div>
            </div>
            <div className="right-card">
                <h1 className="title">Login</h1>
                <Button type="primary"><img src={require("../../Assets/icons8-google-48.png")} alt="google icon" className="google-logo"/>sign in with google</Button> <br />
                <div className="middle-hr">
                    <span className="middle-text">
                        or sign in with E-mail
                    </span>
                </div>
                <Form
                name="basicform"
                onFinishFailed={() => alert('Failed to submit')}
                onFinish={() => alert('Form Submitted')}
                initialValues={{ remember: true }}
                layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter the email' }]}
                        colon=""
                    >
                        <Input placeholder="test123@gmail.com"className="logo-user"/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter the password' }]}
                        colon=""
                    >
                        <Input.Password placeholder="123456789" className="logo-pass" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                    </Form.Item>
                    <Row>
                        <Col span={12} align="left">
                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} className="remember">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={12} align="right">
                            <button className="forget">Forget password?</button>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="success" htmlType="submit" className="login">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <span className="not-registered">Not registered yet? </span><span className="create">Create an Account</span>
            </div>
        </div>
    )
}

export default Login;