import commentService from '../services/comments'
import { setNotif } from '../reducers/notificationReducer'

const reducer = (state = [], action) => {
    switch(action.type) {
    case 'ADD_COMMENT':
        return state.concat(action.data)
    case 'INIT_COMMENTS':
        return action.data
    default: return state
    }
}

export const initComments = () => {
    return async dispatch => {
        const comments = await commentService.getAll()
        dispatch({
            type: 'INIT_COMMENTS',
            data: comments
        })
    }
}

export const addComment = (comment, blogId) => {
    return async dispatch => {
        try {
            const newBlog = await commentService.createNew({ content: comment }, blogId)
            console.log(newBlog)
            dispatch({
                type: 'ADD_COMMENT',
                data: newBlog
            })
        } catch (exception) {
            dispatch(setNotif(exception.response.data.error, 'error'))
        }
    }
}

export default reducer