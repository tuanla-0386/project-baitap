import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { Spin } from "antd"
import { useNavigate, Outlet } from "react-router-dom"

const Auth = () => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AppContext)
    const navigate = useNavigate()
    let body
    if (authLoading) {
        body = <Spin tip='Loading...' />
    } else if (isAuthenticated) {
        navigate('/home', { replace: true })
    } else {
        body = <Outlet />
    }
    return (
        <>
            {body}
        </>
    )
}

export default Auth