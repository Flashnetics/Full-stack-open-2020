const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(result)

})



blogsRouter.post('/', async (request, response) => {
    const body = request.body.likes ? request.body : Object.assign(request.body, { likes: 0 })
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(401).json({ error: 'invalid token' })
    }
    const blog = new Blog({ ...body, user: user._id, comments: [] })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    const populatedResult = await result.populate('user', { username: 1, name: 1 }).execPopulate()
    response.json(populatedResult.toJSON())
})


blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const userId = decodedToken.id
    const blog = await Blog.findById(id)
    if (!blog) {
        return response.status(401).json({
            error: 'invalid blog id'
        })
    }
    if (userId.toString() !== blog.user.toString()) {
        return response.status(401).json({
            error: 'blog cant be deleted with this token'
        })
    }
    await blog.remove()
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = {
        likes: request.body.likes
    }

    const result = await Blog
        .findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
        .populate('user', { username: 1, name: 1 })
    if (!result) {
        return response.status(401).json({
            error: 'invalid blog id'
        })
    }
    response.json(result.toJSON())
})

module.exports = blogsRouter
