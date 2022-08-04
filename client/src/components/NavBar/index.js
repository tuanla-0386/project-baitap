import { Button, Row, Col, Image, Dropdown, Menu, Table, Space } from 'antd'
import { Link } from 'react-router-dom'
import { DownOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppContext } from '../../context/AppContext'

const NavBar = () => {
    const { handleLogout, handleGetListUser, authState: { user, listUser } } = useAppContext()

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link to={`/home/profile/${user.id}`}>
                            <Button className='dropdown-item'>
                                Profile
                            </Button>
                        </Link>
                    )
                },
                {
                    key: '2',
                    label: (
                        <Button onClick={handleLogout} className='dropdown-item'>
                            Logout
                        </Button>
                    )
                }
            ]}
        />
    )

    return (
        <Row>
            <Col span={3} className='center'>
                <Image
                    src='https://sun-asterisk.vn/wp-content/uploads/2020/10/logo-sun@2x.png'
                    preview={false}
                    width={100}
                    height={40}
                />
            </Col>
            <Col span={17}></Col>
            <Col span={4}>
                <Dropdown overlay={menu} className='pointer'>
                    <Row>
                        <Col span={6} className='center'>
                            <Image
                                src='https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png'
                                preview={false}
                                width={40}
                                height={40}
                                style={{ borderRadius: '50%' }}
                            />
                        </Col>
                        <Col span={14}>
                            <Row>
                                <div style={{ fontSize: '20px' }}>{user && user.name}</div>
                            </Row>
                            <Row>
                                <div style={{ fontSize: '10px' }}>
                                    {user && (user.role === 1 ? 'Admin' : 'Staff')}
                                </div>
                            </Row>
                        </Col>
                        <Col span={4} className='center'>
                            <DownOutlined />
                        </Col>
                    </Row>
                </Dropdown>
            </Col>
        </Row>
    )
}

export default NavBar
