import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(`${baseUrl}/:id/comments`)
    return request.then(response => response.data)
}

const createNew = async (comment, blogId) => {
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment)
    return response.data
}


export default { getAll, createNew }