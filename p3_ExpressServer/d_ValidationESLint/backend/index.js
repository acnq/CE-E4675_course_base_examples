require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

// self defined middleware
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
const unknownEndpoint = (requeset, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

// prefix middleware usage
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(requestLogger)


const Note = require('./models/note')

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes=>{
    response.json(notes)
  })
})

app.post('/api/notes/', (request, response, next) => {
  const body = request.body
  
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  })

  note.save()
    .then(saveNote => {
      response.json(saveNote)
    })
    .catch(error => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('api/notes/:id', (request, response, next) => {
  const {content, important} = request.body


  Note.findByIdAndUpdate(
    request.params.id, 
    {content, important}, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updateNote => {
      response.json(updateNote)
    })
    .catch(error=>next(error))
})

//suffix middleware usage
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})