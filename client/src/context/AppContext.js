import { createContext, useEffect, useReducer, useState } from 'react'
import { checkAuth, setAuthHeader, loginAPI, registerAPI, logoutAPI } from '../api/auth'
import { AuthReducer } from './reducer'
import { message } from 'antd'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    const [alert, setAlert] = useState({
        type: "",
        message: ""
    })

    const loadUser = async () => {
        if (!localStorage['token']) {
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    ...authState,
                    isAuthenticated: false,
                    user: null
                }
            })
            return
        }

        setAuthHeader(localStorage['token'])
        dispatch({
            type: 'SETTING_AUTH',
            payload: {
                isAuthenticated: false,
                user: null
            }
        })

        const responseData = await checkAuth()
        if (responseData.success === 'true') {
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: true,
                    user: responseData.user
                }
            })
        }
        if (responseData.success === 'false') {
            localStorage.removeItem('token')
            setAuthHeader(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }

    const handleLogin = async (loginFormData) => {
        // validate
        const { email, password } = loginFormData
        if (!email || !password) {
            setAlert({
                type: "warning",
                message: "Please fill in email and password"
            })
            return
        }

        // Call API
        const responseData = await loginAPI(loginFormData)
        if (responseData.success === 'true') {
            localStorage.setItem('token', responseData.token)
            await loadUser()
            setAlert({
                type: "success",
                message: responseData.message
            })
        }
        if (responseData.success === 'false') {
            setAlert({
                type: "error",
                message: responseData.message
            })
        }
    }

    const handleRegister = async (registerFormData) => {
        //validate
        const { name, email, password, rePassword } = registerFormData
        if (!email || !password || !rePassword) {
            setAlert({
                type: "warning",
                message: "Please fill in email, password and confirm password"
            })
            return
        }
        if (password !== rePassword) {
            setAlert({
                type: "warning",
                message: "Password and confirm password not match!"
            })
            return
        }

        dispatch({
            type: 'SETTING_AUTH',
            payload: {
                ...authState,
                authLoading: true
            }
        })
        // Call API
        const responseData = await registerAPI({ name, email, password })
        if (responseData.success === 'true') {
            localStorage.setItem('token', responseData.token)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    ...authState,
                    authLoading: false
                }
            })
            setAlert({
                type: "success",
                message: responseData.message
            })
        }
        if (responseData.success === 'false') {
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    ...authState,
                    authLoading: false
                }
            })
            setAlert({
                type: "error",
                message: responseData.message
            })
        }
    }

    const handleLogout = async () => {
        const responseData = await logoutAPI()
        if (responseData.success === 'true') {
            localStorage.removeItem('token')
            await loadUser()
            setAlert({
                type: "success",
                message: responseData.message
            })
        }
        if (responseData.success === 'false') {
            setAlert({
                type: "error",
                message: responseData.message
            })
        }
    }

    console.log(authState);

    useEffect(() => loadUser(), [])

    useEffect(() => {
        if (alert.message) {
            message[alert.type](alert.message)
        }
    }, [alert])

    const data = {
        handleLogin,
        handleRegister,
        handleLogout,
        authState,
        loadUser,
        alert
    }

    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
