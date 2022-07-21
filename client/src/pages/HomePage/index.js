import { Button } from 'antd'
import { useAppContext } from '../../context/AppContext'

const HomePage = () => {
    const { handleLogout } = useAppContext()

    return (
        <div>
            HomePage
            <Button onClick={handleLogout}>Log out</Button>
        </div>
    )
}

export default HomePage
