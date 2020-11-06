import React from "react";


const Person = ({ person, removePerson }) => {
    

  return (
          <li style={{ listStyleType: "none" }}>
              {person.name} {person.number}   <button onClick={removePerson}> delete </button>
          </li>
  )
}

export default Person
