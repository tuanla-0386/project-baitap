import { useEffect } from "react"
import { useAppContext } from "../../context/AppContext"
import { Spin } from "antd"
import { useNavigate, Outlet } from "react-router-dom"

const Auth = () => {
    console.log("Auth");

    const { authState: { isLoading, isAuthenticated } } = useAppContext()
    const navigate = useNavigate()
    let body
    if (isLoading) {
        body = <Spin tip="Loading...">
            <Outlet />
        </Spin>
    } else if (isAuthenticated) {
        navigate('/home', { replace: true })
    } else {
        body = <Outlet />
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home', { replace: true })
        }
    }, [])


    return (
        <>
            {body}
        </>
    )
}

export default Auth