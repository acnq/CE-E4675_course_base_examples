import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, hanldeClick }) => {
  return(
    <li onClick={hanldeClick}>
      {note.content} 
        <strong>{note.important ? 'important' : ''}</strong>
  </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return(
    <ul>
      {notes.map(note => 
        <Note
          key={note.id}
          note={note}
          hanldeClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes