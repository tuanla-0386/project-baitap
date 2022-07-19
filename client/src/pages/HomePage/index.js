import { Button } from 'antd'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const HomePage = () => {
    const { handleLogout } = useContext(AppContext)

    return (
        <div>
            HomePage
            <Button onClick={handleLogout}>Log out</Button>
        </div>
    )
}

export default HomePage
