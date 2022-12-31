import "./Login.css"
import { Form, Button, Input,Checkbox, Row,Col,message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login,logout } from "../../redux/userRedux";

const Login = ()=>{

    document.body.style = 'background: #CBC3E3 !important;';

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    dispatch(logout())

    const handleSubmit = (values) => {
        const email = values.email
        const password = values.password
        if(email ==="admin@gmail.com" && password==="admin"){
            dispatch(login())
            navigate('/');
        }
        else{
            errorEmail()
        }
    }

    const errorEmail = () => {
        messageApi.open({
            type: 'error',
            content: 'Email does not exist in our system',
        });
    };

    const errorPassword = () => {
        messageApi.open({
            type: 'error',
            content: 'Incorrect password',
        });
    };

    const signUp = () => {
        navigate('/signup');
    };

    return (
        <div className="card-sign card-in">
            {contextHolder}
            <div className="left-card">
            <div className="overlay" id="in"><a href="https://storyset.com/work" className="redirect" target="_blank">Work illustrations by Storyset</a></div>
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
                onFinish={handleSubmit}
                initialValues={{ remember: true }}
                layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter the email' },{type: 'email', message: 'The input is not valid E-mail!'}]}
                        colon=""
                    >
                        <Input placeholder="test123@gmail.com"className="logo-user including-user-logo"/>
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
                        <Button type="success" htmlType="submit" className="btn-confirm">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <span className="not-registered">Not registered yet? </span><span className="create" onClick={signUp}>Create an Account</span>
            </div>
        </div>
    )
}

export default Login;