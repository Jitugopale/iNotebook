import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react' //useRef => kisi bhi element ko reference de skta hoo
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate=useNavigate();
  const {notes,getNotes,editNote} = context;
  useEffect(() => {
    if (localStorage.getItem('token')){
      getNotes(); //sara notes ko fetch karlo
    }else{
      navigate("/login");
    }
        // eslint-disable-next-line

  }, [])

  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote)=>{  //bootstrap modal google
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title,edescription: currentNote.description, etag: currentNote.tag});
  }

  const handleClick=(e)=>{
    // console.log("Updating the note...",note)
    // e.preventDefault(); //page reload na ho
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success");
  }
  const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value}) //...=spread operator=jo value note object mai hai vo rahe laken jo properties note,....  ka age liki ja rahi hai use override ya fir add karna

  }
  
  return (
    <>
    <AddNote showAlert={props.showAlert}/>

    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className='my-3'>
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
              </div>
              <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
              </div>
              <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={5} required/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5}>Update Note</button>
          </div>
        </div>
      </div>
    </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => (
          // <p key={note.id}>{note.title}</p>
         <NoteItem  key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
        ))}
      </div>
    </>
  )
}

export default Notes
