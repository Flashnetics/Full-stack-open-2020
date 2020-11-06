import React, { useState, useEffect } from 'react'

import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import ReactDOM from 'react-dom';
import Notification from './components/Notification'
import personService from './services/persons'
const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
    
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
}, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    console.log(event.target.value)
  }

  const notify = (message, type='error') => {
    setNotification({type,message})
    setTimeout(() => {
      setNotification(null)
    }, 2500)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notice={notification}/>
        
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm persons={persons}
                    setPersons={setPersons}
                    newName={newName}
                    setNewName={setNewName}
                    handleNameChange={handleNameChange} 
                    newNumber={newNumber}
                    setNewNumber={setNewNumber}
                    handleNumberChange={handleNumberChange} 
                    setNotification={setNotification}
                    notify={notify}
      />
      
      <h2>Numbers</h2>
      <Persons persons = {persons} setPersons={setPersons} filter = {newFilter}   setNotification={setNotification}
                 notify={notify} /> 
    </div>
  )
}
export default App
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);