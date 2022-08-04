import { useEffect } from "react"
import { useAppContext } from "../../context/AppContext"
import { Spin } from "antd"
import { Outlet, Navigate } from "react-router-dom"

const Auth = () => {
    console.log("Auth");

    const { authState: { isLoading, isAuthenticated } } = useAppContext()
    let body

    if (isLoading) {
        body = (
            <Spin tip="Loading..."></Spin>
        )
    } else if (!isAuthenticated) {
        body = (
            <Outlet />
        )
    } else {
        body = <Navigate to='/home' />
    }


    return (
        <>
            {body}
        </>
    )
}

export default Auth