import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    if (!user) return null
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs:</h3>
            <ListGroup>
                {user.blogs.map(blog => (
                    <ListGroup.Item key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default User