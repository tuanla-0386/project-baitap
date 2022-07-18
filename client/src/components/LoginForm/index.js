import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })

    const handleLogin = () => {
        console.log(loginInfo);
    }

    return (
        <Form
            name='loginForm'
            className='form'
        >
            <Form.Item
                name='username'
                rules={[{ required: true, message: 'Please input your username' }]}
            >
                <Input prefix={<UserOutlined />} placeholder='Username' onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })} />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder='Password' onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} />
            </Form.Item>

            <Form.Item>
                <Button className='btn' type='primary' onClick={handleLogin}>
                    Log In
                </Button>
                {' '}Or{' '}
                <Link to='/register'>
                    register now!
                </Link>
            </Form.Item>

        </Form>
    );
};

export default LoginForm;