  
  
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (event) => {
    setValue('')
}

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
    .get(baseUrl)
    .then(response => {
      setResources(response.data)
    })
  }, [baseUrl])

  const create = (resource) => {
   axios.post(baseUrl, resource)
  }

  const getAll = () => {
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  }

  const service = {
    create,
    getAll
  }
  console.log('service:', service)
  console.log('resources:', resources)
  return [
    resources, service
  ]
}

const App = () => {
  const { reset: reset1, ...otherContent } = useField('text')
  const { reset: reset2, ...otherName } = useField('text')
  const { reset: reset3, ...otherNumber } = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: otherContent.value })
    noteService.getAll()
    reset1()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: otherName.value, number: otherNumber.value})
    personService.getAll()
    reset2()
    reset3()
  }

  return (
    <div>
      <h2>notes</h2>
      <form id="form" onSubmit={handleNoteSubmit}>
        <input {...otherContent} />
        <button type="submit">create</button> 
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form id="form" onSubmit={handlePersonSubmit}>
        name <input {...otherName} /> <br/>
        number <input {...otherNumber} />
        <button type="submit">create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App