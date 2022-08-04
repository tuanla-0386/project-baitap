import { Col, Row, Image } from 'antd'
import React from 'react'
import './index.scss'

const formDate = (created_at) => {
    return created_at.split('.')[0].split('T').join(' ')
}

const ProfileItem = ({ user: { id, name, email, phone, address, role, created_at } }) => {

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
                        <b>ID:</b> {id}<br />
                        <b>Name:</b> {name}<br />
                        <b>Email:</b> {email}<br />
                        <b>Phone:</b> {phone}<br />
                        <b>Address:</b> {address}<br />
                        <b>Role:</b> {role === 1 ? "Admin" : "Staff"}<br />
                        <b>Join day:</b> {formDate(created_at)}
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ProfileItem