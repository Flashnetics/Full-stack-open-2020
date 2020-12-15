import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { initComments } from '../reducers/commentsReducer'
import Comments from '../components/CommentList'
import Button from 'react-bootstrap/Button'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.loggedUser)
    useEffect(() => {
        dispatch(initComments(blog))
    }, [dispatch, blog])

    if (!blog) return null



    const handleLikeClick = (event) => {
        event.preventDefault()
        dispatch(likeBlog(blog))
    }


    const handleRemove = (event) => {
        event.preventDefault()
        if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
            dispatch(removeBlog(blog))
            history.push('/')
        }
    }

    const showRemoveButton = () => {
        return user.username === blog.user.username
    }

    const margin = {
        marginLeft: 10
    }

    return (
        <div className="blog-container">
            <h1>{blog.title}</h1>
            <div><a href={blog.url}>{blog.url}</a></div>
            <span id="blog-likes">{blog.likes} likes</span>
            <Button style={margin} size="sm" variant="secondary" type="button" onClick={handleLikeClick}>
                Like
            </Button>
            <p>added by {blog.user.name}</p>
            { showRemoveButton() ?
                <Button size="sm" type="button" onClick={handleRemove}>
                    Remove
                </Button>
                : <></>
            }
            <Comments blog={blog} />
        </div>
    )
}

export default Blog
