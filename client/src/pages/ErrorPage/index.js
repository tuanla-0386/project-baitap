import { Row, Col, Image, Button } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'

const ErrorPage = () => {
    return (
        <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
            <Col>
                <Row type='flex' justify='center' align='middle'>
                    <Image
                        preview={false}
                        width={650}
                        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000"
                    />
                </Row>
                <Row type='flex' justify='center' align='middle'>
                    <Link to='/login'>
                        <Button>
                            Back to home!
                        </Button>
                    </Link>
                </Row>
            </Col>
        </Row>
    )
}

export default ErrorPage