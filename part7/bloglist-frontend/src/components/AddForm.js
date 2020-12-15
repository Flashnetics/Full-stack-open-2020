import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { addBlog } from '../reducers/blogReducer'
import utils from '../utils'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const AddForm= (props) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title.value,
            author: author.value,
            url: url.value
        }
        dispatch(addBlog(newBlog))
        title.empty()
        author.empty()
        url.empty()

    }

    const margin = {
        marginTop: 10
    }

    return (
        <Form onSubmit={handleSubmit} className="add-new-form">
            <h2>Create new blog</h2>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    id="title"
                    { ...utils.formattedField(title) }
                    name="Title"
                />
                <Form.Label>Author</Form.Label>
                <Form.Control
                    id="author"
                    { ...utils.formattedField(author) }
                    name="Author"
                />
                <Form.Label>Url</Form.Label>
                <Form.Control
                    id="url"
                    { ...utils.formattedField(url) }
                    name="Url"
                />
                <div style={margin}>
                    <Button  size="sm" onClick={props.toggleVisibility}>
                        Cancel
                    </Button>
                    <Button size="sm" id="create-button" type="submit">
                        Create
                    </Button>
                </div>
            </Form.Group>
        </Form>
    )
}

export default AddForm