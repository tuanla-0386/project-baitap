export const AuthReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user } } = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
        case 'SETTING_AUTH':
            return {
                ...state,
                authLoading: true,
                isAuthenticated,
                user
            }
        default:
            return state
    }
}