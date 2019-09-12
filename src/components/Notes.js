import React from 'react';
import Folders from "./Folders";
import { Link } from "react-router-dom";
import MyContext from "./MyContext"
import PropTypes from "prop-types";
import DummyStore from './DummyStore';
import ErrorBoundary from './ErrorBoundary';

class Notes extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        folders: DummyStore.folders,
        notes: DummyStore.notes
      }
    }
    filterByFolderId = (notes, folderId) => {
      return notes.map(note => {
        if (note.folderId === folderId) {
          return <div><Link to={`/note/${note.id}`} key={note.id}>{note.name}</Link></div>;
        }
        return null;
      })
    }

    componentDidMount(){
        Promise.all([
            fetch(`http://localhost:9090/notes`),
            fetch(`http://localhost:9090/folders`)
        ])
            .then(([notesResponse, foldersResponse]) => {
                if (!notesResponse.ok)
                    return notesResponse.json().then(e => Promise.reject(e));
                if (!foldersResponse.ok)
                    return foldersResponse.json().then(e => Promise.reject(e));
                    console.log (notesResponse, foldersResponse);
                return Promise.all([notesResponse.json(), foldersResponse.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
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
            const noteIndex = this.state.notes.findIndex(note => note.id === noteId);
            const newNotes = [...this.state.note];
            newNotes.splice(noteIndex, 1);
            this.setState({
              notes: newNotes
            })
        
          })
          .catch(error => {
            console.error({ error })
          })
      }

      addFolder = (newFolder) => {
        const { folders, /*notes*/ } = this.state;
        folders.push(newFolder)
        this.setState({
          folders
        })
      }

    render() {
      const folderId = this.props.match.params.id || null;
      const { folders, notes } = this.state;
      return (
        <MyContext.Provider value={{ folders, notes, addFolder: this.addFolder }}>
          <div className="d-flex">
              <ErrorBoundary>
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
                {this.filterByFolderId(notes, folderId)}
              </div>) : notes.map(note => <div key={note.id}><Link to={`/note/${note.id}`} key={note.id}>{note.name}</Link></div>)}
            </div>
              </ErrorBoundary>
          </div>
        </MyContext.Provider>
      )
    }
  }

  Notes.propTypes = {
    value: PropTypes.string
  }

  export default Notes;