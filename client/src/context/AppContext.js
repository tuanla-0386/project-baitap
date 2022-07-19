import { createContext, useEffect, useReducer } from 'react'
import { checkAuth, setAuthHeader, loginAPI, registerAPI, logoutAPI } from '../api/auth'
import { AuthReducer } from './reducer'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    const loadUser = async () => {
        if (localStorage['token']) {
            setAuthHeader(localStorage['token'])
        }

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
            alert("Please fill in email and password")
            return
        }

        // Call API
        const responseData = await loginAPI(loginFormData)
        if (responseData.success === 'true') {
            localStorage.setItem('token', responseData.token)
            await loadUser()
        }
        if (responseData.success === 'false') {
            alert(responseData.message)
        }
    }

    const handleRegister = async (registerFormData) => {
        //validate
        const { name, email, password, rePassword } = registerFormData
        if (!email || !password || !rePassword) {
            alert("Please fill in email, password and confirm password")
            return
        }
        if (password !== rePassword) {
            alert("password and confirm password not match!")
            return
        }

        // Call API
        const responseData = await registerAPI({ name, email, password })
        if (responseData.success === 'true') {
            localStorage.setItem('token', responseData.token)
            await loadUser()
        }
        if (responseData.success === 'false') {
            alert(responseData.message)
        }
    }

    const handleLogout = async () => {
        const responseData = await logoutAPI()
        if (responseData.success === 'true') {
            localStorage.removeItem('token')
            await loadUser()
        }
        if (responseData.success === 'false') {
            alert(responseData.message)
        }
    }


    useEffect(() => loadUser(), [])

    console.log(authState);

    const data = {
        handleLogin,
        handleRegister,
        handleLogout,
        authState
    }

    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
