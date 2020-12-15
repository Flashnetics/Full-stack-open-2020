import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'
import utils from '../utils'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/loggedUserReducer'
import { setNotif } from '../reducers/notificationReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const username = useField('text')
    const password = useField('password')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(setUser(user))
            history.push('/')
        } catch (exception) {
            dispatch(setNotif(exception.response.data.error, 'error'))
        }
    }

    const margin = {
        marginTop: 10
    }

    return (
        <Form data-cy="login-form" onSubmit={handleSubmit}>
            <h2>Login to the application</h2>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    id="username"
                    { ...utils.formattedField(username) }
                    name="Username"
                />
                <Form.Label style={margin}>Password</Form.Label>
                <Form.Control
                    id="password"
                    { ...utils.formattedField(password) }
                    name="Password"
                />
                <Button style={margin} variant="primary" id="login-button" type="submit">
                    login
                </Button>
            </Form.Group>
        </Form>
    )
}

export default LoginForm