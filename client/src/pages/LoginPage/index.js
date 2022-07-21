import { Row, Image, Button, Form, Col, Input } from "antd"
import { useState } from "react"
import { useAppContext } from "../../context/AppContext"
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const LoginPage = () => {
    const { handleLogin, handleRegister } = useAppContext()
    const [isLogin, setIsLogin] = useState(true)
    const [authInfo, setAuthInfo] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: ""
    })

    const authAction = () => {
        if (isLogin) {
            const { email, password } = authInfo
            handleLogin({ email, password })
        }
        if (!isLogin) {
            handleRegister(authInfo)
        }
    }

    return (
        <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
            <Col>
                <Row type='flex' justify='center' align='middle'>
                    <Image
                        preview={false}
                        width={200}
                        src="https://png.pngtree.com/png-vector/20190729/ourlarge/pngtree-lock-security-locked-login-business-flat-line-filled-icon-ve-png-image_1622471.jpg"
                    />
                </Row>
                {/* {isLogin ? "Login" : "Register"} */}
                <Form
                    name='authForm'
                    className='form'
                >
                    {!isLogin &&
                        <Form.Item
                            name='name'
                            rules={[
                                { required: true, message: 'Please input your name' }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder='Name' onChange={(e) => setAuthInfo({ ...authInfo, name: e.target.value })} />
                        </Form.Item>
                    }
                    <Form.Item
                        name='email'
                        rules={[
                            { required: true, type: 'email', message: 'Please input your email' }
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='Email' onChange={(e) => setAuthInfo({ ...authInfo, email: e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[{ required: true, message: 'Please input your password' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='Password' onChange={(e) => setAuthInfo({ ...authInfo, password: e.target.value })} />
                    </Form.Item>

                    {!isLogin &&
                        <Form.Item
                            name='rePassword'
                            rules={[{ required: true, message: 'Please input your confirm password' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder='Confirm Password' onChange={(e) => setAuthInfo({ ...authInfo, rePassword: e.target.value })} />
                        </Form.Item>
                    }

                    <Form.Item>
                        <Button className='btn' type='primary' onClick={authAction}>
                            {isLogin ? "Log in" : "Register"}
                        </Button>
                        {' '}Or{' '}
                        <Button onClick={() => setIsLogin((prev) => !prev)}>
                            {isLogin ? "register now!" : "Already has an account!"}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default LoginPage