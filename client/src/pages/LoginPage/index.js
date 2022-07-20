import { Row, Image } from "antd"
import Center from "../../components/Center"
import { useState } from "react"
import { AppContext } from "../../context/AppContext"
import LoginForm from "../../components/LoginForm"
import RegisterForm from "../../components/RegisterForm"

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <Center>
            <Row type='flex' justify='center' align='middle'>
                <Image
                    preview={false}
                    width={200}
                    src="https://png.pngtree.com/png-vector/20190729/ourlarge/pngtree-lock-security-locked-login-business-flat-line-filled-icon-ve-png-image_1622471.jpg"
                />
            </Row>
            {isLogin && <LoginForm setIsLogin={setIsLogin} />}
            {!isLogin && <RegisterForm setIsLogin={setIsLogin} />}
        </Center>
    )
}

export default LoginPage