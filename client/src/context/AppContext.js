import { createContext, useContext, useEffect, useReducer } from 'react'
import { checkAuth, setAuthHeader, loginAPI, registerAPI, logoutAPI } from '../api/auth'
import { getListUser, editUser, deleteUser } from '../api/user'
import { AuthReducer } from './reducer'
import { message } from 'antd'
import {
    SET_AUTH_BEGIN,
    SET_AUTH_SUCCESS,
    SET_AUTH_FAILED,
    SET_USER_LIST,
    SET_USER_UPDATE,
    SET_USER_DELETE
} from "./action"

const AppContext = createContext()

export const initState = {
    isLoading: false,
    user: null,
    isAuthenticated: false,
    listUser: []
}

const AppContextProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(AuthReducer, initState)

    const loadUser = async () => {
        console.log("load user");
        if (!localStorage['token']) {
            dispatch({
                type: SET_AUTH_FAILED
            })
            return
        }

        setAuthHeader(localStorage['token'])
        dispatch({
            type: SET_AUTH_BEGIN
        })

        const responseData = await checkAuth()
        if (responseData.success === 'true') {
            dispatch({
                type: SET_AUTH_SUCCESS,
                payload: {
                    user: responseData.user
                }
            })
        }
        if (responseData.success === 'false') {
            localStorage.removeItem('token')
            setAuthHeader(null)
            dispatch({
                type: SET_AUTH_FAILED
            })
        }
    }

    useEffect(() => loadUser(), [])

    const handleLogin = async (loginFormData) => {
        // validate
        const { email, password } = loginFormData
        if (!email || !password) {
            message.warning("Please fill in email and password")
            return
        }
        dispatch({
            type: SET_AUTH_BEGIN
        })
        // Call API
        const responseData = await loginAPI(loginFormData)
        if (responseData.success === 'true') {
            localStorage.setItem('token', responseData.token)
            setAuthHeader(localStorage['token'])
            dispatch({
                type: SET_AUTH_SUCCESS,
                payload: {
                    user: responseData.user
                }
            })
            message.success(responseData.message)
        }
        if (responseData.success === 'false') {
            dispatch({
                type: SET_AUTH_FAILED
            })
            message.error(responseData.message)
        }
    }

    const handleRegister = async (registerFormData) => {
        //validate
        const { name, email, password, rePassword } = registerFormData
        if (!email || !password || !rePassword) {
            message.warning("Please fill in email, password and confirm password")
            return
        }
        if (password !== rePassword) {
            message.warning("Password and confirm password not match!")
            return
        }

        dispatch({
            type: SET_AUTH_BEGIN
        })
        // Call API
        const responseData = await registerAPI({ name, email, password })
        if (responseData.success === 'true') {
            message.success(responseData.message)
        }
        if (responseData.success === 'false') {
            message.error(responseData.message)
        }
        dispatch({
            type: SET_AUTH_FAILED
        })
    }

    const handleLogout = async () => {
        dispatch({
            type: SET_AUTH_BEGIN
        })
        const responseData = await logoutAPI()
        localStorage.removeItem('token')
        dispatch({
            type: SET_AUTH_FAILED
        })
        message.success(responseData.message)
    }

    const handleGetListUser = async () => {
        const responseData = await getListUser()
        const listData = responseData.users.map((item) => {
            return {
                ...item,
                key: item.id
            }
        })
        if (responseData.success === 'true') {
            dispatch({
                type: SET_USER_LIST,
                payload: {
                    users: listData
                }
            })
        }
        if (responseData.success === 'false') {
            message.error(responseData.message)
        }
    }

    const handleEditUser = async (editForm, id) => {
        const responseData = await editUser(editForm, id)
        if (responseData.success === 'true') {
            dispatch({
                type: SET_USER_UPDATE,
                payload: {
                    ...editForm,
                    id
                }
            })
            message.success('Update successfully')
        }
        if (responseData.success === 'false') {
            message.error(responseData.message)
        }
    }

    const handleDelete = async (id) => {
        const responseData = await deleteUser(id)
        if (responseData.success === 'true') {
            dispatch({
                type: SET_USER_DELETE,
                payload: {
                    id: id
                }
            })
            message.success('Delete successfully')
        }
        if (responseData.success === 'false') {
            message.error(responseData.message)
        }
    }

    console.log("context: ", authState);

    const data = {
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetListUser,
        handleEditUser,
        handleDelete,
        authState
    }

    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export default AppContextProvider

export { AppContext, useAppContext }
