
const reducer = (state = null, action) => {
    switch (action.type) {
    case 'SET_NOTIF': {
        if (state && state.timeout) {
            clearTimeout(state.timeout)
        }
        return action.data
    }
    case 'CLEAR_NOTIF':
        return null
    default:
        return state
    }
}

export const setNotif = (message, type, seconds = 5) => (
    async (dispatch) => {
        const timeout = setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIF',
            })
        }, seconds * 1000)
        dispatch({
            type: 'SET_NOTIF',
            data: {
                message,
                type,
                timeout
            }
        })

        return timeout
    }
)

export default reducer