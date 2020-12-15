import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/commentsReducer'
import { useField } from '../hooks'
import utils from '../utils'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CommentForm = ({ blog }) => {
    const dispatch = useDispatch()
    const content = useField('text')
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(addComment(content.value, blog.id))
        content.empty()
    }

    const margin = {
        marginBottom: 10,
        marginTop: 10
    }

    return (
        <Form style={margin}onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control as="textarea" style={margin} name="Comment" {...utils.formattedField(content)} />
                <Button type="submit">Add comment</Button>
            </Form.Group>
        </Form>
    )
}

export default CommentForm
