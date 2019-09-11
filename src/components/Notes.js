import React from 'react';
import Folders from "./Folders";
import { Link } from "react-router-dom";
import MyContext from "./MyContext"


class Notes extends React.Component {
    filterByFolderId = (notes, folderId) => {
      return notes.map(note => {
        if (note.folderId === folderId) {
          return <div><Link to={`/note/${note.id}`} key={note.id}>{note.name}</Link></div>;
        }
        return null;
      })
    }

    handleNoteDelete = e => {
        e.preventDefault()
        const noteId = this.props.id
    
        fetch(`http://localhost:9090/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(() => { 
            // what lives here?? 
          })
          .catch(error => {
            console.error({ error })
          })
      }
  
    render() {
      const folderId = this.props.match.params.id || null;
      return (
        <MyContext.Consumer>
          {(context) => {
            return (
              <div className="d-flex">
                <div className="folders-pane">
                  <Folders />
                </div>
                <button
                className='Note__delete'
                type='button'
                onClick={this.handleNoteDelete}
                ></button>
                <div className="notes-pane">
                  {folderId ? (<div>
                    {this.filterByFolderId(context.notes, folderId)}
                  </div>) : context.notes.map(note => <div><Link to={`/note/${note.id}`} key={note.id}>{note.name}</Link></div>)}
                </div>
              </div>
            )
          }}
        </MyContext.Consumer>
      )
    }
  }
  
  export default Notes;
  