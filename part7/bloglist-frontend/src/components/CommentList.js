import React from 'react'
import { useSelector } from 'react-redux'
import CommentForm from './CommentForm'
import ListGroup from 'react-bootstrap/ListGroup'


const Comments = ({ blog }) => {
    const comments = useSelector(state => state.comments)
    const commentsToShow = comments.filter(comment => comment.blog === blog.id)

    return (
        <div>
            <CommentForm blog={blog} />
            <h2>Comments</h2>
            <ListGroup>
                {commentsToShow.map(comment => (
                    <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Comments