import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/loggedUserReducer'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const Menu = () => {
    const dispatch = useDispatch()
    const loggedUser = useSelector(state => state.loggedUser)

    const padding = {
        paddingRight: 10
    }


    const handleClick = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }


    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" >
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/">Blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/users">Users</Link>
                    </Nav.Link>
                </Nav>
                <Nav className="nav-right">
                    <Nav.Item>
                        <span style={padding}>{loggedUser.name} logged in</span>
                        <Button type="button" onClick={handleClick} variant="secondary">
                            Logout
                        </Button>
                    </Nav.Item>
                </Nav >
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu
