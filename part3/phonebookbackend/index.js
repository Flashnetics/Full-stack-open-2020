/* eslint-disable no-mixed-spaces-and-tabs */
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan('tiny'))

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}


app.use(requestLogger)

let persons = [
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
    'id': 1
  },
  {
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
    'id': 2
  },
  {
    'name': 'Dan Abramov',
    'number': '12-43-234345',
    'id': 3
  },
  {
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
    'id': 4
  }
]



app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
    .catch(error => next(error))
})

person.save().then(savedPerson => {
  // eslint-disable-next-line no-undef
  res.json(savedPerson)
})
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}
const person = {
  // eslint-disable-next-line no-undef
  name: 	body.name,
  // eslint-disable-next-line no-undef
  number:	body.number,
  ID: 	generateId(),
}
app.get('/info', (request, response) => {
  Person.countDocuments({}, (error, count) => {
    if (error) {
      response.send(error)
    } else {
      const phonebookInfo = `<p></p>Phonebook has info for ${count} people </p>
                            <p> ${new Date()}</p>`
      response.send(phonebookInfo)
    }
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
	  // eslint-disable-next-line no-mixed-spaces-and-tabs
	  // eslint-disable-next-line no-mixed-spaces-and-tabs
	  // eslint-disable-next-line no-mixed-spaces-and-tabs
	  // eslint-disable-next-line no-mixed-spaces-and-tabs
	  // eslint-disable-next-line no-mixed-spaces-and-tabs
	  // eslint-disable-next-line no-unused-vars
	  .then(result => {
      res.status(204).end()
	  })
	  .catch(error => next(error))
})

// eslint-disable-next-line no-unused-vars
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { runValidators: true, context: 'query', new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}




app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
