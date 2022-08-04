import { Button, Table, Space, Modal } from 'antd'
import { useAppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { DownOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { useNavigate } from 'react-router-dom'

const formDate = (created_at) => {
    return created_at.split('.')[0].split('T').join(' ')
}

const HomePage = () => {
    const { handleLogout, handleGetListUser, handleDelete, authState: { user, listUser } } = useAppContext()
    const navigate = useNavigate()

    const [selectedId, setSelectedId] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (id) => {
        setSelectedId(id)
        setIsModalVisible(true)
    };

    const handleOk = () => {
        handleDelete(selectedId)
        setSelectedId(null)
        setIsModalVisible(false)
    };

    const handleCancel = () => {
        setSelectedId(null)
        setIsModalVisible(false)
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Join date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (_, record) => (
                <div>
                    {formDate(record.created_at)}
                </div>
            )
        },
        {
            title: 'Role',
            key: 'role',
            render: (_, record) => (
                <div>
                    {record.role === 1 ? 'Admin' : 'Staff'}
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) =>
            (<>
                {user.role === 1 &&
                    <Space size="middle">
                        <Button onClick={() => navigate(`/home/edit/${record.id}`)}>
                            <EditOutlined />
                        </Button>
                        <Button onClick={() => showModal(record.id)}>
                            <DeleteOutlined />
                        </Button>
                    </Space>
                }
            </>
            )
        }
    ];

    useEffect(() => {
        // console.log("get list user");
        handleGetListUser()
    }, [])

    return (
        <div style={{ padding: '10px' }}>
            <NavBar />
            <Table
                dataSource={listUser}
                columns={columns}
                pagination={{
                    pageSizeOptions: [10, 15, 20],
                    responsive: true,
                    showSizeChanger: true,
                    size: 'small',
                    position: ['topLeft']
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: event => {
                            navigate(`/home/profile/${record.id}`)
                        }
                    };
                }}
            />
            <Modal title="Delete user" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Do you want to delete this user?</p>
            </Modal>
        </div>
    )
}

export default HomePage
