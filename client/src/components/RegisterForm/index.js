import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        password: "",
        rePassword: ""
    })

    const handleRegister = (e) => {
        // Register ...
    }

    return (
        <Form
            name='RegisterForm'
            className='form'
        >
            <Form.Item
                name='username'
                rules={[{ required: true, message: 'Please input your username' }]}
            >
                <Input prefix={<UserOutlined />} placeholder='Username' onChange={(e) => setRegisterInfo({ ...registerInfo, username: e.target.value })} />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder='Password' onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })} />
            </Form.Item>

            <Form.Item
                name='rePassword'
                rules={[{ required: true, message: 'Please input your confirm password' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder='Confirm Password' onChange={(e) => setRegisterInfo({ ...registerInfo, rePassword: e.target.value })} />
            </Form.Item>

            <Form.Item>
                <Button className='btn' type='primary' onClick={handleRegister}>
                    Register
                </Button>
                {' '}Or{' '}
                <Link to='/login'>
                    Already has an account!
                </Link>
            </Form.Item>

        </Form>
    );
};

export default RegisterForm;