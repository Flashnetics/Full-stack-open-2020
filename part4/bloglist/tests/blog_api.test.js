const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  console.log('saved')
})
console.log('done')



test('a specific blog can be viewed', async () => {
  console.log('entered test')
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialNotes.length - 1
  )

  const contents = blogsAtEnd.map(r => r.content)

  expect(contents).not.toContain(blogToDelete.content)
})


test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.content)

  expect(contents).toContain(
    'Browser can execute only Javascript'
  )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.content)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})
test('blog without content is not added', async () => {
  const newBlog = {
    important: true
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.notesInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blogs are returned with id, not _id', async () => {
  const response = await api.get('/api/blogs/')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
  console.table(response.body)
})
test('default likes to 0 if missing from new blogpost', async () => {
  const newPost = {
    title: 'Where are my likes?',
    author: 'Unlikeable Man',
    url: 'https://nolikes.com',
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  const blogLikes = blogAtEnd.map(blog => blog.likes)
  expect(blogLikes[blogLikes.length - 1]).toBe(0)
})
test('adding blogpost without url or title returns 400', async () => {
  const newPost = {
    author: 'Ninja',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()

  expect(blogAtEnd.length).toBe(helper.initialBlog.length)
})
afterAll(() => {
  mongoose.connection.close()
})