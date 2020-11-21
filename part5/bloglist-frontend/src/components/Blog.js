import React from 'react'

const Blog = ({ blog, toggleImportance }) => {
  const label = blog.important
    ? 'make not important' : 'make important'

  return (
    <li className='blog'>
      <span>{blog.content}</span> 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Blog
