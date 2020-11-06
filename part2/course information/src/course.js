import React from "react";

const Header = ({name}) => <h2>{name}</h2>


const Content = ({parts}) => {
  return parts.map(part => (<p>{part.name} {part.exercises}</p>)
  )
}

const Total = ({parts}) => {
  let total = parts.reduce( (s, p)  => {
    console.log('what is happening', s, p)
    return s + p.exercises}, 0)

  return (
    <div>
      <strong>Total of {total} exercises</strong>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name = {course.name} /> 
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>  
  )
}

export default Course;