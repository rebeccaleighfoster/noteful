import React from "react";
//import { Link } from "react-router-dom";
import MyContext from "./Notes";
import DummyStore from "./DummyStore";

export default class Folders extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        folders: DummyStore.folders
      }
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

                return Promise.all([notesResponse.json(), foldersResponse.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
                console.log (notesResponse, foldersResponse);
            })
            .catch(error => {
                console.error({error});
            });
    }

    //how does this stuff get to context? should these API calls live in app? then the value of the calls
    // get passed through ? the curriculum says to have the API calls in the same 
    // folder as state.
    
  
    addFolder = () => {
      const { folders } = this.state;
      folders.push({
        "id": "b07162f0-ffaf-11e8-8233223322eb2-f2801f1b9fd1",
        "name": "My new folder"
      })
      this.setState({
        folders
      })
    }
  
    handleFolderDelete = e => {
        e.preventDefault()
        const folderId = this.props.id
    
        fetch(`http://localhost:9090/folders/${folderId}`, {
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


    render () {
      const { folders } = this.state;
      return (
        <MyContext.Provider value={{ folders }}>
          {folders.map(folder =>
            <div key={folder.name}>
              <div onClick={() => this.addFolder()}>{folder.name}</div><button
                className='Note__delete'
                type='button'
                onClick={this.handleFolderDelete}
                ></button>
              {/*datafromapi*/.notes.filter(note => note.folderId === folder.id).length}
            </div>
          )}
        </MyContext.Provider>
      )
    }
  }