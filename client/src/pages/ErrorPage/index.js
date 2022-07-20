import { Row, Image, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import Center from '../../components/Center'

const ErrorPage = () => {

    const navigate = useNavigate()

    return (
        <Center>
            <Row type='flex' justify='center' align='middle'>
                <Image
                    preview={false}
                    width={650}
                    src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000"
                />
            </Row>
            <Row type='flex' justify='center' align='middle'>
                <Button onClick={() => navigate(-1)}>
                    Back to home!
                </Button>
            </Row>
        </Center>

    )
}

export default ErrorPage