import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Switch, Route, useRouteMatch
} from 'react-router-dom'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'
import { initComments } from './reducers/commentsReducer'
import { setUser } from './reducers/loggedUserReducer'
import Blogs from './components/BlogList'
import AddForm from './components/AddForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/UserList'
import User from './components/User.js'
import Blog from './components/Blog.js'
import Menu from './components/Menu.js'
import blogService from './services/blogs'

const App = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const loggedUser = useSelector(state => state.loggedUser)
    const notification = useSelector(state => state.notification)
    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        dispatch(initBlogs())
        dispatch(initUsers())
        dispatch(initComments())
    }, [dispatch])


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(setUser(user))
        }

    }, [dispatch])

    const userMatch = useRouteMatch('/users/:id')
    const selectedUser = userMatch
        ? users.find(user => user.id === userMatch.params.id)
        : null

    const blogMatch = useRouteMatch('/blogs/:id')
    const selectedBlog = blogMatch
        ? blogs.find(blog => blog.id === blogMatch.params.id)
        : null

    return (
        <div className="container">
            { notification ? <Notification message={notification.message} type={notification.type} /> : <></> }
            { !loggedUser ?
                <LoginForm />
                :
                <div>
                    <h1>Blogs</h1>
                    <Menu />
                    <Switch>
                        <Route path="/users/:id">
                            <User user={selectedUser} />
                        </Route>
                        <Route path="/blogs/:id">
                            <Blog blog={selectedBlog} />
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/">
                            <Togglable buttonLabel="Create new blog">
                                <AddForm />
                            </Togglable>
                            <Blogs />
                        </Route>
                    </Switch>
                </div>
            }
        </div>
    )
}

export default App