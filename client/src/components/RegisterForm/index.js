import { useContext, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const RegisterForm = () => {
    const { handleRegister } = useContext(AppContext)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: ""
    })

    return (
        <Form
            name='RegisterForm'
            className='form'
        >
            <Form.Item
                name='name'
                rules={[
                    { required: true, message: 'Please input your name' }
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder='Name' onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })} />
            </Form.Item>

            <Form.Item
                name='email'
                rules={[
                    { required: true, type: 'email', message: 'Please input your email' }
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder='Email' onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })} />
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
                <Button className='btn' type='primary' onClick={() => handleRegister(registerInfo)}>
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