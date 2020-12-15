const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.post('/', async (request, response) => {
    const body = request.body
    const url = request.baseUrl
    const blogId = url.split('/')[3]
    const comment = new Comment({ ...body, blog: blogId })
    const result = await comment.save()
    const blog = await Blog.findById(blogId)
    if (!blog) {
        return response.status(401).json({
            error: 'invalid blog id'
        })
    }
    blog.comments = blog.comments.concat(comment._id)
    await blog.save()
    response.json(result.toJSON())
})

// For fetching comments
commentsRouter.get('/', async (request, response) => {
    const result = await Comment
        .find({})
    response.json(result)
})

module.exports = commentsRouter