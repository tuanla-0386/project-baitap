import { createContext, useContext, useEffect, useReducer } from 'react'
import { checkAuth, setAuthHeader, loginAPI, registerAPI, logoutAPI } from '../api/auth'
import { AuthReducer } from './reducer'
import { message } from 'antd'
import {
    SET_AUTH_BEGIN,
    SET_AUTH_SUCCESS,
    SET_AUTH_FAILED,
    SET_ALERT
} from "./action"

const AppContext = createContext()

const initState = {
    isLoading: false,
    user: null,
    isAuthenticated: false,
    alert_type: "",
    alert_message: ""
}

const AppContextProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(AuthReducer, initState)

    const loadUser = async () => {
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
                    user: responseData.user,
                    alert_type: "success",
                    alert_message: "Login successfully"
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
    const handleLogin = async (loginFormData) => {
        // validate
        const { email, password } = loginFormData
        if (!email || !password) {
            dispatch({
                type: SET_ALERT,
                payload: {
                    alert_type: "waring",
                    alert_message: "Please fill in email and password"
                }
            })
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
                    user: responseData.user,
                    alert_type: "success",
                    alert_message: responseData.message
                }
            })
        }
        if (responseData.success === 'false') {
            dispatch({
                type: SET_AUTH_FAILED,
                payload: {
                    alert_type: "error",
                    alert_message: responseData.message
                }
            })
        }
    }

    const handleRegister = async (registerFormData) => {
        //validate
        const { name, email, password, rePassword } = registerFormData
        if (!email || !password || !rePassword) {
            dispatch({
                type: SET_ALERT,
                payload: {
                    alert_type: "warning",
                    alert_message: "Please fill in email, password and confirm password"
                }
            })
            return
        }
        if (password !== rePassword) {
            dispatch({
                type: SET_ALERT,
                payload: {
                    alert_type: "warning",
                    alert_message: "Password and confirm password not match!"
                }
            })
            return
        }

        dispatch({
            type: SET_AUTH_BEGIN
        })
        // Call API
        const responseData = await registerAPI({ name, email, password })
        if (responseData.success === 'true') {
            dispatch({
                type: SET_ALERT,
                payload: {
                    alert_type: "success",
                    alert_message: responseData.message
                }
            })
        }
        if (responseData.success === 'false') {
            dispatch({
                type: SET_ALERT,
                payload: {
                    alert_type: "error",
                    alert_message: responseData.message
                }
            })
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
            type: SET_AUTH_FAILED,
            payload: {
                alert_type: "success",
                alert_message: responseData.message
            }
        })
    }

    console.log(authState);

    useEffect(() => loadUser(), [])

    useEffect(() => {
        if (authState.alert_message) {
            message[authState.alert_type](authState.alert_message)
            dispatch({
                type: SET_ALERT,
                payload: {
                    alert_type: "",
                    alert_message: ""
                }
            })
        }
    }, [authState])

    const data = {
        handleLogin,
        handleRegister,
        handleLogout,
        authState,
        loadUser
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
