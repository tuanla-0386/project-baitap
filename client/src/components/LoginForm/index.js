import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const { handleLogin } = useContext(AppContext)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    return (
        <Form
            name='loginForm'
            className='form'
        >
            <Form.Item
                name='email'
                rules={[
                    { required: true, type: 'email', message: 'Please input your email' }
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder='Email' onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })} />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder='Password' onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} />
            </Form.Item>

            <Form.Item>
                <Button className='btn' type='primary' onClick={() => handleLogin(loginInfo)}>
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