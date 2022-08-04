import { Col, Row, Image, Form, Button, Input } from 'antd'
import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import './index.scss'

const EditForm = ({ user: { id, name, email, phone, address, role, create_at } }) => {
    const { handleEditUser } = useAppContext()
    const [editInfo, setEditInfo] = useState({
        name: name,
        email: email,
        phone: phone,
        address: address,
        role: role
    })

    const update = () => {
        handleEditUser(editInfo, id)
    }

    return (
        <Row type='flex' justify='center' align='middle' style={{ minHeight: '500px' }}>
            <Col>
                <div className='card'>
                    <div>
                        <Image
                            preview={false}
                            className='card-image'
                            src='https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png'
                        />
                    </div>
                    <div>
                        <Form
                            name='editForm'
                        >
                            <Form.Item
                                name='name'
                                rules={[
                                    { required: true, message: 'Please input your name' }
                                ]}
                            >
                                <Input defaultValue={editInfo.name} placeholder='Name' onChange={(e) => setEditInfo({ ...editInfo, name: e.target.value })} />
                            </Form.Item>
                            <Form.Item
                                name='email'
                                rules={[
                                    { required: true, type: 'email', message: 'Please input your email' }
                                ]}
                            >
                                <Input defaultValue={editInfo.email} placeholder='Email' onChange={(e) => setEditInfo({ ...editInfo, email: e.target.value })} />
                            </Form.Item>
                            <Form.Item
                                name='phone'
                                rules={[
                                    { required: true, message: 'Please input your phone' }
                                ]}
                            >
                                <Input defaultValue={editInfo.phone} placeholder='Phone' onChange={(e) => setEditInfo({ ...editInfo, phone: e.target.value })} />
                            </Form.Item>
                            <Form.Item
                                name='address'
                                rules={[
                                    { required: true, message: 'Please input your address' }
                                ]}
                            >
                                <Input defaultValue={editInfo.address} placeholder='Address' onChange={(e) => setEditInfo({ ...editInfo, address: e.target.value })} />
                            </Form.Item>
                            <Form.Item
                                name='role'
                            >
                                <Input defaultValue={editInfo.role} placeholder='Role' onChange={(e) => setEditInfo({ ...editInfo, role: e.target.value })} />
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={update}>Update</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default EditForm