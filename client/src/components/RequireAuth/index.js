import { Spin } from "antd"
import { Outlet, Navigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"

const RequireAuth = () => {
    console.log("RequireAuth");
    const { authState: { isLoading, isAuthenticated }, } = useAppContext()

    if (isLoading) {
        return (
            <Spin tip="Loading..." size={"large"}></Spin>
        )
    }

    return (
        <>
            {isAuthenticated ? (
                <Outlet />
            ) : (
                <Navigate to='/' />
            )}
        </>
    )
}

export default RequireAuth
