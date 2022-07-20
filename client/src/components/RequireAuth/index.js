import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { Spin } from "antd"
import { useNavigate, Outlet } from "react-router-dom"
import Center from '../../components/Center'

const RequireAuth = () => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AppContext)
    const navigate = useNavigate()
    let body
    if (authLoading) {
        body =
            <Center>
                <Spin size="large" tip='Loading...' />
            </Center>
    } else if (isAuthenticated) {
        body = <Outlet />
    } else {
        navigate('/', { replace: true })
    }
    return (
        <>
            {body}
        </>
    )
}

export default RequireAuth
