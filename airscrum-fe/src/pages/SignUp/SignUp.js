import "./SignUp.css"
import { Form, Button, Input,Checkbox, DatePicker } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const SignUp = ()=>{

    document.body.style = 'background: #CBC3E3 !important;';

    return (
        <div className="card-sign card-up">
            <div className="left-card">
                <div className="overlay"><a href="https://storyset.com/work" className="redirect" target="_blank">Work illustrations by Storyset</a></div>
            </div>
            <div className="right-card">
                <h1 className="title">Register</h1>
                <br/><br/>
                <Form
                name="basicform"
                onFinishFailed={() => alert('Failed to submit')}
                onFinish={() => alert('Form Submitted')}
                initialValues={{ remember: true }}
                layout="vertical"
                >
                    <Form.Item
                        label="First and Last Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                        colon=""
                    >
                        <Input placeholder="John Smith"className="logo-user including-name-logo"/>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter the email' }]}
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
                    <Form.Item
                        label="Confirm Password"
                        name="password"
                        rules={[{ required: true, message: 'Please re-enter the password' }]}
                        colon=""
                    >
                        <Input.Password placeholder="123456789" className="logo-pass" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Birth Date"
                        name="birthdate"
                        colon=""
                    >
                        <DatePicker className="logo-user birth-date" />
                    </Form.Item>
                    <Form.Item name="agree" valuePropName="checked" className="remember">
                                <Checkbox>I agree to all of the terms and conditions</Checkbox>
                            </Form.Item>
                    
                    <Form.Item>
                        <Button type="success" htmlType="submit" className="btn-confirm">
                            Register
                        </Button>
                    </Form.Item>
                    
                </Form>
                <span className="not-registered">Already have an account? </span><span className="create">Sign in</span>
            </div>
        </div>
    )
}

export default SignUp;