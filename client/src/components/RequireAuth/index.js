import { Spin } from "antd"
import { useNavigate, Outlet } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"

const RequireAuth = () => {

    const { authState: { isLoading, isAuthenticated } } = useAppContext()
    const navigate = useNavigate()
    let body
    if (isLoading) {
        body =
            <Spin tip="Loading...">
                <Outlet />
            </Spin>
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
