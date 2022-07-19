import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { Spin } from "antd"
import { useNavigate, Outlet } from "react-router-dom"

const RequireAuth = () => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AppContext)
    const navigate = useNavigate()
    let body
    if (authLoading) {
        body = <Spin tip='Loading...' />
    } else if (isAuthenticated) {
        body = <Outlet />
    } else {
        navigate('/login', { replace: true })
    }
    return (
        <>
            {body}
        </>
    )
}

export default RequireAuth
