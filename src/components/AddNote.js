import React from 'react'
import PropTypes from 'prop-types';
import MyContext from "./MyContext";

export default class AddFolder extends React.Component {

    static defaultProps = {
      addFolder: () => {},
    }


    handleAddFolder = (event, context) => {
      event.preventDefault();
      const newFolder = {};
      newFolder.name = event.target.name.value;
      const folderId = this.props.id;

      fetch(`http://localhost:9090/folders`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newFolder)
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        context.addFolder(newFolder);
        this.props.history.push('/');
      })
      .catch(error => {
        console.error({ error })
      });
    }

    render() {
      const { notes, folders, } = this.context
      const { noteId } = this.props.match.params
      // const note = findNote(notes, noteId) || {}
      // const folder = findFolder(folders, note.folderId)

        return (
          <MyContext.Consumer>
            {(context) => {
              return (
                <form className="createFolder" onSubmit={(event) => this.handleAddFolder(event, context)}>
                    <h2>Add Folder</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="name" name="name" id="name" />
                    </div>
                    <div className="createFolderButtons">
                        <button type="submit" className="buttonSubmit">
                            Save
                        </button>
                    </div>
                </form>
              )
            }}
        </MyContext.Consumer>
      );
    }
}

AddFolder.propTypes = {
    value: PropTypes.string
}
