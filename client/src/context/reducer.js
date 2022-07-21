import {
    SET_AUTH_BEGIN,
    SET_AUTH_SUCCESS,
    SET_AUTH_FAILED,
    SET_ALERT
} from "./action"

export const AuthReducer = (state, action) => {

    switch (action.type) {
        case SET_AUTH_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case SET_AUTH_FAILED:
            return {
                ...state,
                isLoading: false,
                user: null,
                isAuthenticated: false,
                ...action.payload
            }
        case SET_AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                ...action.payload
            }
        case SET_ALERT:
            return {
                ...state,
                ...action.payload
            }
        default:
            throw new Error("Action not match")
    }
}