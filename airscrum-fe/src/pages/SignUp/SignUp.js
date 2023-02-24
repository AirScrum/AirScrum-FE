import "./SignUp.css"
import { Form, Button, Input,Checkbox, DatePicker } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { logout } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

const SignUp = ()=>{

    document.body.style = 'background: #CBC3E3 !important;';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    dispatch(logout())

    useEffect(() => {
        Cookies.set('token', null);
    }, [])

    const signIn = () => {
        navigate('/login');
    };

    const handleSubmit = (values) => {

        /**
         * Validation  on data
         */
        axios.post("http://localhost:4000/register", { fullName: values.name, email:values.email, password:values.password, birthDate:JSON.stringify(values.birthdate).slice(0,11) }).then(user => {
            console.log(user);
            navigate('/login')
        }).catch(err => {
            console.log(err);
        })
    }

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
                onFinish={handleSubmit}
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
                    <Form.Item
                        label="Confirm Password"
                        name="confirmpassword"
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
                    <Form.Item name="agree" valuePropName="checked" className="remember" rules={[{ required: true, message: 'Please agree to our terms and conditions' }]}>
                                <Checkbox>I agree to all of the terms and conditions</Checkbox>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="success" htmlType="submit" className="btn-confirm">
                            Register
                        </Button>
                    </Form.Item>
                    
                </Form>
                <span className="not-registered">Already have an account? </span><span className="create"  onClick={signIn}>Sign in</span>
            </div>
        </div>
    )
}

export default SignUp;