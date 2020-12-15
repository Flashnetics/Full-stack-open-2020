import blogService from '../services/blogs'
import { setNotif } from './notificationReducer'

const reducer = (state = [], action) => {
    switch(action.type) {
    case 'ADD_BLOG':
        return state.concat(action.data)
    case 'INIT_BLOGS':
        return action.data
    case 'LIKE_BLOG':
        return state.map(blog => (
            blog.id !== action.data.id ? blog : action.data
        ))
    case 'REMOVE_BLOG':
        return state.filter(blog => (
            blog.id !== action.data
        ))
    default: return state
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        try {
            await blogService.deleteBlog(blog.id)
            dispatch(setNotif(`Deleted ${blog.title} by ${blog.author}`, 'success'))
            dispatch({
                type: 'REMOVE_BLOG',
                data: blog.id
            })
        } catch (exception) {
            dispatch(setNotif(exception.response.data.error), 'error')
        }
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        const updatedBlog = await blogService.updateBlog(likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: updatedBlog
        })
    }
}
export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (blog) => {
    return async dispatch => {
        try {
            const newBlog = await blogService.createNew(blog)
            dispatch(setNotif(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'success'))
            dispatch({
                type: 'ADD_BLOG',
                data: newBlog
            })
        } catch (exception) {
            dispatch(setNotif(exception.response.data.error, 'error'))
        }
    }
}

export default reducer