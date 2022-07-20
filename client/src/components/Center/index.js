import { Row, Col } from "antd"

const Center = ({ children }) => {

    return (
        <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
            <Col>
                {children}
            </Col>
        </Row>
    )
}

export default Center