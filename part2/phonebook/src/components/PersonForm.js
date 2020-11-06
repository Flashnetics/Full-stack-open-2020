import React from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber, handleNameChange, handleNumberChange }) => {
    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      const duplicateName = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
      const duplicateNumber = persons.some(person => person.number.replace(/ /g, '') === newNumber.replace(/ /g, ''))
      console.log('duplicateName:', duplicateName)
      if (!duplicateName) {
        personService
          .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          })
      }
      else if (duplicateName && duplicateNumber) { 
        window.alert(`${newName} is already added to phonebook`)
      }
      else if (duplicateName && !duplicateNumber) {
        const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const changedPerson = {...person, number: newNumber}
        console.log('person in else/if:', person)
        console.log('changedPerson in else/if:', changedPerson)
        const isConfirm = (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one? `))
          if (isConfirm) { 
                personService
                .update(changedPerson.id, changedPerson)
                .then(response => {
                  setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))})       
          }
        } 
        setNewName('')
        setNewNumber('')
    }                              
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          number: <input
                    value={newNumber}
                    onChange={handleNumberChange} 
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default PersonForm