import { Outlet } from "react-router-dom"
import { Row, Image, Space } from "antd"

const LoginPage = () => (
    <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
        <Space size={5} direction="vertical" >
            <Row type='flex' justify='center' align='middle'>
                <Image
                    preview={false}
                    width={200}
                    src="https://png.pngtree.com/png-vector/20190729/ourlarge/pngtree-lock-security-locked-login-business-flat-line-filled-icon-ve-png-image_1622471.jpg"
                />
            </Row>
            <Outlet />
        </Space>
    </Row>
)

export default LoginPage
