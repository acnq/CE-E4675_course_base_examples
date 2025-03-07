import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => { 
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  
  useEffect(() => {
    console.log('effect')

    const eventHanlder = response => {
      console.log('promise fufilled')
      setNotes(response.data)
    }

    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHanlder)
  }, [])

  const noteToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const hanldeNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show { showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {noteToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={hanldeNoteChange}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}
export default App
