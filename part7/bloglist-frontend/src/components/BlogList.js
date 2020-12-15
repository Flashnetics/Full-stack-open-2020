import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const Blogs = () => {
    const blogs = useSelector(state => state.blogs)

    const sortedBlogs = blogs.sort((first, second) => second.likes - first.likes)

    const likesStyle = {
        float: 'right'
    }

    return (
        <ListGroup>
            {sortedBlogs.map(blog =>
                <ListGroup.Item key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    <span> by {blog.author}</span>
                    <span style={likesStyle}> likes: {blog.likes}</span>
                </ListGroup.Item>
            )}
        </ListGroup>
    )

}

export default Blogs