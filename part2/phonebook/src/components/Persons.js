import React from "react";
import Person from "./Person";
import personService from '../services/persons'
const Persons = ({ persons, setPersons, filter, notify }) => {
  const personsToShow = !filter
  ? persons
  : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase())
  )

    const removePersonOf = (id) => {
        let idName = personsToShow.filter(person => person.id === id)
        console.log('idName:', idName)
        window.confirm(`Delete ${ idName[0].name }?`)?
            
            personService
            .remove(id)
            .then(() => {
                setPersons(personsToShow.filter(person => person.id !== id))
                notify(`${idName[0].name}'s number was sucessfully deleted!`, 'ok')
            }):
            setPersons(persons)
          
      }
    return(
        <ul style={{ padding: 0 }}>
      {personsToShow.map((person, i) =>
        <Person 
          key={i}
          person={person}
          removePerson={() => removePersonOf(person.id)}
        />
      )}
      </ul>
    )
};

export default Persons;